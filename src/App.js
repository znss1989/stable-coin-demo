import React, { Component } from 'react';
import { Container, Header, Divider } from 'semantic-ui-react';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <br />
          <Header as='h1'>Stable Coins Dashboard</Header>
          <Divider horizontal>Connection Status</Divider>
          <Divider horizontal>Fiat Selection</Divider>
          <Divider horizontal>App Dashboard</Divider>
          <footer>
            <p>GOW &copy; 2019</p>
          </footer>
        </Container>
      </div>
    );
  }
}

export default App;
