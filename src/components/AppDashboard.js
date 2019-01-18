import React from 'react';
import { Button, Grid, Menu, Segment, Dimmer, Loader } from 'semantic-ui-react';

import tokenInstances from '../service/tokenInstances';
import InteractPanel from './InteractPanel';
// import InteractPanel from './InteractPanel';

class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'ToCNH',
      ready: false,
      activeItem: 'admin',
      inst: '',
      tokenName: '',
      symbol: '',
      decimals: '',
      totalSupply: '',
      contractAddress: '',
      owner: '',
      mintWallet: '',
      recycleWallet: '',
      recycleWalletBalance: ''
    };
    this.handleFiatSelect = this.handleFiatSelect.bind(this);
    this.handleMenuClick = this.handleMenuClick.bind(this);
    this.tokenDataFetch = this.fetchData.bind(this);
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
        <br />
        <br />
        {/* Dashboard */}
        <Grid>
          <Grid.Column width={3}>
            <Menu fluid vertical pointing secondary>
              <Menu.Item 
                name='info' 
                active={ this.state.activeItem === 'info' } 
                onClick={ this.handleMenuClick }
              >
                Basic info
              </Menu.Item>
              <Menu.Item 
                name='admin' 
                active={ this.state.activeItem === 'admin' } 
                onClick={ this.handleMenuClick }
                disabled={ this.props.currentAccount !== this.state.owner }
              >
                Admin
              </Menu.Item>
              <Menu.Item
                name='mint'
                active={ this.state.activeItem === 'mint' }
                onClick={ this.handleMenuClick }
                disabled={ this.props.currentAccount !== this.state.owner }
              >
                Mint
              </Menu.Item>
              <Menu.Item 
                name='issue' 
                active={ this.state.activeItem === 'issue' } 
                onClick={ this.handleMenuClick } 
                // disabled={ ![this.state.mintWallet && this.state.owner].includes(this.props.currentAccount) }
              >
                Issue
              </Menu.Item>
              <Menu.Item 
                name='recycle' 
                active={ this.state.activeItem === 'recycle' } 
                onClick={ this.handleMenuClick }
                disabled={ ![this.state.recycleWallet && this.state.owner].includes(this.props.currentAccount) }
              >
                Recycle
              </Menu.Item>
              <Menu.Item 
                name='usage' 
                active={this.state.activeItem === 'usage'} 
                onClick={this.handleMenuClick}
              >
                ERC20 Usage
              </Menu.Item>
            </Menu>
          </Grid.Column>
          <Grid.Column width={13}>
            { 
              this.state.ready ? 
              <InteractPanel 
                activeItem={ this.state.activeItem }
                inst={ this.state.inst }
                tokenName={ this.state.tokenName }
                symbol={ this.state.symbol }
                decimals={ this.state.decimals }
                totalSupply={ this.state.totalSupply }
                contractAddress={ this.state.contractAddress }
                owner={ this.state.owner }
                mintWallet={ this.state.mintWallet }
                mintWalletBalance={ this.state.mintWalletBalance }
                recycleWallet={ this.state.recycleWallet }
                recycleWalletBalance={ this.state.recycleWalletBalance}
                currentAccount={ this.props.currentAccount }
              /> : 
              <Segment id="panel-loader-segment">
                <Dimmer active inverted>
                  <Loader inverted>Loading</Loader>
                </Dimmer>
              </Segment> 
            }
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  async componentDidMount() {
    this.setState({
      ready: false
    });
    this.fetchData(this.state.token)
  }

  async fetchData(name) {
    const tokenInstance = tokenInstances[name + 'Inst'];
    const tokenName = await tokenInstance.methods.name().call();
    const symbol = await tokenInstance.methods.symbol().call();
    const decimals = await tokenInstance.methods.decimals().call();
    const totalSupply = await tokenInstance.methods.totalSupply().call();
    const contractAddress = tokenInstance.options.address;
    const owner = await tokenInstance.methods.owner().call();
    const mintWallet = await tokenInstance.methods.mintWallet().call();
    const mintWalletBalance = await tokenInstance.methods.balanceOf(mintWallet).call();
    const recycleWallet = await tokenInstance.methods.recycleWallet().call();
    const recycleWalletBalance = await tokenInstance.methods.balanceOf(recycleWallet).call();
    this.setState({
      ready: true,
      token: name,
      inst: tokenInstance,
      tokenName,
      symbol,
      decimals,
      totalSupply,
      contractAddress,
      owner,
      mintWallet,
      mintWalletBalance,
      recycleWallet,
      recycleWalletBalance
    });
  }

  async handleFiatSelect(event, { name }) {
    event.preventDefault();
    this.setState({
      ready: false
    });
    this.fetchData(name);
  }

  handleMenuClick(event, { name }) {
    this.setState({
      activeItem: name
    });
  }
}

export default AppDashboard;