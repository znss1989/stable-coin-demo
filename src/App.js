import React, { Component } from 'react';
import { Container, Header } from 'semantic-ui-react';

// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Header as='h1'>Coins Dashboard</Header>
        </Container>
      </div>
    );
  }
}

export default App;
