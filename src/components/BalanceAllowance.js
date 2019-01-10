import React from 'react';
import { Segment, Form, Button, Message } from 'semantic-ui-react';

import web3 from '../service/web3';

class BalanceAllowance extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryAccount: '',
      balance: '',
      allowanceOwner: '',
      allowanceSpender: '',
      allowance: ''
    };
    this.handleQueryAccountChange = this.handleQueryAccountChange.bind(this);
    this.handleBalanceSubmit = this.handleBalanceSubmit.bind(this);
    this.handleAllowanceOwnerChange = this.handleAllowanceOwnerChange.bind(this);
    this.handleAllowanceSpenderChange = this.handleAllowanceSpenderChange.bind(this);
    this.handleAllowanceSubmit = this.handleAllowanceSubmit.bind(this);
  }

  render() {
    console.log("Instance");
    console.log(this.props.inst);
    return (
      <div>
        <Segment>
          <h3>Balance</h3>
          <Form onSubmit={ this.handleBalanceSubmit }>
            <Form.Field>
              <label className="form-row" htmlFor="query-account">
                Account Address
              </label>
              <input id="query-account" type="text" name="query-account" placeholder="0x123..."
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
        <Segment>
          <h3>Allowance</h3>
          <Form onSubmit={ this.handleAllowanceSubmit }>
            <Form.Field>
              <label className="form-row" htmlFor="allowance-owner">
                Allowance Owner Address
              </label>
              <input id="allowance-owner" type="text" name="allowance-owner" placeholder="0x123..."
              value={ this.state.allowanceOwner } onChange={ this.handleAllowanceOwnerChange } />
            </Form.Field>
            <Form.Field>
              <label className="form-row" htmlFor="allowance-spender">
                Allowance Spender Address
              </label>
              <input id="allowance-spender" type="text" name="allowance-spener" placeholder="0x123..."
              value={ this.state.allowanceSpender } onChange={ this.handleAllowanceSpenderChange } />
            </Form.Field>
            <Button className="form-row center-button" type="submit" primary fluid>Check Allowance</Button>
          </Form>
          { 
            this.state.allowance ? 
            <Message>
              <p>Allowance in Tokens: { web3.utils.fromWei(this.state.allowance, 'mwei') }</p>
            </Message> : null
          }
        </Segment>
      </div>
    );
  }

  handleQueryAccountChange(event) {
    this.setState({
      queryAccount: event.target.value,
      balance: ''
    });
  }

  async handleBalanceSubmit(event) {
    event.preventDefault();
    const balance = await this.props.inst.methods.balanceOf(this.state.queryAccount).call();
    this.setState({
      balance
    });
  }

  handleAllowanceOwnerChange(event) {
    this.setState({
      allowanceOwner: event.target.value,
      allowance: ''
    });
  }

  handleAllowanceSpenderChange(event) {
    this.setState({
      allowanceSpender: event.target.value,
      allowance: ''
    });
  }

  async handleAllowanceSubmit(event) {
    event.preventDefault();
    const allowance = await this.props.inst.methods.allowance(this.state.allowanceOwner, this.state.allowanceSpender).call();
    this.setState({
      allowance
    });
  }
}

export default BalanceAllowance;