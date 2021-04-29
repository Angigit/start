import '../css/contentComponent.css';

export default class ContentComponent {
  clearContent() {
    document.querySelector('#content').innerHTML = '';
  }

  clearErrors() {
    const errors = document.querySelector('.errors');
    if(errors.firstChild) {
      errors.removeChild(errors.firstChild);
    }
  }

  displayError(message) {
    const popupMessage = document.createElement('h2');
    popupMessage.classList.add('error-message');
    popupMessage.innerHTML = message;
    this.clearErrors();
    document.querySelector('.errors').appendChild(popupMessage);
  }
}