import React from 'react';
import { Segment, Modal, Form, Button } from 'semantic-ui-react';

import web3 from '../service/web3';

class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTo: '',
      issueValue: '',
    }

    this.handleIssueToChange = this.handleIssueToChange.bind(this);
    this.handleIssueValueChange = this.handleIssueValueChange.bind(this);
    this.handleIssueSubmit = this.handleIssueSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Issue</h3>
          <br />
          <Modal trigger={<Button className="form-row center-button" size="large" primary fluid>Issue</Button>}>
            <Modal.Header>Issue</Modal.Header>
            <Modal.Content>
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
            </Modal.Content>
          </Modal>
        </Segment>
      </div>
    );
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
    try {
      await this.props.inst.methods.issue(
        this.state.issueTo,
        issueValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }
}

export default Issue;