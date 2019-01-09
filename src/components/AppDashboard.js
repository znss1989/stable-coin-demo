import React from 'react';
import { Button } from 'semantic-ui-react';

class AppDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      token: 'ToCNH'
    };
    this.handleFiatSelect = this.handleFiatSelect.bind(this);
  }

  render() {
    return (
      <div>
        <Button.Group>
          <Button 
            positive={ this.state.token == 'ToCNH' } 
            name="ToCNH"
            onClick={this.handleFiatSelect}
          >ToCNH</Button>
          <Button.Or />
          <Button 
            positive={ this.state.token == 'ToPHP' } 
            name="ToPHP"
            onClick={this.handleFiatSelect}
          >ToPHP</Button>
          <Button.Or />
          <Button 
            positive={ this.state.token == 'ToUSD' } 
            name="ToUSD"
            onClick={this.handleFiatSelect}
          >ToUSD</Button>
        </Button.Group>
      </div>
    );
  }

  async handleFiatSelect(event, { name }) {
    event.preventDefault();
    this.setState({
      token: name
    });
  }
}

export default AppDashboard;