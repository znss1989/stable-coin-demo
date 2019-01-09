import React from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';

import './App.css';
import ConnectionStatus from './components/ConnectionStatus';
import connectionService from './service/connectionService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMetaMask: false,
      isUnlocked: false,
      network: '',
      currentAccount: ''
    }
  }

  render() {
    return (
      <div className="App">
        <Container>
          <br />
          <Header as='h1'>Stable Coins Dashboard</Header>
          <br />
          <Divider horizontal>Fiat Selection</Divider>
          <Divider horizontal>App Dashboard</Divider>
          <Divider horizontal>Connection Status</Divider>
          <ConnectionStatus 
            isMetaMask={this.state.isMetaMask}
            isUnlocked={this.state.isUnlocked}
            network={this.state.network}
            currentAccount={this.state.currentAccount}
          />
          <br />
          <footer>
            <p>GOW &copy; 2019</p>
          </footer>
        </Container>
      </div>
    );
  }

  async componentDidMount() {
    const isMetaMask = connectionService.isMetaMask();
    const network = await connectionService.getNetwork();
    const accounts = await connectionService.getAccounts();
    const isUnlocked = accounts.length > 0;
    const currentAccount = accounts[0];
    this.setState({
      isMetaMask,
      network,
      isUnlocked,
      currentAccount
    });
  }
}

export default App;
