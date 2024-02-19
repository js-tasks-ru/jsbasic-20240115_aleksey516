import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  #modal = null;
  
  constructor() {
    this.#modal = this.#createRootModal() || this.#modal;
    this.#renderOnClose();
  }

  #createRootModal() {
    return new createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title">
          </h3>
        </div>
        <div class="modal__body">
        </div>
      </div>
    </div>
    `);
  }

  #renderOnClose() {
    this.#modal.addEventListener('click', (event) => {
      if(event.target.closest('.modal__close')) {
        this.close();
      }
    });
    document.addEventListener('keydown', this.#closeOnKey);
  }

  setTitle(title) {
    this.#modal.querySelector('.modal__title').textContent = title;
  }

  setBody(node) {
    this.#modal.querySelector('.modal__body').appendChild(node);
  }

  open() {
    document.body.append(this.#modal);
    document.body.classList.add('is-modal-open');
  }

  close() {
    let modal = document.querySelector('.modal');
    if(modal) {
      modal.remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  #closeOnKey = (event) => {
    if(event.code == 'Escape') {
      this.close();
    }
    document.removeEventListener('keydown', this.#closeOnKey);
  }
}
