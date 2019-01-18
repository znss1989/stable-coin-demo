import React from 'react';
import { Segment, Grid, Form, Modal, Button, Message, Divider } from 'semantic-ui-react';

import web3 from '../service/web3';
import EtherscanLink from './EtherscanLink';
import ConfirmPrompt from './ConfirmPrompt';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newOwner: ''
    }
    this.handleNewOwnerChange = this.handleNewOwnerChange.bind(this);
    this.handleSetNewOwnerSubmit = this.handleSetNewOwnerSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Admin</h3>
          <Divider />
          <Grid columns={2}>

            {/* Set new owner */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Current owner &nbsp; <EtherscanLink address={ this.props.owner } /></p>
              </Grid.Column>
              <Grid.Column width={4}>
                <Modal trigger={
                  <Button 
                    className="form-row center-button" 
                    primary 
                    fluid
                  >
                    Set New Owner
                  </Button>
                }>
                  <Modal.Header>Set New Owner</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={ this.handleSetNewOwnerSubmit }>
                      <Form.Field>
                        <label className="form-row" htmlFor="mint-wallet">
                          New Owner
                        </label>
                        <input id="mint-wallet" type="text" name="mint-wallet" placeholder="0x123..."
                          value={this.state.newOwner} onChange={ this.handleNewOwnerChange } />
                      </Form.Field>
                      {/* <Button className="form-row center-button" type="submit" primary fluid>Set New Mint Wallet</Button> */}
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <ConfirmPrompt
                      triggerText="Set new owner"
                      color="blue"
                      handleConfirm={ this.handleSetNewOwnerSubmit }
                    >
                      <p>The contract owner will be set from { this.props.owner } to { this.state.newOwner }.</p>
                    </ConfirmPrompt>
                  </Modal.Actions>
                </Modal>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }

  handleNewOwnerChange(event) {
    this.setState({
      newOwner: event.target.value
    });
  }

  async handleSetNewOwnerSubmit(event) {
    event.preventDefault();
    try {
      await this.props.inst.methods.transferOwnership(
        this.state.newOwner
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }
}

export default Admin;