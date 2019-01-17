import React from 'react';
import { Grid, Icon } from 'semantic-ui-react';

import EtherscanLink from './EtherscanLink';

const ConnectionStatus = (props) => {
  return (
    <div>
      <Grid columns={2} >
        <Grid.Column width={6}>
          MetaMask enabled { props.isMetaMask ? <Icon name="check" color="green"></Icon> : <Icon name="cancel" color="red"></Icon> } 
        </Grid.Column>
        <Grid.Column width={10}>
          Netowrk: 
          { 
            props.network.type ? 
              (
                props.network.type.toUpperCase() === "RINKEBY" ? 
                  <span>{props.network.type.toUpperCase()}<Icon name="check" color="green"></Icon></span> : 
                  <span>{props.network.type.toUpperCase()}<Icon name="cancel" color="red"></Icon> (RINKEBY should be used)</span>
              ) : 
              '' 
          }
        </Grid.Column>
      </Grid>
      <Grid columns={2}>
        <Grid.Column width={6}>
          Account unlocked { props.isUnlocked ? <Icon name="check" color="green"></Icon> : <Icon name="cancel" color="red"></Icon> }
        </Grid.Column>
        <Grid.Column width={10}>
          Current Account <EtherscanLink address={props.currentAccount} />
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ConnectionStatus;