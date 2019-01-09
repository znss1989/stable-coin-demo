import React from 'react';
import { Grid, Segment, Icon } from 'semantic-ui-react';

// import EtherscanLink from './EtherscanLink';

const ConnectionStatus = (props) => {
  return (
    <div>
      <Grid columns={2} >
        <Grid.Column width={6}>
          <Segment>MetaMask enabled: <Icon name="check" color="green"></Icon><Icon name="cancel" color="red"></Icon></Segment>
          {/* <Segment>MetaMask启用：{ props.isMetaMask ? <Icon name='thumbs up outline' /> : <Icon name='x' /> }</Segment> */}
        </Grid.Column>
        <Grid.Column width={10}>
          b
          {/* <Segment>连接区块链网络：{props.network.type}</Segment> */}
        </Grid.Column>
      </Grid>
      <Grid columns={2}>
        <Grid.Column width={6}>
          c
          {/* <Segment>账户解锁：{ props.isUnlocked ? <Icon name='thumbs up outline' /> : <Icon name='x' /> }</Segment> */}
        </Grid.Column>
        <Grid.Column width={10}>
          d
          {/* <Segment>我的账户：
            <EtherscanLink address={props.currentAccount} />
          </Segment> */}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default ConnectionStatus;