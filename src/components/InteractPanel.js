import React from 'react';

import BasicInfo from './BasicInfo';

class InteractPanel extends React.Component {
  render() {
    return (
      <div>
        { 
          this.props.activeItem === 'info' ? 
          <BasicInfo 
            tokenName={this.props.tokenName}
            symbol={this.props.symbol}
            decimals={this.props.decimals}
            totalSupply={this.props.totalSupply}
            contractAddress={this.props.contractAddress}
            owner={this.props.owner}
          /> : 
          null 
        }
      </div>
    );
  }
}

export default InteractPanel;

            {/* {this.state.activeItem === 'info' ? <BasicInfo 
              inst={ISCoinInst}
              account={this.state.account}
              name={this.state.name} 
              symbol={this.state.symbol} 
              decimals={this.state.decimals} 
              totalSupply={this.state.totalSupply} 
              contractAddress={this.state.contractAddress} 
              owner={this.state.owner} /> : null}
            {this.state.activeItem === 'transfer' ? <Transfer inst={ISCoinInst} account={this.state.account} /> : null}
            {this.state.activeItem === 'query' ? <Query inst={ISCoinInst} /> : null}
            {this.state.activeItem === 'mint' ? <Mint inst={ISCoinInst} account={this.state.account} /> : null} */}