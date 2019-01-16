import React from 'react';
import { Segment, Button, Modal, Form } from 'semantic-ui-react';

import web3 from '../service/web3';

class TransferApprove extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transferRecipient: '',
      transferAmount: '',
      approveSpender: '',
      approveAmount: '',
    }
    this.handleTransferRecipientChange = this.handleTransferRecipientChange.bind(this);
    this.handleTransferAmountChange = this.handleTransferAmountChange.bind(this);
    this.handleTransferSubmit = this.handleTransferSubmit.bind(this);
    this.handleApproveSpenderChange = this.handleApproveSpenderChange.bind(this);
    this.handleApproveAmountChange = this.handleApproveAmountChange.bind(this);
    this.handleApproveSubmit = this.handleApproveSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <Segment>
          <Modal trigger={<Button className="form-row center-button" size="big" primary fluid>Token Transfer</Button>}>
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
                <Button className="form-row center-button" type="submit" primary fluid>Transfer</Button>
              </Form>
            </Modal.Content>
          </Modal>
          <br />
          <br />
          <Modal trigger={<Button className="form-row center-button" size="big" primary fluid>Approve</Button>}>
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
    await this.props.inst.methods.transfer(
      this.state.transferRecipient, 
      amountStr
    ).send({
      from: this.props.currentAccount
    });
  }

  handleApproveSpenderChange(event) {
    this.setState({
      approveSpender: event.target.value
    });
  }

  handleApproveAmountChange(event) {
    this.setState({
      approveAmount: event.target.value
    });
  }

  async handleApproveSubmit(event) {
    event.preventDefault();
    const amountStr= web3.utils.toWei(this.state.approveAmount, 'mwei').toString();
    await this.props.inst.methods.approve(
      this.state.approveSpender, 
      amountStr
    ).send({
      from: this.props.currentAccount
    });
  }
}

export default TransferApprove;