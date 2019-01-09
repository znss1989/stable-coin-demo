import React from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';

import './App.css';
import ConnectionStatus from './components/ConnectionStatus';

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
          <Divider horizontal>Connection Status</Divider>
          <ConnectionStatus />
          <Divider horizontal>Fiat Selection</Divider>
          <Divider horizontal>App Dashboard</Divider>
          <footer>
            <p>GOW &copy; 2019</p>
          </footer>
        </Container>
      </div>
    );
  }

  // async componentDidMount() {
  //   const isMetaMask = statusService.isMetaMask();
  //   const network = await statusService.getNetwork();
  //   const accounts = await statusService.getAccounts();
  //   const isUnlocked = accounts.length > 0;
  //   const currentAccount = accounts[0];
  //   this.setState({
  //     isMetaMask,
  //     network,
  //     isUnlocked,
  //     currentAccount
  //   });
  // }
}

export default App;
