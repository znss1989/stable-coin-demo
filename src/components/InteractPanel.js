import React from 'react';

import BasicInfo from './BasicInfo';
import Admin from './Admin';
import Mint from './Mint';
import Issue from './Issue';
import Recycle from './Recycle';
import Usage from './Usage';

const InteractPanel = (props) => {
  switch (props.activeItem) {
    case 'info':
      return (
        <BasicInfo 
          tokenName={props.tokenName}
          symbol={props.symbol}
          decimals={props.decimals}
          totalSupply={props.totalSupply}
          contractAddress={props.contractAddress}
        />
      );
    case 'admin':
      return (
        <Admin
          inst={ props.inst }
          currentAccount={ props.currentAccount }
          owner={ props.owner }
        />
      );
    case 'mint':
      return (
        <Mint
          inst={ props.inst }
          currentAccount={ props.currentAccount }
          owner={ props.owner }
          mintWallet={ props.mintWallet }
          mintWalletBalance={ props.mintWalletBalance}
          recycleWallet={ props.recycleWallet }
          totalSupply={ props.totalSupply }
        />
      );
    case 'issue':
      return (
        <Issue
          inst={ props.inst }
          symbol={ props.symbol }
          currentAccount={ props.currentAccount }
          owner={ props.owner }
          mintWallet={ props.mintWallet }
          mintWalletBalance={ props.mintWalletBalance}
          recycleWallet={ props.recycleWallet }
        />
      );
    case 'recycle':
      return (
        <Recycle
          inst={ props.inst }
          symbol={ props.symbol }
          currentAccount={ props.currentAccount }
          owner={ props.owner }
          mintWallet={ props.mintWallet }
          recycleWallet={ props.recycleWallet }
          recycleWalletBalance={ props.recycleWalletBalance }
        />
      );
    case 'usage':
      return ( 
        <Usage 
          inst={ props.inst }
          symbol={ props.symbol }
          currentAccount={ props.currentAccount }
          owner={ props.owner }
          mintWallet={ props.mintWallet }
          recycleWallet={ props.recycleWallet }
        />
      );
    default:
      return (
        <BasicInfo 
          tokenName={props.tokenName}
          symbol={props.symbol}
          decimals={props.decimals}
          totalSupply={props.totalSupply}
          contractAddress={props.contractAddress}
          owner={props.owner}
        />
      );  
  }
};

export default InteractPanel;