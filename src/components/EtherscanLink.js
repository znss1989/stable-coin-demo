import React from 'react';

const EtherscanLink = (props) => {
  return (
    <a href={`https://rinkeby.etherscan.io/address/${props.address}`} target="_blank" rel="noopener noreferrer">{props.address}</a>
  );
};

export default EtherscanLink;