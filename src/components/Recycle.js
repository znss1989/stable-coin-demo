import React from 'react';
import { Segment, Grid, Form, Modal, Button } from 'semantic-ui-react';

import web3 from '../service/web3';
import EtherscanLink from './EtherscanLink';
import ConfirmPrompt from './ConfirmPrompt';

class Recycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recycleWallet: '',
      burnValue: ''
    }
    this.handleRecycleWalletChange = this.handleRecycleWalletChange.bind(this);
    this.handleSetRecycleWalletSubmit = this.handleSetRecycleWalletSubmit.bind(this);
    this.handleBurnValueChange = this.handleBurnValueChange.bind(this);
    this.handleBurnSubmit = this.handleBurnSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Recycle</h3>
          <br />
          <Grid columns={2}>
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Current recycle wallet &nbsp;&nbsp; <EtherscanLink address={ this.props.recycleWallet } /></p>
              </Grid.Column>
              <Grid.Column width={4}>
              <Modal trigger={<Button className="form-row center-button" primary fluid>Set Recycle Wallet</Button>}>
                <Modal.Header>Mint</Modal.Header>
                <Modal.Content>
                  <Form onSubmit={ this.handleSetRecycleWalletSubmit}>
                    <Form.Field>
                      <label className="form-row" htmlFor="recycle-wallet">
                        New Recycle Wallet
                      </label>
                      <input id="recycle-wallet" type="text" name="recycle-wallet" placeholder="0x123..."
                        value={this.state.recycleWallet} onChange={ this.handleRecycleWalletChange } />
                    </Form.Field>
                    {/* <Button className="form-row center-button" type="submit" primary fluid>Set New Recycle Wallet</Button> */}
                  </Form>
                </Modal.Content>
                <Modal.Actions>
                  <ConfirmPrompt
                    triggerText="Set new recycle wallet"
                    color="blue"
                    handleConfirm={ this.handleSetRecycleWalletSubmit }
                  >
                    <p>The recycle wallet will be set from { this.props.recycleWallet } to { this.state.recycleWallet }.</p>
                  </ConfirmPrompt>
                </Modal.Actions>
              </Modal>
              </Grid.Column>
            </Grid.Row>
            <br />
          </Grid>
          <p>Set recycle wallet</p>
          <p>Recycle tokens to mint wallet</p>
          <p>Burn tokens</p>
          <Modal trigger={<Button className="form-row center-button" size="large" color="red" fluid disabled={this.props.currentAccount !== this.props.recycleWallet}>Burn</Button>}>
            <Modal.Header>Burn</Modal.Header>
            <Modal.Content>
              <Form onSubmit={ this.handleBurnSubmit }>
                <Form.Field>
                  <label className="form-row" htmlFor="burn-value">
                    Value to Burn
                  </label>
                  <input id="burn-value" type="text" name="burn-value" placeholder="Amount of tokens"
                    value={ this.state.burnValue } onChange={this.handleBurnValueChange } />
                </Form.Field>
                <Button className="form-row center-button" type="submit" color="red" fluid>Burn</Button>
              </Form>
            </Modal.Content>
          </Modal>
        </Segment>
      </div>
    );
  }

  handleRecycleWalletChange(event) {
    this.setState({
      recycleWallet: event.target.value
    });
  }

  async handleSetRecycleWalletSubmit(event) {
    event.preventDefault();
    try {
      await this.props.inst.methods.setMintWallet(
        this.state.recycleWallet
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }

  handleBurnValueChange(event) {
    this.setState({
      burnValue: event.target.value
    });
  }

  async handleBurnSubmit(event) {
    event.preventDefault();
    const burnValueStr = web3.utils.toWei(this.state.burnValue, 'mwei').toString();
    try {
      await this.props.inst.methods.burn(
        burnValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }
}

export default Recycle;