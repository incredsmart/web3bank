import { isWalletValid } from './isWalletValid.mjs';
import { setInLocalStorage, getFromLocalStorage } from './localStorage.mjs';
import {
  setInSessionStorage,
  getFromSessionStorage,
  removeFromSessionStorage,
} from './sessionStorage.mjs';
import { URL, CONTRACT, CONTRACT_ADDRESS } from './web3Config.mjs';
import { showToast } from './toastifyManager.mjs';
import { getBalance, deposit, withdraw } from './web3Methods.mjs';

const web3 = new Web3(URL);

const cashMachineAbi = CONTRACT.abi;
const cashMachineAddress = CONTRACT_ADDRESS;

// Cria uma instância do contrato CashMachine
const cashMachineContract = new web3.eth.Contract(
  cashMachineAbi,
  cashMachineAddress
);

const userWalletInput = document.getElementById('userWallet');
const loginBtn = document.querySelector('#submit');

loginBtn?.addEventListener('click', (event) => {
  event.preventDefault();
  loginBtn.setAttribute('disabled', 'disabled');

  const userWallet = userWalletInput.value.trim();
  const walletValidity = isWalletValid(userWallet, web3);

  if (walletValidity) {
    setInLocalStorage('user', {
      userWallet,
      auth: true,
    });

    validWalletMessage();

    // Simula uma requisição ao servidor
    setTimeout(() => {
      window.location.href = 'app.html';
    }, 2000);
  } else {
    setInSessionStorage('error', 'Endereço da carteira inválido');
    invalidWalletMessage();
    loginBtn.removeAttribute('disabled');
  }
});

const invalidWalletMessage = () => {
  const errorMessage = getFromSessionStorage('error');

  showToast(errorMessage, 'error');

  removeFromSessionStorage('error');
};

const validWalletMessage = () => {
  showToast(
    'Tudo certo! Você será redirecionado a qualquer momento.',
    'success'
  );
};

/**
 * Mostra uma mensagem de usuário não autenticado
 */
const authWarning = () => {
  const hrefArr = window.location.pathname.split('/');
  const actualHref = hrefArr[hrefArr.length - 1];
  const warningMessage = getFromSessionStorage('auth-warning');

  if (warningMessage && actualHref === 'index.html') {
    showToast(warningMessage, 'warning');

    removeFromSessionStorage('auth-warning');
  }
};

authWarning();

/**
 * Verifica se o usuário está autenticado ou não
 */
const checkIfUserIsAuthenticated = () => {
  const hrefArr = window.location.pathname.split('/');
  const actualHref = hrefArr[hrefArr.length - 1];
  const user = getFromLocalStorage('user');

  if (user?.auth && actualHref === 'index.html') {
    loginBtn.setAttribute('disabled', 'disabled');
    userWalletInput.setAttribute('disabled', 'disabled');

    showToast('Você já está autenticado. Redirecionando!', 'warning');

    // Simula uma requisição ao servidor
    setTimeout(() => {
      window.location.href = 'app.html';
    }, 2000);
  } else if (user?.auth == null && actualHref === 'app.html') {
    setInSessionStorage(
      'auth-warning',
      'Você não está autenticado. Faça login!'
    );

    window.location.href = 'index.html';
  }
};

checkIfUserIsAuthenticated();

/**
 * Troca a ação do caixa eletrônico
 */
const atm = document.getElementById('atm');

const depositBtn = document.getElementById('total-deposit');
const withdrawBtn = document.getElementById('total-withdraw');

const depositCancel = document.getElementById('deposit-cancel');
const withdrawCancel = document.getElementById('withdraw-cancel');

const goToDeposit = () => {
  atm.classList.add('goToDeposit');
  atm.classList.remove('goToTotal');
};

const goToTotal = () => {
  atm.classList.add('goToTotal');
  atm.classList.remove('goToDeposit');
  atm.classList.remove('goToWithdraw');
};

const goToWithdraw = () => {
  atm.classList.add('goToWithdraw');
  atm.classList.remove('goToTotal');
};

depositBtn.addEventListener('click', goToDeposit);
withdrawBtn.addEventListener('click', goToWithdraw);

depositCancel.addEventListener('click', goToTotal);
withdrawCancel.addEventListener('click', goToTotal);

/**
 * CashMachine methods
 */
const updateTotal = async () => {
  const totalInfo = document.getElementById('eth-total');
  const { userWallet } = getFromLocalStorage('user');

  totalInfo.textContent = await getBalance(
    web3,
    cashMachineContract,
    userWallet
  );
};

const checkIfUserIsInApp = () => {
  const hrefArr = window.location.pathname.split('/');
  const actualHref = hrefArr[hrefArr.length - 1];
  const user = getFromLocalStorage('user');

  if (user?.auth && actualHref === 'app.html') {
    updateTotal();
  }
};

checkIfUserIsInApp();

// Save transaction in localStorage
const saveTransaction = (userWallet, type, amount) => {
  const transactionsList = getFromLocalStorage('transactions');

  if (!transactionsList) {
    const transaction = [
      {
        userWallet,
        userTransactions: [
          {
            type,
            amount,
            date: new Date(),
          },
        ],
      },
    ];

    setInLocalStorage('transactions', transaction);
  } else {
    const newTx = {
      type,
      amount,
      date: new Date(),
    };
    transactionsList.forEach((transaction) => {
      if (transaction.userWallet === userWallet) {
        const allTransactions = transaction.userTransactions;
        allTransactions.unshift(newTx);

        transaction.userTransactions = allTransactions;
      }
    });

    setInLocalStorage('transactions', transactionsList);
  }
};

// Deposit
const confirmDepositBtn = document.getElementById('deposit-confirm');

confirmDepositBtn.addEventListener('click', async () => {
  const depositAmount = document.getElementById('deposit-amount').value;
  const { userWallet } = getFromLocalStorage('user');

  try {
    await deposit(web3, cashMachineContract, userWallet, depositAmount);

    goToTotal();
    updateTotal();
    saveTransaction(userWallet, 'deposit', depositAmount);

    showToast('Depósito realizado com sucesso!', 'success');
  } catch (err) {
    console.log(err);
    showToast(
      'Oooops! Algo de errado de aconteceu. Tente mais tarde!',
      'error'
    );
  }
});

// withdraw
const confirmWithdrawBtn = document.getElementById('withdraw-confirm');

confirmWithdrawBtn.addEventListener('click', async () => {
  const withdrawAmount = document.getElementById('withdraw-amount').value;
  const { userWallet } = getFromLocalStorage('user');

  try {
    await withdraw(web3, cashMachineContract, userWallet, withdrawAmount);

    goToTotal();
    updateTotal();
    saveTransaction(userWallet, 'withdraw', withdrawAmount);

    showToast('Saque realizado com sucesso!', 'success');
  } catch (err) {
    console.log(err);
    showToast(
      'Oooops! Algo de errado de aconteceu. Tente mais tarde!',
      'error'
    );
  }
});
