// Endpoint da rede Ethereum
const URL = 'ws://localhost:8545';

// Contrato CashMachine (interface)
const builtContract = await fetch('../../server/build/contracts/CashMachine.json');

const CONTRACT = await builtContract.json();

// Endereço do contrato
const CONTRACT_ADDRESS = '0xC85D31F46d28B2dDa2Af295E75fF6c9a1DA5F657';

export { URL, CONTRACT, CONTRACT_ADDRESS };
