import { isWalletValid } from './isWalletValid.mjs';
import { setInLocalStorage } from './localStorage.mjs';
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

loginBtn.addEventListener('click', (event) => {
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
