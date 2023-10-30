/**
 * Retorna o total armazenado na carteira
 *
 * @param {any} web3
 * @param {any} cashMachineContract
 * @param {string} userWallet
 * @returns {number}
 */
export const getBalance = async (web3, cashMachineContract, userWallet) => {
  const balance = await cashMachineContract.methods
    .getBalance(userWallet)
    .call();

  const total = Number(web3.utils.fromWei(balance, 'ether')).toFixed(4);

  return total;
};

/**
 * Deposita o valor especificado em wei
 *
 * @param {any} web3
 * @param {any} cashMachineContract
 * @param {string} userWallet
 * @param {number} depositAmount
 */
export const deposit = async (
  web3,
  cashMachineContract,
  userWallet,
  depositAmount
) => {
  const amount = web3.utils.toWei(depositAmount, 'ether');
  const depositStatus = await cashMachineContract.methods
    .deposit(amount)
    .send({ from: userWallet, value: amount });
};

/**
 * Saca um valor especificado em wei
 *
 * @param {any} web3
 * @param {any} cashMachineContract
 * @param {string} userWallet
 * @param {number} withdrawAmount
 */
export const withdraw = async (
  web3,
  cashMachineContract,
  userWallet,
  withdrawAmount
) => {
  const amount = web3.utils.toWei(`${withdrawAmount}`, 'ether');
  const withdrawStatus = await cashMachineContract.methods
    .withdraw(amount)
    .send({ from: userWallet });
};
