import React from 'react';
import { Button } from 'semantic-ui-react';

import tokenInstances from '../service/tokenInstances';

class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'ToCNH',
    };
    this.handleFiatSelect = this.handleFiatSelect.bind(this);
    this.tokenDataFetch = this.tokenDataFetch.bind(this);
  }

  render() {
    return (
      <div>
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
  }

  async handleFiatSelect(event, { name }) {
    event.preventDefault();
    await this.tokenDataFetch(name);
  }
}

export default AppDashboard;