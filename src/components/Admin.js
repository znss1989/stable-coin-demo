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
                <Table.HeaderCell width={4}>Time</Table.HeaderCell>
                <Table.HeaderCell width={4}>From</Table.HeaderCell>
                <Table.HeaderCell width={4}>Data</Table.HeaderCell>
                <Table.HeaderCell width={4}>Hash</Table.HeaderCell>
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
    return txList.map(tx => {
      return (
        <Table.Row key={ tx.hash }>
          <Table.Cell width={4}>{ this.gsdate(tx.timeStamp + '000', "yyyy-MM-dd HH:mm:ss") }</Table.Cell>
          <Table.Cell width={4}>
            <a href={`https://rinkeby.etherscan.io/address/${tx.from}`} target="_blank" rel="noopener noreferrer">
              {tx.from.slice(0, 10) + "..." + tx.from.slice(tx.from.length - 8)}
            </a>
          </Table.Cell>
          <Table.Cell width={4}>{ tx.input.slice(0, 18) + "..." }</Table.Cell>
          <Table.Cell width={4}>
            <a href={`https://rinkeby.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
              { tx.hash.slice(0, 10) + "..." + tx.hash.slice(tx.hash.length - 8) }
            </a>
          </Table.Cell>
        </Table.Row>
      );
    })
  }

  gsdate(time, format) {
    if (!time) return "--";
    var t = new Date(Number(time));
    var tf = function(i) {
      return (i < 10 ? "0" : "") + i;
    };
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
      switch (a) {
        case "yyyy":
          return tf(t.getFullYear());
        case "MM":
          return tf(t.getMonth() + 1);
        case "mm":
          return tf(t.getMinutes());
        case "dd":
          return tf(t.getDate());
        case "HH":
          return tf(t.getHours());
        case "ss":
          return tf(t.getSeconds());
      }
    });
  }
}

export default Admin;