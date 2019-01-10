import React from 'react';

import BasicInfo from './BasicInfo';
import TransferApprove from './TransferApprove';
import BalanceAllowance from './BalanceAllowance';
import MintBurn from './MintBurn';
import Admin from './Admin';

class InteractPanel extends React.Component {
  render() {
    switch (this.props.activeItem) {
      case 'info':
        return (
          <BasicInfo 
            tokenName={this.props.tokenName}
            symbol={this.props.symbol}
            decimals={this.props.decimals}
            totalSupply={this.props.totalSupply}
            contractAddress={this.props.contractAddress}
            owner={this.props.owner}
          />
        );
      case 'transfer':
        return ( 
          <TransferApprove 
            inst={this.props.inst}
            currentAccount={ this.props.currentAccount }
          />
        );
      case 'query':
        return (
          <BalanceAllowance 
            inst={ this.props.inst }
          />
        );
      case 'mint':
        return (
          <MintBurn
            inst={ this.props.inst }
            currentAccount={ this.props.currentAccount }
            owner={ this.props.owner }
            mintWallet={ this.props.mintWallet }
            recycleWallet={ this.props.recycleWallet }
          />
        );
      case 'admin':
        return (
          <Admin
            inst={ this.props.inst }
            currentAccount={ this.props.currentAccount }
            owner={ this.props.owner }
            mintWallet={ this.props.mintWallet }
            recycleWallet={ this.props.recycleWallet }
          />
        );
      default:
        return (
          <BasicInfo 
            tokenName={this.props.tokenName}
            symbol={this.props.symbol}
            decimals={this.props.decimals}
            totalSupply={this.props.totalSupply}
            contractAddress={this.props.contractAddress}
            owner={this.props.owner}
          />
        );  
    }
  }
}

export default InteractPanel;