const { Web3 } = require('web3');
const fs = require('fs');

// Cria uma instância do Web3 e fornece o endpoint da rede Ethereum
const web3 = new Web3('ws://localhost:8545');

// Importa o contrato CashMachine ABI (interface) e o endereço do contrato
const contract = JSON.parse(
  fs.readFileSync('../build/contracts/CashMachine.json', 'utf8')
);

const cashMachineAbi = contract.abi;
const cashMachineAddress = '0xb729E1349C790ab4c8c759e6Fb0F62E70DD5b1EF';

// Cria uma instância do contrato CashMachine
const cashMachineContract = new web3.eth.Contract(
  cashMachineAbi,
  cashMachineAddress
);

const userWallet = '0x2FC863c0763b6C9060C960D04005c4a3741f2b5F';
// const userPrivateKey =
//   '0x7284a1d2bd8ebdf3d24a7dc6c7777d7eafed056bd1b5dd8ee55f69b0239ef96f';

const getBalance = async () => {
  const balance = await cashMachineContract.methods
    .getBalance(userWallet)
    .call();

  console.log(
    'balance ===>',
    Number(web3.utils.fromWei(balance, 'ether')).toFixed(6)
  );
};

// getBalance();

const deposit = async () => {
  const depositAmount = web3.utils.toWei('1', 'ether');
  // const depositAmount = 5;
  const depositStatus = await cashMachineContract.methods
    .deposit(depositAmount)
    .send({ from: userWallet, value: depositAmount });

  getBalance();
};

// deposit();

const withdraw = async (depositAmount) => {
  const withdrawAmount = web3.utils.toWei('0.2', 'ether');
  const withdrawStatus = await cashMachineContract.methods
    .withdraw(withdrawAmount)
    .send({ from: userWallet });

  getBalance();
};

// withdraw();

const getTransactions = async () => {
  const transactionCount = await cashMachineContract.methods
    .getTransactionCount()
    .call();

  for (let i = 0; i < transactionCount; i++) {
    const [sender, amount, timestamp] = await cashMachineContract.methods
      .getTransaction(i)
      .call();
    console.log(
      `Transaction ${
        i + 1
      }: Sender: ${sender}, Amount: ${amount} wei, Timestamp: ${new Date(
        timestamp * 1000
      )}`
    );
  }

  // console.log(userTransactions);
  // console.table(userTransactions);
};

// getTransactions();

