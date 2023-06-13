import "./css/confirm.css";

export default class ConfirmFactory {
  constructor(settings) {
    this.settings = settings;
    this.activeConfirms = [];

    this.container = document.createElement("div");
    this.container.classList.add("confirm-container");
    this.container.append(this.form);

    this.onBtnClick = this.onBtnClick.bind(this);

    this._form.addEventListener("click", onBtnClick);
  }

  get form() {
    const { confirmTitle, acceptBtn, cancelBtn } = this.settings;

    this._form = document.createElement("form");
    this._form.classList.add("confirm-form");

    this._form.innerHTML = `<div class="confirm-wrapper">
    <h3 class="confirm-title">${confirmTitle}</h3>
    <button class="confirm-accept-btn">${acceptBtn}</button>
    <button class="confirm-cancel-btn">${cancelBtn}</button>
</div>`;

    return form;
  }

  showConfirmForm() {
    const id = performance.now();
    document.body.append(this._form);
    this.activeConfirms.push({ id, element: this._form });
    return id;
  }

  onBtnClick(e) {
    e.preventDefault();

    if (e.target.classList.constains("confirm-accept-btn")) {
      return true;
    } else if (e.target.classList.constains("confirm-cancel-btn")) {
      return false;
    }
  }

  deleteConfirmForm(id) {
    const form = this.activeConfirms.find((el) => el.id === id);
    form.remove();
    this.activeConfirms = this.activeConfirms.filter((el) => el.id !== id);
  }
}
