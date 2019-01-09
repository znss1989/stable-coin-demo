import web3 from './web3';
import detectNetwork from 'web3-detect-network';

const isMetaMask = () => {
  return window.web3.currentProvider.isMetaMask;
};

const getNetwork = async () => {
  return await detectNetwork(window.web3.currentProvider);
};

const getAccounts = async () => {
  return await web3.eth.getAccounts();
};

export default {
  isMetaMask,
  getNetwork,
  getAccounts
};
