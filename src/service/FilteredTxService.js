import fetch from 'cross-fetch';
import web3 from './web3';

const fetchAllTransactions = async (contractAddress) => {
  // https://rinkeby.etherscan.io/apis#accounts
  // sort = asc or desc
  const requestUrl = `http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=3653940&endblock=99999999&sort=desc&apikey=6SSPG89WD2PCPMSAB4M2FB43Q6SZNZSCW4`
  const response = await fetch(requestUrl);
  if (response.status > 400) throw new Error("Bad response from server");
  return await response.json();
};

const getMethodId = (methodSignature) => { // e.g. "transfer(address,uint256)"
  return web3.utils.sha3(methodSignature).slice(0, 10);
}

const filterTxByMethod = async (txList, methodSignature) => {
  const methodId = getMethodId(methodSignature);
  return txList.filter(tx => {
    return tx.input.startsWith("0x" + methodId);
  })
};

const mapDataToMethod = {
  "0xa9059cbb": "transfer",
  "0x23b872dd": "transferFrom",
  "0x095ea7b3": "approve",
  "0xf2fde38b": "transferOwnership",
  "0x8456cb59": "pause",
  "0x3f4ba83a": "unpause",
  "0x37548050": "setMintWallet",
  "0xa0712d68": "mint",
  "0x867904b4": "issue",
  "0xc8189678": "fundReturn",
  "0xf53dfd1d": "setRecycleWallet",
  "0x42966c68": "burn",
  "0xdd1c35bc": "recycle",
  "0xa4601a64": "addToIssuelist",
  "0xa77d3c13": "removeFromIssuelist"
};

const decideMethod = (dataHead) => {
  const type = mapDataToMethod[dataHead];
  if (!type) return null;
  return type;
}

// const methodSignatures = [
//   "constructor()",
//   "transfer(address,uint256)",
//   "transferFrom(address,address,uint256)",
//   "approve(address,uint256)",
//   "transferOwnership(address)",
//   "pause()",
//   "unpause()",
//   "setMintWallet(address)",
//   "mint(uint256)",
//   "issue(address,uint256)",
//   "fundReturn(uint256)",
//   "setRecycleWallet(address)",
//   "burn(uint256)",
//   "recycle(uint256)",
//   "addToIssuelist(address)",
//   "removeFromIssuelist(address)"
// ];

// const printAllMethodIds = (signatures) => {
//   signatures.forEach((signature) => {
//     console.log(`${signature}: ${getMethodId(signature)}`);
//   });
// };

// printAllMethodIds(methodSignatures);

export default {
  fetchAllTransactions,
  getMethodId,
  filterTxByMethod,
  decideMethod
};