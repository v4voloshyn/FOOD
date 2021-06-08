import tabs from './modules/tabs';
import cards from './modules/cards';
import modal from './modules/modal';
import slider from './modules/slider';
import forms from './modules/forms';
import calc from './modules/calc';
import timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
      const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 5000);
   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   cards();
   modal('[data-modal]', '.modal', modalTimerId);
   slider({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArr: '.offer__slider-next',
      prevArr: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current'
   });
   forms('form', modalTimerId);
   calc();
   timer('.timer', '2021-06-25T23:59:59');         
});
