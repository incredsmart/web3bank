/**
 * Checa se a key existe no localStorage
 * 
 * @param {string} key
 * @returns boolean
 */
const hasKey = (key) => {
  return localStorage.hasOwnProperty(key);
}

/**
 * Recupera um objeto do localStorage
 * 
 * @param {string} key
 * @param {string} value
 * @returns {any}
 */
export const getFromLocalStorage = (key, value = null) => {
  const storedValue = localStorage.getItem(key);

  return storedValue ? JSON.parse(storedValue) : value;
};

/**
 * Salva alguma informação no localStorage
 * 
 * @param {string} key
 * @param {string} value
 * @returns {void}
 */
export const setInLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
}

export const removeFromLocalStorage = (key) => {
  if (hasKey(key)) {
    localStorage.removeItem(key);

    return true
  }

  return false;
}