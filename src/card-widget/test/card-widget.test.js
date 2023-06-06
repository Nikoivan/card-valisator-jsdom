/**
 * @jest-environment jsdom
 */

import CardWidget from '../card-widget';
import CardCollection from '../compopents/CardCollection';

const paySysTestList = [
  [4716468925085991, 'visa'],
  [5548138161860800, 'master-card'],
  [343557931672302, 'amex'],
  [6011950476602289, 'discover'],
  [3530967404972849, 'jcb'],
  [36876965666598, 'diner'],
  [2200020225544867, 'mir'],
];

test.each(paySysTestList)(
  'testing number of card %q and expect result %w',
  (numberOfCard, paySys) => {
    document.body.innerHTML = `<div class="wrapper"></div>`;

    const wrapper = document.querySelector('.wrapper');
    const cardWidget = new CardWidget(wrapper, CardCollection);

    cardWidget.bindToDOM();

    const form = wrapper.querySelector('.form');
    const input = form.querySelector('.input');
    const btn = form.querySelector('.btn');

    input.value = numberOfCard;
    btn.click();

    const result = [...wrapper.querySelectorAll('.image')].find(
      (el) => !el.classList.contains('deactive')
    );

    expect(result.dataset.sys).toBe(paySys);
  }
);
