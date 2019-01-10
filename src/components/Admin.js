import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mintWallet: '',
      recycleWallet: ''
    };
    this.handleMintWalletChange = this.handleMintWalletChange.bind(this);
    this.handleSetMintWalletSubmit = this.handleSetMintWalletSubmit.bind(this);
    this.handleRecycleWalletChange = this.handleRecycleWalletChange.bind(this);
    this.handleSetRecycleWalletSubmit = this.handleSetRecycleWalletSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Set Mint Wallet</h3>
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
          <br />
          <h3>Set Recycle Wallet</h3>
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
    await this.props.inst.methods.setMintWallet(
      this.state.mintWallet
    ).send({
      from: this.props.currentAccount
    });
  }

  handleRecycleWalletChange(event) {
    this.setState({
      recycleWallet: event.target.value
    });
  }

  async handleSetRecycleWalletSubmit(event) {
    event.preventDefault();
    await this.props.inst.methods.setMintWallet(
      this.state.recycleWallet
    ).send({
      from: this.props.currentAccount
    });
  }
}

export default Admin;