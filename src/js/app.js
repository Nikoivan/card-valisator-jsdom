import CardWidget from '../card-widget/card-widget';
import CardCollection from '../card-widget/compopents/CardCollection';

const wrapper = document.querySelector('.wrapper');

const cardwidget = new CardWidget(wrapper, CardCollection);

cardwidget.bindToDOM();
