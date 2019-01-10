import React from 'react';
import { Button, Grid, Menu, Segment, Dimmer, Loader } from 'semantic-ui-react';

import tokenInstances from '../service/tokenInstances';
// import InteractPanel from './InteractPanel';

class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'ToCNH',
      ready: false,
      activeItem: 'info',
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
        <br />
        <br />
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
            <Segment id="panel-loader-segment">
              <Dimmer active inverted>
                <Loader inverted>Loading</Loader>
              </Dimmer>
            </Segment>

            {/* { this.state.ready ? <Loader size='medium'>Loading</Loader> : <Loader size='medium'>Loading</Loader> } */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }

  async componentDidMount() {
    await this.tokenDataFetch(this.state.token);
  }

  async tokenDataFetch(name) {
    await this.setState({
      ready: false
    });
    const tokenInstance = tokenInstances[name + 'Inst'];
    this.setState({
      token: name
    });
    console.log(tokenInstance);
    console.log(tokenInstance.options.address);
    await this.setState({
      ready: true
    });
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