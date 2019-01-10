const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // clean existing build result

const contractPaths = ['ToCNH', 'ToPHP', 'ToUSD'].map(name => {
  return path.resolve(__dirname, 'contracts', `${name}.sol`);
});
const contractSources = contractPaths.map(contractPath => {
  return fs.readFileSync(contractPath, 'utf8');
});

const outputs = [];
for (let source of contractSources) {
  const output = solc.compile(source, 1).contracts;
  outputs.push(output);
}

fs.ensureDirSync(buildPath);

outputs.forEach(output => {
  for (let contract in output) {
    fs.outputJSONSync(
      path.resolve(buildPath, `${contract.replace(':', '')}.json`),
      output[contract]
    );
  }
});










// const ISCoinContractPath = path.resolve(__dirname, 'contracts', 'ISCoin.sol');
// const ISCoinContractSource = fs.readFileSync(ISCoinContractPath, 'utf8');

// const output = solc.compile(ISCoinContractSource, 1).contracts;

// fs.ensureDirSync(buildPath);

// for (let contract in output) {
//   console.log(contract);
//   fs.outputJSONSync(
//     path.resolve(buildPath, `${contract.replace(':', '')}.json`),
//     output[contract]
//   );
// }