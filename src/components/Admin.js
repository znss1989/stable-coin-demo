import React from 'react';
import { Segment, Grid, Form, Modal, Button, Divider, Table } from 'semantic-ui-react';

import EtherscanLink from './EtherscanLink';
import ConfirmPrompt from './ConfirmPrompt';
import tokenAddresses from '../configuration/tokenAddresses.json';
import FilteredTxService from '../service/FilteredTxService';

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newOwner: '',
      txList: []
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
                {
                  this.props.currentAccount === this.props.owner ?
                    <Modal 
                      trigger={
                        <Button 
                          className="form-row center-button" 
                          primary 
                          fluid
                        >
                          Set New Owner
                        </Button>
                      }
                    >
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
                    </Modal> :
                    <Button 
                      className="form-row center-button" 
                      primary 
                      fluid
                      disabled
                    >
                      Set New Owner
                    </Button>
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={3}>Time</Table.HeaderCell>
                <Table.HeaderCell width={5}>From</Table.HeaderCell>
                <Table.HeaderCell width={3}>Data</Table.HeaderCell>
                <Table.HeaderCell width={5}>Hash</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.state.txList.length > 0 && this.displayTxList(this.state.txList) }
            </Table.Body>
          </Table>
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

  async componentDidMount() {
    const txList = await this.getTransactions();
    this.setState({
      txList
    }); 
  }

  async getTransactions() {
    const tokenAddress = tokenAddresses[this.props.symbol];
    const res = await FilteredTxService.fetchAllTransactions(tokenAddress);
    return res.result;
  }

  displayTxList(txList) {
    console.log(txList);
    return txList.map(tx => {
      return (
        <Table.Row key={ tx.hash }>
          <Table.Cell width={3}>{ tx.timeStamp }</Table.Cell>
          <Table.Cell width={5}>{ tx.from }</Table.Cell>
          <Table.Cell width={3}>{ tx.input.slice(0, 12) + "..." }</Table.Cell>
          <Table.Cell width={5}>{ tx.hash.slice(0,6) + "..." }</Table.Cell>
        </Table.Row>
      );
    })
  }
}

export default Admin;