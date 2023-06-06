/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/card-widget/moon-algoritm.js
function moonAlgorithm(setValue) {
  let ch = 0;
  const num = String(setValue).replace(/\D/g, '');
  const isOdd = num.length % 2 !== 0;
  if ('' === num) return false;
  for (let i = 0; i < num.length; i++) {
    let n = parseInt(num[i], 10);
    ch += (isOdd | 0) === i % 2 && 9 < (n *= 2) ? n - 9 : n;
  }
  return 0 === ch % 10;
}
;// CONCATENATED MODULE: ./src/card-widget/check-pay-sys.js
function checkPaySys(value) {
  const cardCollection = [{
    paySys: 'visa',
    re: /^4/
  }, {
    paySys: 'master-card',
    re: /^5[1-5]/
  }, {
    paySys: 'amex',
    re: /^3[47]/
  }, {
    paySys: 'discover',
    re: /^60/
  }, {
    paySys: 'jcb',
    re: /^3[15]/
  }, {
    paySys: 'diner',
    re: /^3[068]/
  }, {
    paySys: 'mir',
    re: /^2/
  }];
  const paySystem = cardCollection.find(el => el.re.test(value));
  if (paySystem) {
    return paySystem.paySys;
  } else {
    throw new Error('Тип платежной системы неопределен');
  }
}
;// CONCATENATED MODULE: ./src/card-widget/card-widget.js
//import "./card-widget.css";


class CardWidget {
  constructor(element, cardCollection) {
    this.element = element;
    this.cardCollection = new cardCollection();
    this.onBtnClick = this.onBtnClick.bind(this);
    this.closePopUp = this.closePopUp.bind(this);
    this.deactivated = this.deactivated.bind(this);
    this.checkActivited = this.checkActivited.bind(this);
    this.deactivated = this.deactivated.bind(this);
  }
  get markup() {
    const {
      visa,
      masterCard,
      amex,
      discover,
      jcb,
      diner,
      mir
    } = this.cardCollection.collection;
    return `<div class="card-widget">
    <ul class="card-list">
        <li class="card-item"><img src="${visa}" data-sys="visa" alt="card-visa" class="image"></li>
        <li class="card-item"><img src="${masterCard}" data-sys="master-card" alt="card-mastercard" class="image"></li>
        <li class="card-item"><img src="${amex}" data-sys="amex" alt="card-americanexpress" class="image"></li>
        <li class="card-item"><img src="${discover}" data-sys="discover" alt="card-discoverer" class="image"></li>
        <li class="card-item"><img src="${jcb}" data-sys="jcb" alt="card-jcb" class="image"></li>
        <li class="card-item"><img src="${diner}" data-sys="diner" alt="card-diners" class="image"></li>   
        <li class="card-item"><img src="${mir}" data-sys="mir" alt="card-diners" class="image"></li>             
    </ul>
    <div class="activator"></div>
    <form class="form">
        <input class="input" placeholder="Credit card number">
        <button class="btn">Click to Validate</button>
    </form>
</div>  `;
  }
  bindToDOM() {
    this.element.innerHTML = this.markup;
    this.cardList = this.element.querySelector('.card-list');
    this.connectCardList();
    this.deactivatedCards = [];
    this.form = this.element.querySelector('.form');
    this.input = this.form.querySelector('.input');
    this.btn = this.form.querySelector('.btn');
    this.form.addEventListener('submit', this.onBtnClick);
    this.form.addEventListener('input', this.checkActivited);
  }
  onBtnClick(e) {
    e.preventDefault();
    const value = this.input.value.trim();
    if (!this.validate(value)) {
      this.showError('Ошибка');
      return;
    }
    if (moonAlgorithm(value)) {
      const paySys = checkPaySys(value);
      this.activeCard(paySys);
    }
  }
  connectCardList() {
    this.controlCardList = [];
    [...this.cardList.children].forEach(el => {
      const sysItem = {
        image: el.querySelector('.image'),
        paySys: el.querySelector('.image').dataset.sys
      };
      this.controlCardList.push(sysItem);
    });
  }
  checkActivited() {
    if (this.deactivatedCards.length === 0) {
      return;
    }
    const value = this.input.value.trim();
    if (!this.validate(value) || !moonAlgorithm(value)) {
      this.deactivated();
    }
  }
  deactivated() {
    this.deactivatedCards.forEach(el => el.image.classList.remove('deactive'));
    this.deactivatedCards = [];
  }
  activeCard(paySys) {
    this.actitivitedCard = this.controlCardList.find(el => el.paySys === paySys);
    this.controlCardList.forEach(el => {
      if (el.paySys !== paySys) {
        el.image.classList.add('deactive');
        this.deactivatedCards.push(el);
      }
    });
  }
  showError(arg) {
    if (!this.popUp) {
      const popUp = this.createPopUp(arg);
      this.popUp = popUp;
      this.element.append(this.popUp);
    } else {
      this.popUp.classList.remove('disable');
    }
  }
  createPopUp(arg) {
    const popUpWrapper = document.createElement('div');
    popUpWrapper.classList.add('popup-wrapper');
    const closeImg = document.createElement('span');
    closeImg.classList.add('close');
    closeImg.textContent = `X`;
    closeImg.addEventListener('click', this.closePopUp);
    const popUpContainer = document.createElement('div');
    popUpContainer.classList.add('popup');
    const message = document.createElement('span');
    message.textContent = arg;
    popUpContainer.append(closeImg);
    popUpContainer.append(message);
    popUpWrapper.append(popUpContainer);
    return popUpWrapper;
  }
  closePopUp() {
    this.popUp.classList.add('disable');
  }
  validate(value) {
    return /^\d{14,16}$/.test(value);
  }
}
;// CONCATENATED MODULE: ./src/card-widget/img/card-visa.gif
const card_visa_namespaceObject = __webpack_require__.p + "5e6039b25c1afd4c6a98.gif";
;// CONCATENATED MODULE: ./src/card-widget/img/card-mastercard.gif
const card_mastercard_namespaceObject = __webpack_require__.p + "a4f14bb8a4efd8b8a073.gif";
;// CONCATENATED MODULE: ./src/card-widget/img/card-amex.gif
const card_amex_namespaceObject = __webpack_require__.p + "2bd22590c95e3561bab8.gif";
;// CONCATENATED MODULE: ./src/card-widget/img/card-discover.gif
const card_discover_namespaceObject = __webpack_require__.p + "d2b0bca54a895557bff6.gif";
;// CONCATENATED MODULE: ./src/card-widget/img/card-jcb.gif
const card_jcb_namespaceObject = __webpack_require__.p + "e14d52ab2d89d044b433.gif";
;// CONCATENATED MODULE: ./src/card-widget/img/card-diners.gif
const card_diners_namespaceObject = __webpack_require__.p + "8b3916de428514df340b.gif";
;// CONCATENATED MODULE: ./src/card-widget/img/mir-logo_norm.png
const mir_logo_norm_namespaceObject = __webpack_require__.p + "63c152583a5d633daabb.png";
;// CONCATENATED MODULE: ./src/card-widget/compopents/CardCollection.js







class CardCollection {
  constructor() {
    this.visa = card_visa_namespaceObject;
    this.masterCard = card_mastercard_namespaceObject;
    this.amex = card_amex_namespaceObject;
    this.discover = card_discover_namespaceObject;
    this.jcb = card_jcb_namespaceObject;
    this.diner = card_diners_namespaceObject;
    this.mir = mir_logo_norm_namespaceObject;
  }
  get collection() {
    return {
      visa: this.visa,
      masterCard: this.masterCard,
      amex: this.amex,
      discover: this.discover,
      jcb: this.jcb,
      diner: this.diner,
      mir: this.mir
    };
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const wrapper = document.querySelector('.wrapper');
const cardwidget = new CardWidget(wrapper, CardCollection);
cardwidget.bindToDOM();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;