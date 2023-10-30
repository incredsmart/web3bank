// Endpoint da rede Ethereum
const URL = 'ws://localhost:8545';

// Contrato CashMachine (interface)
const builtContract = await fetch('../../server/build/contracts/CashMachine.json');

const CONTRACT = await builtContract.json();

// Endereço do contrato
const CONTRACT_ADDRESS = '0x23da1F7c33A168a284fe20Ba47227E3b83F16eaf';

export { URL, CONTRACT, CONTRACT_ADDRESS };
