/**
 * Checa se a key existe no sessionStorage
 *
 * @param {string} key
 * @returns boolean
 */
const hasKey = (key) => {
  return sessionStorage.hasOwnProperty(key);
};

/**
 * Recupera um objeto do sessionStorage
 *
 * @param {string} key
 * @param {string} value
 * @returns {any}
 */
export const getFromSessionStorage = (key, value = null) => {
  const storedValue = sessionStorage.getItem(key);

  return storedValue ? JSON.parse(storedValue) : value;
};

/**
 * Salva alguma informação no sessionStorage
 *
 * @param {string} key
 * @param {string} value
 * @returns {void}
 */
export const setInSessionStorage = (key, value) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

export const removeFromSessionStorage = (key) => {
  if (hasKey(key)) {
    sessionStorage.removeItem(key);

    return true;
  }

  return false;
};
