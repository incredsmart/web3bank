/**
 * Checa se o endereço da wallet é válido
 * 
 * @param {string} userWallet 
 * @param {any} web3
 * @returns {boolean}
 */
export const isWalletValid = (userWallet, web3) => {
  const result = web3.utils.isAddress(userWallet);

  return result;
};
