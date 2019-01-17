import React from 'react';
import { Card } from 'semantic-ui-react';

import EtherscanLink from './EtherscanLink';

const BasicInfo = (props) => {
  return (
    <div>
      <Card fluid meta="Stable Coin Token Name" description={props.tokenName} />
      <Card fluid meta="Symbol" description={props.symbol} />
      <Card fluid meta="Decimals" description={props.decimals} />
      <Card fluid meta="Total Supply of Tokens" description={props.totalSupply} />
      <Card fluid meta="Contract Address" description={<EtherscanLink address={props.contractAddress} />} />
    </div>
  );
};

export default BasicInfo;