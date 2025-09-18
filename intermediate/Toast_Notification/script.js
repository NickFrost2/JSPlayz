const userMessage = document.getElementById('userMessage');
const toastDisplay = document.querySelector('.toast-container');

function displayToast(type) {
   let message = userMessage.value.trim();
   if (!message) {
      message = 'No message';
   }
   new Toast(message, type).display();
}

class Toast {
   constructor(message, type) {
      this.message = message;
      this.type = type;
   }
   display() {
      const toast = document.createElement('div');
      toast.className = `toast ${this.type}`;
      toast.innerHTML = `<span class="toast-display">${this.message}</span>
                              <button class="toast-close" aria-label="Close">✕</button>`;
      //toastDisplay.appendChild(toast);  use appendchild to add toast to the bottom
      toastDisplay.prepend(toast);// use prepend to add toast to the top
      requestAnimationFrame(() => {
         toast.classList.add('show');
      });

      setTimeout(() => {
         removeToast(toast);
      }, 5000);
   }
}

document.body.addEventListener('click', function (event) {
   const toastCloseButton = event.target.closest('.toast-close');
   if (toastCloseButton) {
      const toast = toastCloseButton.parentElement;
      removeToast(toast);
   }
});

function removeToast(toast) {
   toast.classList.remove('show');
   toast.classList.add('remove');
   toast.addEventListener('animationend', function () {
      if (this.parentElement) this.remove();
   }, { once: true });
}