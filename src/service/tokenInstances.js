import web3 from './web3';
import ToCNH from '../ethereum/build/ToCNH.json';
import ToPHP from '../ethereum/build/ToPHP.json';
import ToUSD from '../ethereum/build/ToUSD.json';

const ToCNHInst = new web3.eth.Contract(
  JSON.parse(ToCNH.interface),
  '0xf6309a0ac098378aa178eb96561ebe158813e2df'
);

const ToPHPInst = new web3.eth.Contract(
  JSON.parse(ToPHP.interface),
  '0x5e4231be603e76edb6684e443db542385574d287'
);

const ToUSDInst = new web3.eth.Contract(
  JSON.parse(ToUSD.interface),
  '0x7b16975161749673885b49f3772c58c34b3234a5'
);

export default {
  ToCNHInst,
  ToPHPInst,
  ToUSDInst
};