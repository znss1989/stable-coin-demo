import web3 from './web3';
import tokenAddresses from '../configuration/tokenAddresses.json';

const getLogsOnIssueList = async (contractAddress) => {
  const AddingLogs = await web3.eth.getPastLogs({
    fromBlock: 3653940,
    address: contractAddress,
    topics: ["0x7e9f640e400f5364816966f9eb3201dd5a6e7dbf356e683272cb0d208c6dfd82"] // for "event IssuelistAdded(address indexed member);"
  });
  const RemovingLogs = await web3.eth.getPastLogs({
    fromBlock: 3653940,
    address: contractAddress,
    topics: ["0x9f3edc15374b5465f1469a678c207a1a7b78020cfa76a3dabaf1a0717511c2b9"] // for "event IssuelistAdded(address indexed member);"
  });
  const issueLogs = AddingLogs.concat(RemovingLogs);
  issueLogs.sort((log1, log2) => {
    return (log1.blockNumber - log2.blockNumber !== 0) ?
      log1.blockNumber - log2.blockNumber :
      log1.logIndex - log2.logIndex;
  });
  return issueLogs;
};

const updateIssueList = (issueList, issueLogs) => {
  issueLogs.forEach(log => {
    const address = log.topics[1].slice(26);
    const location = issueList.indexOf(address);
    if (log.topics[0] === "0x7e9f640e400f5364816966f9eb3201dd5a6e7dbf356e683272cb0d208c6dfd82") { // add to issue list
      if (location === -1) {
        issueList.push(address);
      }
    } else { // remove from list
      if (location !== -1) {
        issueList.splice(location, 1);
      }
    }
  });
};

const fetchIssueList = async (contractName) => {
  const issueList = [];
  // resolve contract address
  const contractAddress = tokenAddresses[contractName];
  // fetch all event logs related to the issue list
  const issueLogs = await getLogsOnIssueList(contractAddress);
  // update and return the issue list
  updateIssueList(issueList, issueLogs);
  return issueList;
};

export default fetchIssueList;