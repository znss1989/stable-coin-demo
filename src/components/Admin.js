import React from 'react';
import { Segment, Card, Form, Modal, Button } from 'semantic-ui-react';

import web3 from '../service/web3';
import EtherscanLink from './EtherscanLink';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mintValue: '',
      mintWallet: '',
      recycleWallet: ''
    };
    this.handleMintValueChange = this.handleMintValueChange.bind(this);
    this.handleMintSubmit = this.handleMintSubmit.bind(this);
    this.handleMintWalletChange = this.handleMintWalletChange.bind(this);
    this.handleSetMintWalletSubmit = this.handleSetMintWalletSubmit.bind(this);
    this.handleRecycleWalletChange = this.handleRecycleWalletChange.bind(this);
    this.handleSetRecycleWalletSubmit = this.handleSetRecycleWalletSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Admin</h3>
          <Card fluid meta="Current Contract Owner" description={<EtherscanLink address={ this.props.owner } />} />
          <br />
          <Modal trigger={<Button className="form-row center-button" size="large" primary fluid disabled={this.props.currentAccount !== this.props.owner}>Mint</Button>}>
            <Modal.Header>Mint</Modal.Header>
            <Modal.Content>
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
            </Modal.Content>
          </Modal>
          <br />
          <Modal trigger={<Button className="form-row center-button" size="large" primary fluid>Set Mint Wallet</Button>}>
            <Modal.Header>Set New Mint Wallet</Modal.Header>
            <Modal.Content>
            <Form onSubmit={ this.handleSetMintWalletSubmit }>
              <Form.Field>
                <label className="form-row" htmlFor="mint-wallet">
                  New Mint Wallet
                </label>
                <input id="mint-wallet" type="text" name="mint-wallet" placeholder="0x123..."
                  value={this.state.mintWallet} onChange={ this.handleMintWalletChange } />
              </Form.Field>
              <Button className="form-row center-button" type="submit" primary fluid>Set New Mint Wallet</Button>
            </Form>
            </Modal.Content>
          </Modal>
          <br />
          <Modal trigger={<Button className="form-row center-button" size="large" primary fluid>Set Recycle Wallet</Button>}>
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
                <Button className="form-row center-button" type="submit" primary fluid>Set New Recycle Wallet</Button>
              </Form>
            </Modal.Content>
          </Modal>
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
    try {
      await this.props.inst.methods.mint(
        mintValueStr
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
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
}

export default Admin;