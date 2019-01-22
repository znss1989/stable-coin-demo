import React from 'react';
import { Segment, Grid, Form, Modal, Button, Message, Divider } from 'semantic-ui-react';

import web3 from '../service/web3';
import EtherscanLink from './EtherscanLink';
import ConfirmPrompt from './ConfirmPrompt';

class Recycle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recycleWallet: '',
      recycleValue: '',
      burnValue: '',
      readyToBurn: false,
      nIntervalId: ''
    }
    this.handleRecycleWalletChange = this.handleRecycleWalletChange.bind(this);
    this.handleSetRecycleWalletSubmit = this.handleSetRecycleWalletSubmit.bind(this);
    this.handleRecycleValueChange = this.handleRecycleValueChange.bind(this);
    this.handleRecycleSubmit = this.handleRecycleSubmit.bind(this);
    this.countForBurn = this.countForBurn.bind(this);
    this.resetCountForBurn = this.resetCountForBurn.bind(this);
    this.handleBurnValueChange = this.handleBurnValueChange.bind(this);
    this.handleBurnSubmit = this.handleBurnSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Recycle</h3>
          <Divider />
          <Grid columns={2}>

            {/* Set recycle wallet */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Current recycle wallet &nbsp; <EtherscanLink address={this.props.recycleWallet} /></p>
              </Grid.Column>
              <Grid.Column width={4}>
                {
                  this.props.currentAccount === this.props.owner ?
                    <Modal
                      trigger={
                        <Button
                          className="form-row center-button"
                          primary
                          fluid
                        >
                          Set Recycle Wallet
                        </Button>
                      }
                    >
                      <Modal.Header>Set Recycle Wallet</Modal.Header>
                      <Modal.Content>
                        <Form onSubmit={this.handleSetRecycleWalletSubmit}>
                          <Form.Field>
                            <label className="form-row" htmlFor="recycle-wallet">
                              New Recycle Wallet
                              </label>
                            <input id="recycle-wallet" type="text" name="recycle-wallet" placeholder="0x123..."
                              value={this.state.recycleWallet} onChange={this.handleRecycleWalletChange} />
                          </Form.Field>
                          {/* <Button className="form-row center-button" type="submit" primary fluid>Set New Recycle Wallet</Button> */}
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <ConfirmPrompt
                          triggerText="Set new recycle wallet"
                          color="blue"
                          handleConfirm={this.handleSetRecycleWalletSubmit}
                        >
                          <p>The recycle wallet will be set from {this.props.recycleWallet} to {this.state.recycleWallet}.</p>
                        </ConfirmPrompt>
                      </Modal.Actions>
                    </Modal> :
                    <Button
                      className="form-row center-button"
                      primary
                      fluid
                      disabled
                    >
                      Set Recycle Wallet
                      </Button>
                }
              </Grid.Column>
            </Grid.Row>
            <br />

            {/* Recycle to mint wallet */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Balance allowed to recycle: &nbsp; 
                  {
                    web3.utils.fromWei(this.props.recycleWalletBalance, 'mwei').toString()
                  }
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
                {
                  this.props.currentAccount === this.props.recycleWallet ?
                    <Modal trigger={<Button className="form-row center-button" primary fluid>Recycle to Mint Wallet</Button>}>
                      <Modal.Header>Recycle to Mint Wallet</Modal.Header>
                      <Modal.Content>
                        <Form onSubmit={this.handleRecycleSubmit}>
                          <Form.Field>
                            <label className="form-row" htmlFor="recycle-value">
                              Amount to recycle
                            </label>
                            <input id="recycle-value" type="text" name="recycle-value" placeholder="Amount of tokens"
                              value={this.state.recycleValue} onChange={this.handleRecycleValueChange} />
                          </Form.Field>
                          {/* <Button className="form-row center-button" type="submit" primary fluid>Set New Recycle Wallet</Button> */}
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <ConfirmPrompt
                          triggerText="Recycle to Mint Wallet"
                          color="blue"
                          handleConfirm={this.handleRecycleSubmit}
                        >
                          <p>{this.state.recycleValue} of {this.props.symbol} will be recycled to the mint wallet.</p>
                        </ConfirmPrompt>
                      </Modal.Actions>
                    </Modal> :
                    <Button
                      className="form-row center-button"
                      primary
                      fluid
                      disabled
                    >
                      Recycle to Mint Wallet
                    </Button>
                }

              </Grid.Column>
            </Grid.Row>
            <br />

            {/* Burn */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Balance allowed to burn: &nbsp; 
                  {
                    web3.utils.fromWei(this.props.recycleWalletBalance, 'mwei').toString()
                  }
                </p>
              </Grid.Column>
              <Grid.Column width={4}>
                {
                  this.props.currentAccount === this.props.recycleWallet ?
                    <Modal
                      trigger={
                        <Button
                          className="form-row center-button"
                          color="red"
                          fluid
                          onClick={this.countForBurn}
                        >
                          Burn
                        </Button>
                      }
                      onUnmount={this.resetCountForBurn}
                    >
                      <Modal.Header>Burn</Modal.Header>
                      <Modal.Content>
                        <Form onSubmit={this.handleBurnSubmit}>
                          <Form.Field>
                            <label className="form-row" htmlFor="burn-value">
                              Value to Burn
                            </label>
                            <input id="burn-value" type="text" name="burn-value" placeholder="Amount of tokens"
                              value={this.state.burnValue} onChange={this.handleBurnValueChange} />
                          </Form.Field>
                          {
                            !this.state.readyToBurn &&
                            <Message color="red">
                              <p>Be careful! Tokens will disapear due to this operation.</p>
                            </Message>
                          }
                          {/* <Button className="form-row center-button" type="submit" color="red" fluid>Burn</Button> */}
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        {
                          this.state.readyToBurn ?
                            <ConfirmPrompt
                              triggerText="Burn"
                              color="red"
                              handleConfirm={this.handleBurnSubmit}
                            >
                              <p>{this.state.burnValue} of {this.props.symbol} will be burnt.</p>
                            </ConfirmPrompt> :
                            <Button
                              className="form-row center-button confirm-trigger"
                              type="submit" color="red"
                              floated="right"
                              disabled
                            >
                              Burn
                            </Button>
                        }
                      </Modal.Actions>
                    </Modal> :
                    <Button
                      className="form-row center-button"
                      color="red"
                      fluid
                      onClick={this.countForBurn}
                      disabled
                    >
                      Burn
                  </Button>
                }

              </Grid.Column>
            </Grid.Row>
          </Grid>
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
    if (!this.state.recycleWallet) {
      alert("No input provided!");
      return;
    }
    try {
      await this.props.inst.methods.setRecycleWallet(
        this.state.recycleWallet
      ).send({
        from: this.props.currentAccount
      });
    } catch (err) {
      alert(err);
    }
  }

  handleRecycleValueChange(event) {
    this.setState({
      recycleValue: event.target.value
    });
  }

  async handleRecycleSubmit(event) {
    event.preventDefault();
    if (!this.state.recycleValue) {
      alert("No input provided!");
      return;
    }
    try {
      const recycleValueStr = web3.utils.toWei(this.state.recycleValue, 'mwei').toString();
      await this.props.inst.methods.recycle(
        recycleValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch (err) {
      alert(err);
    }
  }

  countForBurn() {
    this.setState({
      nIntervalId: setInterval(() => {
        this.setState({
          readyToBurn: true
        });
      }, 7500)
    });
  }

  resetCountForBurn() {
    clearInterval(this.state.nIntervalId);
    this.setState({
      readyToBurn: false,
      nIntervalId: ''
    });
  }

  handleBurnValueChange(event) {
    this.setState({
      burnValue: event.target.value
    });
  }

  async handleBurnSubmit(event) {
    event.preventDefault();
    if (!this.state.burnValue) {
      alert("No input provided!");
      return;
    }
    try {
      const burnValueStr = web3.utils.toWei(this.state.burnValue, 'mwei').toString();
      await this.props.inst.methods.burn(
        burnValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch (err) {
      alert(err);
    }
  }
}

export default Recycle;