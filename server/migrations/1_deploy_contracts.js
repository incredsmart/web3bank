const CashMachine = artifacts.require('CashMachine');

module.exports = function (deployer) {
  deployer.deploy(CashMachine);
};
