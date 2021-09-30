const Toastify = require('toastify-js');

const toast = (title: string, message?: string, bgColor = 'red') => {
  Toastify({
    text: `${title} ${message ? `: ${message}` : ''}`,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    backgroundColor: bgColor
  }).showToast();
};

export default toast;
