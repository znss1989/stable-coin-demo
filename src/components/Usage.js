import React from 'react';
import { Segment, Button, Modal, Form, Message, Divider } from 'semantic-ui-react';

import web3 from '../service/web3';
import ConfirmPrompt from './ConfirmPrompt';

class Usage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferRecipient: '',
      transferAmount: '',
      // approveSpender: '',
      // approveAmount: '',
      queryAccount: '',
      balance: '',
      // allowanceOwner: '',
      // allowanceSpender: '',
      // allowance: ''
    }
    this.handleTransferRecipientChange = this.handleTransferRecipientChange.bind(this);
    this.handleTransferAmountChange = this.handleTransferAmountChange.bind(this);
    this.handleTransferSubmit = this.handleTransferSubmit.bind(this);
    // this.handleApproveSpenderChange = this.handleApproveSpenderChange.bind(this);
    // this.handleApproveAmountChange = this.handleApproveAmountChange.bind(this);
    // this.handleApproveSubmit = this.handleApproveSubmit.bind(this);
    this.handleQueryAccountChange = this.handleQueryAccountChange.bind(this);
    this.handleBalanceSubmit = this.handleBalanceSubmit.bind(this);
    // this.handleAllowanceOwnerChange = this.handleAllowanceOwnerChange.bind(this);
    // this.handleAllowanceSpenderChange = this.handleAllowanceSpenderChange.bind(this);
    // this.handleAllowanceSubmit = this.handleAllowanceSubmit.bind(this);
  }

  render() {
    const isSpecialAccount = this.props.currentAccount === this.props.owner || this.props.currentAccount === this.props.mintWallet || this.props.currentAccount === this.props.recycleWallet;
    return (
      <div>
        <Segment>
          <h3>ERC20 Usage</h3>
          <Divider />
          {
            isSpecialAccount &&   
            <Message info>
              <Message.Header>Special account?</Message.Header>
              <p>No transfer operation being a special account!</p>
            </Message>
          }
          {/* Token transfer */}
          <Modal trigger={<Button className="form-row center-button" size="large" primary fluid disabled={ isSpecialAccount }>Token Transfer</Button>}>
            <Modal.Header>Token Transfer</Modal.Header>
            <Modal.Content>
              <Form onSubmit={ this.handleTransferSubmit }>
                <Form.Field>
                  <label className="form-row" htmlFor="transfer-recipient">
                    Recipient Address
                  </label>
                  <input id="transfer-recipient" type="text" name="recipient" placeholder="0x123..." 
                    value={ this.state.transferRecipient } onChange={ this.handleTransferRecipientChange } />
                </Form.Field>
                <Form.Field>
                  <label className="form-row" htmlFor="transfer-amount">
                    Value
                  </label>
                  <input id="transfer-amount" type="text" name="transfer-amount" placeholder="Amount of tokens" 
                    value={ this.state.transferAmount } onChange={ this.handleTransferAmountChange } />
                </Form.Field>
                {/* <Button className="form-row center-button" type="submit" primary fluid>Transfer</Button> */}
              </Form>
            </Modal.Content>
            <Modal.Actions>
              <ConfirmPrompt
                triggerText="Transfer"
                color="blue"
                handleConfirm={ this.handleTransferSubmit }
              >
                <p>{ this.state.transferAmount } of { this.props.symbol } will be transfered to { this.state.transferRecipient }.</p>
              </ConfirmPrompt>
            </Modal.Actions>
          </Modal>
          <br />
          {/* <Modal trigger={<Button className="form-row center-button" size="large" primary fluid disabled={ isSpecialAccount }>Approve</Button>}>
            <Modal.Header>Token Transfer</Modal.Header>
            <Modal.Content>
              <Form onSubmit={ this.handleApproveSubmit }>
                <Form.Field>
                  <label className="form-row" htmlFor="approve-spender">
                    Spender Address
                  </label>
                  <input id="approve-spender" type="text" name="spender" placeholder="0x123..."
                    value={ this.state.approveSpender }  onChange={ this.handleApproveSpenderChange } />
                </Form.Field>
                <Form.Field>
                  <label className="form-row" htmlFor="approve-amount">
                    Value to approve
                  </label>
                  <input id="approve-amount" type="text" name="approve-amount" placeholder="Amount of tokens" 
                    value={ this.state.approveAmount } onChange={ this.handleApproveAmountChange } />
                </Form.Field>
                <Button className="form-row center-button" type="submit" primary fluid>Approve</Button>
              </Form>
            </Modal.Content>
          </Modal>
          <br /> */}

          {/* Check balance */}
          <Modal trigger={<Button className="form-row center-button" size="large" color="teal" fluid>Check Balance</Button>}>
            <Modal.Header>Check Balance</Modal.Header>
            <Modal.Content>
              <Form onSubmit={ this.handleBalanceSubmit }>
                <Form.Field>
                  <label className="form-row" htmlFor="query-account">
                    Account Address
                  </label>
                  <input id="query-account" type="text" name="query-account" placeholder="0x123..."
                  value={ this.state.queryAccount } onChange={ this.handleQueryAccountChange } />
                </Form.Field>
                <Button className="form-row center-button" type="submit" color="teal" fluid>Check Balance</Button>
              </Form>
              { 
                this.state.balance ? 
                <Message>
                  <p>Amount of Tokens: { web3.utils.fromWei(this.state.balance, 'mwei') }</p>
                </Message> : null
              }
            </Modal.Content>
          </Modal>
          {/* <br />
          <Modal trigger={<Button className="form-row center-button" size="large" color="teal" fluid>Check Allowance</Button>}>
            <Modal.Header>Check Allowance</Modal.Header>
            <Modal.Content>
              <Form onSubmit={ this.handleAllowanceSubmit }>
                <Form.Field>
                  <label className="form-row" htmlFor="allowance-owner">
                    Allowance Owner Address
                  </label>
                  <input id="allowance-owner" type="text" name="allowance-owner" placeholder="0x123..."
                  value={ this.state.allowanceOwner } onChange={ this.handleAllowanceOwnerChange } />
                </Form.Field>
                <Form.Field>
                  <label className="form-row" htmlFor="allowance-spender">
                    Allowance Spender Address
                  </label>
                  <input id="allowance-spender" type="text" name="allowance-spener" placeholder="0x123..."
                  value={ this.state.allowanceSpender } onChange={ this.handleAllowanceSpenderChange } />
                </Form.Field>
                <Button className="form-row center-button" type="submit" color="teal" fluid>Check Allowance</Button>
              </Form>
              { 
                this.state.allowance ? 
                <Message>
                  <p>Allowance in Tokens: { web3.utils.fromWei(this.state.allowance, 'mwei') }</p>
                </Message> : null
              }
            </Modal.Content>
          </Modal> */}
        </Segment>
      </div>
    );
  }

  handleTransferRecipientChange(event) {
    this.setState({
      transferRecipient: event.target.value
    });
  }

  handleTransferAmountChange(event) {
    this.setState({
      transferAmount: event.target.value
    });
  }

  async handleTransferSubmit(event) {
    event.preventDefault();
    const amountStr= web3.utils.toWei(this.state.transferAmount, 'mwei').toString();
    try {
      await this.props.inst.methods.transfer(
        this.state.transferRecipient, 
        amountStr
      ).send({
        from: this.props.currentAccount
      });
    } catch(err) {
      alert(err);
    }
  }

  // handleApproveSpenderChange(event) {
  //   this.setState({
  //     approveSpender: event.target.value
  //   });
  // }

  // handleApproveAmountChange(event) {
  //   this.setState({
  //     approveAmount: event.target.value
  //   });
  // }

  // async handleApproveSubmit(event) {
  //   event.preventDefault();
  //   const amountStr= web3.utils.toWei(this.state.approveAmount, 'mwei').toString();
  //   try {
  //     await this.props.inst.methods.approve(
  //       this.state.approveSpender, 
  //       amountStr
  //     ).send({
  //       from: this.props.currentAccount
  //     });
  //   } catch(err) {
  //     alert(err);
  //   }
  // }

  handleQueryAccountChange(event) {
    this.setState({
      queryAccount: event.target.value,
      balance: ''
    });
  }

  async handleBalanceSubmit(event) {
    event.preventDefault();
    let balance;
    try {
      balance = await this.props.inst.methods.balanceOf(this.state.queryAccount).call();
    } catch(err) {
      alert(err);
    }
    this.setState({
      balance
    });
  }

  // handleAllowanceOwnerChange(event) {
  //   this.setState({
  //     allowanceOwner: event.target.value,
  //     allowance: ''
  //   });
  // }

  // handleAllowanceSpenderChange(event) {
  //   this.setState({
  //     allowanceSpender: event.target.value,
  //     allowance: ''
  //   });
  // }

  // async handleAllowanceSubmit(event) {
  //   event.preventDefault();
  //   let allowance;
  //   try {
  //     allowance = await this.props.inst.methods.allowance(this.state.allowanceOwner, this.state.allowanceSpender).call();
  //   } catch(err) {
  //     alert(err);
  //   }
  //   this.setState({
  //     allowance
  //   });
  // }
}

export default Usage;