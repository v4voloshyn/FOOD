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
   tabs();
   cards();
   modal('[data-modal]', '.modal', modalTimerId);
   slider();
   forms('form', modalTimerId);
   calc();
   timer();         
});
