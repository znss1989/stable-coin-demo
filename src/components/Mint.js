import React from 'react';
import { Segment, Grid, Form, Modal, Button, Message, Divider } from 'semantic-ui-react';

import web3 from '../service/web3';
import EtherscanLink from './EtherscanLink';
import ConfirmPrompt from './ConfirmPrompt';

class Mint extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mintWallet: '',
      returnValue: '',
      burnValue: '',
      readyToBurn: false
    }
    this.handleMintWalletChange = this.handleMintWalletChange.bind(this);
    this.handleSetMintWalletSubmit = this.handleSetMintWalletSubmit.bind(this);
    this.handleReturnValueChange = this.handleReturnValueChange.bind(this);
    this.handleFundReturnSubmit = this.handleFundReturnSubmit.bind(this);
    this.countForBurn = this.countForBurn.bind(this);
    this.resetCountForBurn = this.resetCountForBurn.bind(this);
    this.handleBurnValueChange = this.handleBurnValueChange.bind(this);
    this.handleBurnSubmit = this.handleBurnSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Mint</h3>
          <Divider />
          <Grid columns={2}>

            {/* Set mint wallet */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Current mint wallet &nbsp; <EtherscanLink address={ this.props.mintWallet } /></p>
              </Grid.Column>
              <Grid.Column width={4}>
                <Modal trigger={
                  <Button 
                    className="form-row center-button" 
                    primary 
                    fluid
                  >
                    Set Mint Wallet
                  </Button>
                }>
                  <Modal.Header>Set Mint Wallet</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={ this.handleSetMintWalletSubmit }>
                      <Form.Field>
                        <label className="form-row" htmlFor="mint-wallet">
                          New Mint Wallet
                        </label>
                        <input id="mint-wallet" type="text" name="mint-wallet" placeholder="0x123..."
                          value={this.state.mintWallet} onChange={ this.handleMintWalletChange } />
                      </Form.Field>
                      {/* <Button className="form-row center-button" type="submit" primary fluid>Set New Mint Wallet</Button> */}
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <ConfirmPrompt
                      triggerText="Set new mint wallet"
                      color="blue"
                      handleConfirm={ this.handleSetMintWalletSubmit }
                    >
                      <p>The mint wallet will be set from { this.props.mintWallet } to { this.state.mintWallet }.</p>
                    </ConfirmPrompt>
                  </Modal.Actions>
                </Modal>
              </Grid.Column>
            </Grid.Row>
            <br />

            {/* Fund return to recycle wallet */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Balance allowed to return: &nbsp; { this.props.mintWalletBalance }</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <Modal 
                  trigger={
                    <Button 
                      className="form-row center-button" 
                      primary 
                      fluid
                    >
                      Fund return
                    </Button>
                  }
                >
                  <Modal.Header>Fund Return to Recycle Wallet</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={ this.handleFundReturnSubmit }>
                      <Form.Field>
                        <label className="form-row" htmlFor="return-value">
                          Amount to return
                        </label>
                        <input id="return-value" type="text" name="return-value" placeholder="Amount of tokens"
                          value={ this.state.returnValue } onChange={ this.handleReturnValueChange } />
                      </Form.Field>
                      {/* <Button className="form-row center-button" type="submit" primary fluid>Return to Recycle Wallet</Button> */}
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <ConfirmPrompt
                      triggerText="Return to Recycle Wallet"
                      color="blue"
                      handleConfirm={ this.handleFundReturnSubmit }
                    >
                      <p>{ this.state.returnValue } of { this.props.symbol } will be returned to the recycle wallet.</p>
                    </ConfirmPrompt>
                  </Modal.Actions>
                </Modal>              
              </Grid.Column>
            </Grid.Row>
            <br />

            {/* Burn */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Balance allowed to return: &nbsp; { this.props.mintWalletBalance }</p>
              </Grid.Column>
              <Grid.Column width={4}>
                <Modal 
                  trigger={
                    <Button 
                      className="form-row center-button" 
                      primary 
                      fluid
                    >
                      Fund return
                    </Button>
                  }
                >
                  <Modal.Header>Fund Return to Recycle Wallet</Modal.Header>
                  <Modal.Content>
                    <Form onSubmit={ this.handleFundReturnSubmit }>
                      <Form.Field>
                        <label className="form-row" htmlFor="return-value">
                          Amount to return
                        </label>
                        <input id="return-value" type="text" name="return-value" placeholder="Amount of tokens"
                          value={ this.state.returnValue } onChange={ this.handleReturnValueChange } />
                      </Form.Field>
                      {/* <Button className="form-row center-button" type="submit" primary fluid>Return to Recycle Wallet</Button> */}
                    </Form>
                  </Modal.Content>
                  <Modal.Actions>
                    <ConfirmPrompt
                      triggerText="Return to Recycle Wallet"
                      color="blue"
                      handleConfirm={ this.handleFundReturnSubmit }
                    >
                      <p>{ this.state.returnValue } of { this.props.symbol } will be returned to the recycle wallet.</p>
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

  handleMintWalletChange(event) {
    this.setState({
      mintWallet: event.target.value
    });
  }

  async handleSetMintWalletSubmit(event) {
    event.preventDefault();
    try {
      await this.props.inst.methods.setMintWallet(
        this.state.mintWallet
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }

  handleReturnValueChange(event) {
    this.setState({
      returnValue: event.target.value
    });
  }

  async handleFundReturnSubmit(event) {
    event.preventDefault();
    const returnValueStr = web3.utils.toWei(this.state.returnValue, 'mwei').toString();
    try {
      await this.props.inst.methods.fundReturn(
        returnValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }

  countForBurn() {
    setInterval(() => {
      this.setState({
        readyToBurn: true
      });
    }, 7500);
  }

  resetCountForBurn() {
    this.setState({
      readyToBurn: false
    });
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

export default Mint;