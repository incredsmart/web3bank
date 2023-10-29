const getMessageType = (type) => {
  return {
    error: { background: 'linear-gradient(to right, #F02F5C, #B1002F)' },
    warning: { background: 'linear-gradient(to right, #FF917D, #FFC65F)' },
    success: { background: 'linear-gradient(to right, #24C196, #008A64)' },
  }[type];
};

/**
 * Invoca uma mensagem de feedback empacotada em um toast
 *
 * @param {string} message
 * @param {string} type
 * @param {number} duration
 * @returns {void}
 */
export const showToast = (message, type, duration = 3000) => {
  Toastify({
    text: `${message}`,
    duration,
    style: getMessageType(type),
  }).showToast();
};
