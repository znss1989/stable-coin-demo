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
      mintValue: '',
    }
    this.handleMintWalletChange = this.handleMintWalletChange.bind(this);
    this.handleSetMintWalletSubmit = this.handleSetMintWalletSubmit.bind(this);
    this.handleReturnValueChange = this.handleReturnValueChange.bind(this);
    this.handleFundReturnSubmit = this.handleMintSubmit.bind(this);
    this.handleMintValueChange = this.handleMintValueChange.bind(this);
    this.handleMintSubmit = this.handleMintSubmit.bind(this);
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
                <p className="text-display">Current mint wallet &nbsp; <EtherscanLink address={this.props.mintWallet} /></p>
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
                          Set Mint Wallet
                        </Button>
                      }
                    >
                      <Modal.Header>Set Mint Wallet</Modal.Header>
                      <Modal.Content>
                        <Form onSubmit={this.handleSetMintWalletSubmit}>
                          <Form.Field>
                            <label className="form-row" htmlFor="mint-wallet">
                              New Mint Wallet
                            </label>
                            <input id="mint-wallet" type="text" name="mint-wallet" placeholder="0x123..."
                              value={this.state.mintWallet} onChange={this.handleMintWalletChange} />
                          </Form.Field>
                          {/* <Button className="form-row center-button" type="submit" primary fluid>Set New Mint Wallet</Button> */}
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <ConfirmPrompt
                          triggerText="Set new mint wallet"
                          color="blue"
                          handleConfirm={this.handleSetMintWalletSubmit}
                        >
                          <p>The mint wallet will be set from {this.props.mintWallet} to {this.state.mintWallet}.</p>
                        </ConfirmPrompt>
                      </Modal.Actions>
                    </Modal> :
                    <Button
                      className="form-row center-button"
                      primary
                      fluid
                      disabled
                    >
                      Set Mint Wallet
                    </Button>
                }
              </Grid.Column>
            </Grid.Row>
            <br />

            {/* Fund return to recycle wallet */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Balance allowed to return: &nbsp; {this.props.mintWalletBalance}</p>
              </Grid.Column>
              <Grid.Column width={4}>
                {
                  this.props.currentAccount === this.props.mintWallet ?
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
                        <Form onSubmit={this.handleMintSubmit}>
                          <Form.Field>
                            <label className="form-row" htmlFor="mint-value">
                              Amount to return
                        </label>
                            <input id="mint-value" type="text" name="mint-value" placeholder="Amount of tokens"
                              value={this.state.mintValue} onChange={this.handleReturnValueChange} />
                          </Form.Field>
                          {/* <Button className="form-row center-button" type="submit" primary fluid>Return to Recycle Wallet</Button> */}
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <ConfirmPrompt
                          triggerText="Return to Recycle Wallet"
                          color="blue"
                          handleConfirm={this.handleMintSubmit}
                        >
                          <p>{this.state.mintValue} of {this.props.symbol} will be returned to the recycle wallet.</p>
                        </ConfirmPrompt>
                      </Modal.Actions>
                    </Modal> :
                    <Button
                      className="form-row center-button"
                      primary
                      fluid
                      disabled
                    >
                      Fund return
                    </Button>
                }

              </Grid.Column>
            </Grid.Row>
            <br />

            {/* Mint */}
            <Grid.Row>
              <Grid.Column width={12}>
                <p className="text-display">Current total supply: &nbsp; {this.props.totalSupply}</p>
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
                          Mint
                        </Button>
                      }
                    >
                      <Modal.Header>Mint Tokens</Modal.Header>
                      <Modal.Content>
                        <Form onSubmit={this.handleMintSubmit}>
                          <Form.Field>
                            <label className="form-row" htmlFor="mint-value">
                              Amount to mint
                            </label>
                            <input id="mint-value" type="text" name="mint-value" placeholder="Amount of tokens"
                              value={this.state.mintValue} onChange={this.handleMintValueChange} />
                          </Form.Field>
                          {/* <Button className="form-row center-button" type="submit" primary fluid>Mint to Mint Wallet</Button> */}
                        </Form>
                      </Modal.Content>
                      <Modal.Actions>
                        <ConfirmPrompt
                          triggerText="Mint"
                          color="blue"
                          handleConfirm={this.handleMintSubmit}
                        >
                          <p>{this.state.mintValue} of {this.props.symbol} will be minted to the mint wallet.</p>
                        </ConfirmPrompt>
                      </Modal.Actions>
                    </Modal> :
                    <Button
                      className="form-row center-button"
                      primary
                      fluid
                      disabled
                    >
                      Mint
                    </Button>
                }

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
    } catch (err) {
      alert(err);
    }
  }

  handleReturnValueChange(event) {
    this.setState({
      returnValue: event.target.value
    });
  }

  async handleMintSubmit(event) {
    event.preventDefault();
    const returnValueStr = web3.utils.toWei(this.state.mintValue, 'mwei').toString();
    try {
      await this.props.inst.methods.fundReturn(
        returnValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch (err) {
      alert(err);
    }
  }

  handleMintValueChange(event) {
    this.setState({
      mintValue: event.target.value
    });
  }

  async handleMintSubmit(event) {
    event.preventDefault();
    const mintValueStr = web3.utils.toWei(this.state.mintValue, 'mwei').toString();
    try {
      await this.props.inst.methods.mint(
        mintValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch (err) {
      alert(err);
    }
  }
}

export default Mint;