import React from 'react';
import { Table } from 'semantic-ui-react';

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
          <h3>Transaction history</h3>
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
      </div>
    );
  }
}

export default Logs;