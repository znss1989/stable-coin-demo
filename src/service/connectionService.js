import web3 from './web3';
import detectNetwork from 'web3-detect-network';

const isMetaMask = () => {
  if (!window.web3) return false;
  return window.web3.currentProvider.isMetaMask;
};

const getNetwork = async () => {
  if (!window.web3) return null;
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
