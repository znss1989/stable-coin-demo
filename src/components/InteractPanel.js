import React from 'react';

import BasicInfo from './BasicInfo';
import Usage from './Usage';
import Issue from './Issue';
import Recycle from './Recycle';
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
      case 'issue':
        return (
          <Issue
            inst={ this.props.inst }
            currentAccount={ this.props.currentAccount }
            owner={ this.props.owner }
            mintWallet={ this.props.mintWallet }
            recycleWallet={ this.props.recycleWallet }
          />
        );
      case 'recycle':
        return (
          <Recycle
            inst={ this.props.inst }
            symbol={ this.props.symbol }
            currentAccount={ this.props.currentAccount }
            owner={ this.props.owner }
            mintWallet={ this.props.mintWallet }
            recycleWallet={ this.props.recycleWallet }
            recycleWalletBalance={ this.props.recycleWalletBalance }
          />
        );
      case 'usage':
        return ( 
          <Usage 
            inst={ this.props.inst }
            symbol={ this.props.symbol }
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