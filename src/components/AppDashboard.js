import React from 'react';
import { Button, Grid, Menu } from 'semantic-ui-react';

import tokenInstances from '../service/tokenInstances';

class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'ToCNH',
    };
    this.handleFiatSelect = this.handleFiatSelect.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.tokenDataFetch = this.tokenDataFetch.bind(this);
  }

  render() {
    return (
      <div>
        {/* Fiat selection */}
        <Button.Group>
          <Button 
            positive={ this.state.token === 'ToCNH' } 
            name="ToCNH"
            onClick={this.handleFiatSelect}
          >ToCNH</Button>
          <Button.Or />
          <Button 
            positive={ this.state.token === 'ToPHP' } 
            name="ToPHP"
            onClick={this.handleFiatSelect}
          >ToPHP</Button>
          <Button.Or />
          <Button 
            positive={ this.state.token === 'ToUSD' } 
            name="ToUSD"
            onClick={this.handleFiatSelect}
          >ToUSD</Button>
        </Button.Group>
        {/* Dashboard */}
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical tabular>
              <Menu.Item name='info' active={this.state.activeItem === 'info'} onClick={this.handleMenuClick}>Basic info</Menu.Item>
              <Menu.Item name='transfer' active={this.state.activeItem === 'transfer'} onClick={this.handleMenuClick}>Transfer / Approve</Menu.Item>
              <Menu.Item name='query' active={this.state.activeItem === 'query'} onClick={this.handleMenuClick}>Balance / Allowance</Menu.Item>
              <Menu.Item name='mint' active={this.state.activeItem === 'mint'} onClick={this.handleMenuClick}>Mint / Burn</Menu.Item>
              <Menu.Item name='admin' active={this.state.activeItem === 'admin'} onClick={this.handleMenuClick}>Admin</Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  async componentDidMount() {
    await this.tokenDataFetch(this.state.token);
  }

  async tokenDataFetch(name) {
    const tokenInstance = tokenInstances[name + 'Inst'];
    this.setState({
      token: name
    });
    console.log(tokenInstance);
    console.log(tokenInstance.options.address);
  }

  async handleFiatSelect(event, { name }) {
    event.preventDefault();
    await this.tokenDataFetch(name);
  }

  handleMenuClick(event, { name }) {
    this.setState({
      activeItem: name
    });
  }
}

export default AppDashboard;