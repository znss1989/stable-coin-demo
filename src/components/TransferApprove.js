import React from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';

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
    const amountStr= web3.utils.toWei(this.state.transferAmount, 'ether').toString();
    await this.props.inst.methods.transfer(
      this.state.transferRecipient, 
      amountStr
    ).send({
      from: this.props.account
    });
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Token Transfer</h3>
          <Form onSubmit={this.handleTransferSubmit}>
            <Form.Field>
              <label className="form-row" htmlFor="transfer-recipient">
                Recipient Address
              </label>
              <input id="transfer-recipient" type="text" name="recipient" placeholder="0x123..." 
                value={this.state.transferRecipient} onChange={this.handleTransferRecipientChange} />
            </Form.Field>
            <Form.Field>
              <label className="form-row" htmlFor="transfer-amount">
                Value
              </label>
              <input id="transfer-amount" type="text" name="amount" placeholder="Amount of tokens" 
                value={this.state.transferAmount} onChange={this.handleTransferAmountChange} />
            </Form.Field>
            <Button className="form-row center-button" type="submit" primary fluid>Transfer</Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default TransferApprove;