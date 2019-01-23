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

const testMethodId = getMethodId("transfer(address,uint256)");
console.log(testMethodId);

export default {
  fetchAllTransactions,
  getMethodId,
  filterTxByMethod
};