import React from 'react';
import { Segment, Form, Button, Message } from 'semantic-ui-react';

import web3 from '../service/web3';

class BalanceAllowance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryAccount: '',
      balance: ''
    };
    this.handleQueryAccountChange = this.handleQueryAccountChange.bind(this);
    this.handleQuerySubmit = this.handleQuerySubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Balance</h3>
          <Form onSubmit={ this.handleQuerySubmit }>
            <Form.Field>
              <label className="form-row" htmlFor="query-account">
                Account Address
              </label>
              <input id="query-account" type="text" name="account" placeholder="0x123..."
               value={ this.state.queryAccount } onChange={ this.handleQueryAccountChange } />
            </Form.Field>
            <Button className="form-row center-button" type="submit" primary fluid>Check Balance</Button>
          </Form>
          { 
            this.state.balance ? 
            <Message>
              <p>Amount of Tokens: { web3.utils.fromWei(this.state.balance, 'mwei') }</p>
            </Message> : null
          }
        </Segment>
        <br />
        <Form>
          
        </Form>
      </div>
    );
  }

  handleQueryAccountChange(event) {
    this.setState({
      queryAccount: event.target.value,
      balance: ''
    });
  }

  async handleQuerySubmit(event) {
    event.preventDefault();
    const balance = await this.props.inst.methods.balanceOf(this.state.queryAccount).call();
    this.setState({
      balance
    });
  }
}

export default BalanceAllowance;