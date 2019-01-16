import fetch from 'cross-fetch';
import web3 from './web3';

const fetchAllTransactions = async (contractAddress) => {
  // https://rinkeby.etherscan.io/apis#accounts
  const response = await fetch(`http://api-rinkeby.etherscan.io/api?module=account&action=txlist&address=${contractAddress}&startblock=3653940&endblock=99999999&sort=asc`);
  if (response.status > 400) throw new Error("Bad response from server");
  return await response.json();
};

const getMethodId = (methodSignature) => { // e.g. "transfer(address,uint256)"
  return web3.utils.sha3(methodSignature).slice(0, 10);
}

const filterTxByMethod = async (txList, methodSignature) => {
  const methodId = getMethodId(methodSignature);
  return txList.filter(tx => {
    return tx.input.startsWith(methodId);
  })
};

export default {
  fetchAllTransactions,
  filterTxByMethod
};