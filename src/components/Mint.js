import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

import web3 from '../service/web3';

class Mint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mintValue: '',
      issueTo: '',
      issueValue: '',
    }
    this.handleMintValueChange = this.handleMintValueChange.bind(this);
    this.handleMintSubmit = this.handleMintSubmit.bind(this);
    this.handleIssueToChange = this.handleIssueToChange.bind(this);
    this.handleIssueValueChange = this.handleIssueValueChange.bind(this);
    this.handleIssueSubmit = this.handleIssueSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Mint</h3>
          <Form onSubmit={ this.handleMintSubmit }>
            <Form.Field>
              <label className="form-row" htmlFor="mint-value">
                Value
              </label>
              <input id="mint-value" type="text" name="mint-value" placeholder="Amount of tokens" 
                value={ this.state.mintValue } onChange={ this.handleMintValueChange } />
            </Form.Field>
            <Button className="form-row center-button" type="submit" primary fluid>Mint</Button>
          </Form>
          <br />
          <h3>Issue</h3>
          <Form onSubmit={ this.handleIssueSubmit}>
            <Form.Field>
              <label className="form-row" htmlFor="issue-to">
                Address to Issue
              </label>
              <input id="issue-to" type="text" name="issue-to" placeholder="0x123..."
                value={ this.state.issueTo }  onChange={ this.handleIssueToChange } />
            </Form.Field>
            <Form.Field>
              <label className="form-row" htmlFor="issue-value">
                Value to Issue
              </label>
              <input id="issue-value" type="text" name="issue-value" placeholder="Amount of tokens" 
                value={ this.state.issueValue } onChange={ this.handleIssueValueChange } />
            </Form.Field>
            <Button className="form-row center-button" type="submit" primary fluid>Issue</Button>
          </Form>
        </Segment>
      </div>
    );
  }

  handleMintValueChange(event) {
    this.setState({
      mintValue: event.target.value
    });
  }

  async handleMintSubmit(event) {
    event.preventDefault();
    const mintValueStr = web3.utils.toWei(this.state.mintValue, 'mwei').toString();
    await this.props.inst.methods.mint(
      mintValueStr
    ).send({
      from: this.props.currentAccount
    });
  }

  handleIssueToChange(event) {
    this.setState({
      issueTo: event.target.value
    });
  }

  handleIssueValueChange(event) {
    this.setState({
      issueValue: event.target.value
    });
  }

  async handleIssueSubmit(event) {
    event.preventDefault();
    const issueValueStr = web3.utils.toWei(this.state.issueValue, 'mwei').toString();
    await this.props.inst.methods.issue(
      this.state.issueTo,
      issueValueStr
    ).send({
      from: this.props.currentAccount
    });
  }
}

export default Mint;