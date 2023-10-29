import { isWalletValid } from './isWalletValid.mjs';
import { setInLocalStorage, getFromLocalStorage } from './localStorage.mjs';
import {
  setInSessionStorage,
  getFromSessionStorage,
  removeFromSessionStorage,
} from './sessionStorage.mjs';
import { URL, CONTRACT, CONTRACT_ADDRESS } from './web3Config.mjs';
import { showToast } from './toastifyManager.mjs';

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