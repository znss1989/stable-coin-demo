import React from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';

import EtherscanLink from './EtherscanLink';

const ConnectionStatus = (props) => {
  return (
    <div>
      <Grid columns={2} >
        <Grid.Column width={6}>
          <Segment>MetaMask enabled: { props.isMetaMask ? <Icon name="check" color="green"></Icon> : <Icon name="cancel" color="red"></Icon> } 
          </Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>Netowrk：{ props.network.type ? props.network.type.toUpperCase() : '' }</Segment>
        </Grid.Column>
      </Grid>
      <Grid columns={2}>
        <Grid.Column width={6}>
          <Segment>Account unlocked: { props.isUnlocked ? <Icon name="check" color="green"></Icon> : <Icon name="cancel" color="red"></Icon> }</Segment>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment>Current Account: 
            <EtherscanLink address={props.currentAccount} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ConnectionStatus;