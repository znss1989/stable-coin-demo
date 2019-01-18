import React from 'react';
import { Segment, Grid, Divider, Dimmer, Loader, Modal, Button, Form, Icon } from 'semantic-ui-react';

import web3 from '../service/web3';
import fetchIssueList from '../service/issueListService';
import EtherscanLink from './EtherscanLink';
import ConfirmPrompt from './ConfirmPrompt';

class Issue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      issueValue: '',
      issueDestination: '',
      issueList: [],
      newIssueMember: '',
      memberToDelete: ''
    }
    this.setIssueDestination = this.setIssueDestination.bind(this);
    this.resetIssueDestination = this.resetIssueDestination.bind(this);
    this.handleIssueValueChange = this.handleIssueValueChange.bind(this);
    this.handleIssueSubmit = this.handleIssueSubmit.bind(this);
    this.handleNewIssueMemberChange = this.handleNewIssueMemberChange.bind(this);
    this.handleAddToIssueListSubmit = this.handleAddToIssueListSubmit.bind(this);
    this.setMemberToDelete = this.setMemberToDelete.bind(this);
    this.resetMemberToDelete = this.resetMemberToDelete.bind(this);
    this.handleRemoveFromIssueList = this.handleRemoveFromIssueList.bind(this);
  }

  render() {
    const issueSegments = this.state.issueList.map(issueDestination => {
      return (
        <Grid.Row key={issueDestination}>
          {/* Issue to */}
          <Grid.Column width={3}>
            <Modal 
              trigger={
                <Button 
                  className="form-row center-button" 
                  primary
                  fluid
                  onClick={ () => { this.setIssueDestination(issueDestination) } }
                >Issue to</Button>
              }
              onUnmount={ this.resetIssueDestination }
            >
              <Modal.Header>Issue to specific destination</Modal.Header>
              <Modal.Content>
                <Form onSubmit={ this.handleIssueSubmit }>
                  <Form.Field>
                    <label className="form-row" htmlFor="issue-value">
                      Value to Issue
                    </label>
                    <input id="issue-value" type="text" name="issue-value" placeholder="Amount of tokens"
                      value={ this.state.issueValue } onChange={ this.handleIssueValueChange } />
                  </Form.Field>
                  {/* <Button className="form-row center-button" type="submit" color="red" fluid>Burn</Button> */}
                </Form>
              </Modal.Content>
              <Modal.Actions>
                <ConfirmPrompt
                  triggerText="Issue"
                  color="blue"
                  handleConfirm={ this.handleIssueSubmit }
                >
                  <p>{ this.state.issueValue } of { this.props.symbol } will be issued to { issueDestination }.</p>
                </ConfirmPrompt>
              </Modal.Actions>
            </Modal>            
          </Grid.Column>

          {/* Member of issue list */}
          <Grid.Column width={10}>
            <p className="text-display">Destination address: &nbsp; <EtherscanLink address={ issueDestination } /></p>
          </Grid.Column>

          {/* Remove from issue list */}
          <Grid.Column width={3}>
            <Modal 
              trigger={
                <Button 
                  className="form-row center-button" 
                  primary
                  fluid
                  onClick={
                    () => { 
                      this.setMemberToDelete(issueDestination); 
                    }
                  }
                >
                  <Icon name="minus" />
                </Button>
              }
              onUnmount={ this.resetMemberToDelete }
            >
              <Modal.Header>Remove from Issue List</Modal.Header>
              <Modal.Actions>
                <ConfirmPrompt
                  triggerText="Remove"
                  color="blue"
                  handleConfirm={ this.handleRemoveFromIssueList }
                >
                  <p>{ this.state.memberToDelete } will be removed from the issue list.</p>
                </ConfirmPrompt>
              </Modal.Actions>
            </Modal> 
          </Grid.Column>
        </Grid.Row>
      );
    });
    return (
      <div>
        {
          this.state.ready ?
          <Segment>
            <h3>Issue</h3>
            <Divider />
            <Grid>
              { issueSegments }
              <Grid.Row>
                <Grid.Column width={3}></Grid.Column>
                <Grid.Column width={10}></Grid.Column>
                <Grid.Column width={3}>
                  <Modal 
                    trigger={
                      <Button 
                        className="form-row center-button" 
                        primary
                        fluid
                      >
                        <Icon name="plus" />
                      </Button>
                    }
                  >
                    <Modal.Header>Add to Issue List</Modal.Header>
                    <Modal.Content>
                      <Form onSubmit={ this.handleAddToIssueListSubmit }>
                        <Form.Field>
                          <label className="form-row" htmlFor="issue-member">
                            New Member to Issue List
                          </label>
                          <input id="issue-member" type="text" name="issue-member" placeholder="0x123..."
                            value={ this.state.newIssueMember } onChange={ this.handleNewIssueMemberChange } />
                        </Form.Field>
                        {/* <Button className="form-row center-button" type="submit" color="red" fluid>Burn</Button> */}
                      </Form>
                    </Modal.Content>
                    <Modal.Actions>
                      <ConfirmPrompt
                        triggerText="Add to Issue List"
                        color="blue"
                        handleConfirm={ this.handleAddToIssueListSubmit }
                      >
                        <p>{ this.state.newIssueMember } will be added to the issue list.</p>
                      </ConfirmPrompt>
                    </Modal.Actions>
                  </Modal>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Segment> :
          <Segment id="panel-loader-segment">
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>
          </Segment> 
        }
      </div>
    );
  }

  async componentDidMount() {
    const issueList = await fetchIssueList(this.props.symbol);
    this.setState({
      issueList,
      ready: true
    });
  }

  setIssueDestination(issueDestination) {
    this.setState({
      issueDestination
    });
  }

  resetIssueDestination() {
    this.setState({
      issueDestination: ''
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
        this.state.issueDestination,
        issueValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }

  handleNewIssueMemberChange(event) {
    this.setState({
      newIssueMember: event.target.value
    });
  }

  async handleAddToIssueListSubmit(event) {
    event.preventDefault();
    try {
      await this.props.inst.methods.addToIssuelist(
        this.state.newIssueMember
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }

  setMemberToDelete(memberAddress) {
    this.setState({
      memberToDelete: memberAddress
    });
  }

  resetMemberToDelete() {
    this.setState({
      memberToDelete: ''
    });
  }

  async handleRemoveFromIssueList(event) {
    event.preventDefault();
    try {
      await this.props.inst.methods.removeFromIssuelist(
        this.state.memberToDelete
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }
}

export default Issue;