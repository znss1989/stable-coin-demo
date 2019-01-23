import React from 'react';
import { Segment, Table } from 'semantic-ui-react';

import tokenAddresses from '../configuration/tokenAddresses.json';
import FilteredTxService from '../service/FilteredTxService';
import dateFormat from '../service/dateFormat';

class Logs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txList: []
    };
  }

  render() {
    return (
      <div>
        <Segment>
          <h3>Transaction history</h3>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={2}>Type</Table.HeaderCell>
                <Table.HeaderCell width={3}>Date time</Table.HeaderCell>
                <Table.HeaderCell width={4}>Sent from</Table.HeaderCell>
                <Table.HeaderCell width={4}>Tx hash</Table.HeaderCell>
                <Table.HeaderCell width={3}>Data peek</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.state.txList.length > 0 && this.displayTxList(this.state.txList) }
            </Table.Body>
          </Table>
          <br />
        </Segment>
      </div>
    );
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
          {/* Type */}
          <Table.Cell width={2}>
            { FilteredTxService.decideMethod(tx.input.slice(0, 10)) }
          </Table.Cell>
          {/* Time */}
          <Table.Cell width={3}>{ dateFormat(tx.timeStamp + '000', "yyyy-MM-dd HH:mm:ss") }</Table.Cell>
          {/* From */}
          <Table.Cell width={4}>
            <a href={`https://rinkeby.etherscan.io/address/${tx.from}`} target="_blank" rel="noopener noreferrer">
              { tx.from.slice(0, 10) + "..." + tx.from.slice(tx.from.length - 8) }
            </a>
          </Table.Cell>
          {/* Hash */}
          <Table.Cell width={4}>
            <a href={`https://rinkeby.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer">
              { tx.hash.slice(0, 10) + "..." + tx.hash.slice(tx.hash.length - 8) }
            </a>
          </Table.Cell>
          {/* Data */}
          <Table.Cell width={3}>{ tx.input.slice(0, 18) + "..." }</Table.Cell>
        </Table.Row>
      );
    })
  }
}

export default Logs;