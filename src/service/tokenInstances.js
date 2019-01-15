import web3 from './web3';
import ToCNH from '../ethereum/build/ToCNH.json';
import ToPHP from '../ethereum/build/ToPHP.json';
import ToUSD from '../ethereum/build/ToUSD.json';
import tokenAddresses from '../configuration/tokenAddresses.json';

const ToCNHInst = new web3.eth.Contract(
  JSON.parse(ToCNH.interface),
  tokenAddresses['ToCNH']
);

const ToPHPInst = new web3.eth.Contract(
  JSON.parse(ToPHP.interface),
  tokenAddresses['ToPHP']
);

const ToUSDInst = new web3.eth.Contract(
  JSON.parse(ToUSD.interface),
  tokenAddresses['ToUSD']
);

export default {
  ToCNHInst,
  ToPHPInst,
  ToUSDInst
};