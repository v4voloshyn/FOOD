/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/modules/calc.js":
/*!********************************!*\
  !*** ./src/js/modules/calc.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {
   // Calculator

   const result = document.querySelector('.calculating__result span');
   let sex, height, weight, age, ratio;
// Подставка начений по умолчанию с LS после релоада страницы
   if (localStorage.getItem('sex')) {
      sex = localStorage.getItem('sex');
   } else {
      sex = 'female';
      localStorage.setItem('sex', 'female');
   }

   if (localStorage.getItem('ratio')) {
      ratio = localStorage.getItem('ratio');
   } else {
      ratio = 1.375;
      localStorage.setItem('ratio', 1.375);
   }

   // Инцииализация калькулятора на странице с подтягиванием данных с LocStor
   function initLocalSettings(selector, activeClass) {
      const elements = document.querySelectorAll(selector);

      elements.forEach(elem => {
         elem.classList.remove(activeClass);
         if(elem.getAttribute('id') === localStorage.getItem('sex')) {
            elem.classList.add(activeClass);
         }
         if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
            elem.classList.add(activeClass);
         }
      });
   }
   
   initLocalSettings('#gender div', 'calculating__choose-item_active');
   initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');


   function calcTotal() {
      if (!sex || !height || !weight || !age || !ratio) {
         result.textContent = ('- - ');
         return;
      }
      if(sex === 'female') {
         result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
      } else {
         result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
      }
   }
   calcTotal();

   function getStaticInfo(selector, activeClass) {
      const elements = document.querySelectorAll(selector);// Указиваем родительский клас для получение значений переменных
      elements.forEach(elem => {
         elem.addEventListener('click', (e) => {// Получаем значение переменных sex && ratio 
            if (e.target.getAttribute('data-ratio')) {
               ratio = +e.target.getAttribute('data-ratio');//Коеф. физ. активности
               localStorage.setItem('ratio', +e.target.getAttribute('data-ratio')); // Записывание/запоминание значения  в LocStor
            } else {
               sex = e.target.getAttribute('id');
               localStorage.setItem('sex', e.target.getAttribute('id'));
            }
            //Тогглим класс активности
            elements.forEach(elem => {
               elem.classList.remove(activeClass);
            });
            e.target.classList.add(activeClass);

            calcTotal();

         });
      });
   }
   getStaticInfo('#gender div', 'calculating__choose-item_active');
   getStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

   function getDynamicInfo(selector) {
      const input = document.querySelector(selector);

      
      input.addEventListener('input', () => {
         // Работа с инпутами. Установка валидации ввода полей
      if (input.value.match(/\D/g)) {
         input.style.border = '1px solid red';
      } else {
         input.style.border = 'none'; 
      }

         switch (input.getAttribute('id')) {
            case 'height':
               height = +input.value;
               break;
            case 'weight':
               weight = +input.value;
               break;
            case 'age':
               age = +input.value;
               break;
         }
         calcTotal();
      });
   }
   getDynamicInfo('#height');
   getDynamicInfo('#weight');
   getDynamicInfo('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./src/js/modules/cards.js":
/*!*********************************!*\
  !*** ./src/js/modules/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {
 // Использование классов для карточек
  
 class MenuCard {
   constructor(img, altimg, title, descr, price, parentSelector, ...classes) {
      this.src = img;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.classes = classes;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.exchangeRate = 27;
      this.convertToUAH();
   }
   // Конвертация доллара в гривны
   convertToUAH() {
      this.price = +this.price * this.exchangeRate;
   }
// Рендер карточки с классами на странице
   render() {
      const element = document.createElement('div');
    if (this.classes.length === 0) {
       this.classes = 'menu__item';//Подстановка дефолтного класа
       element.classList.add(this.classes);
    } else {
       this.classes.forEach(className => element.classList.add(['menu__item'], className));
    }

      element.innerHTML = `
         <img src = ${this.src} alt=${this.alt}>
         <h3 class="menu__item-subtitle">${this.title}</h3>
         <div class="menu__item-descr">${this.descr}</div>
         <div class="menu__item-divider"></div>
         <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
         </div>
      `;
      this.parent.append(element);  
   }
}

    // Создаем карточки интерактивно. 

   const getMenuCardContent = async (url) => {
   const res = await fetch(url); // res - result
      if(!res.ok){
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);// Выкинуть в консоль Объект ошибки
      }

   return await res.json();
   };

   getMenuCardContent('http://localhost:3000/menu')
   .then(data => {
      data.forEach(({img, altimg, title, descr, price}) => {
         new MenuCard(img, altimg, title, descr, price, '.menu .container').render(); 
      });
   });

//   new MenuCard(
//      "img/tabs/vegy.jpg",
//      'Меню "Фитнес" img',
//      'Меню "Фитнес"',
//      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
//      9,
//      '.menu .container',
//      'trololo'
//   ).render();

//   new MenuCard(
//      "img/tabs/elite.jpg",
//      'Меню elite img',
//      'Меню “Премиум”',
//      'В меню “Премиум” мы используем не только красивый дизайн упаковки, нои качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
//      14,
//      '.menu .container',
//   ).render();

//   new MenuCard(
//      "img/tabs/post.jpg",
//      'Изображение меню img',
//      'Меню "Постное"',
//      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствиепродуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
//      21,
//      '.menu .container',
//   ).render();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./src/js/modules/forms.js":
/*!*********************************!*\
  !*** ./src/js/modules/forms.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/js/modules/modal.js");


function forms(formSelector, modalTimerId) {
//Forms
      const forms = document.querySelectorAll(formSelector);

      const message = {
         loading : 'icons/spinner.svg',
         success: "Спасибо, мы с Вами скоро свяжемся",
         failure: "Упс, что то пошло не так..." 
      };


      forms.forEach(item => {
         bindPostData(item);
      });

      const postData = async (url, data) => {
         const res = await fetch(url, {
            method: "POST",
            headers: {
               'Content-type': 'application/json'
            },
            body: data
         });

         return await res.json();
      };

      function bindPostData(form) {
         form.addEventListener('submit', (e) => {
            e.preventDefault();

         const statusMessage = document.createElement('img');// Создание спиннера
               statusMessage.src = message.loading;// Загрузка и показ спинера
               statusMessage.style.cssText = `
               display: block;
               margin: 0 auto;
               `;
               // form.append(statusMessage);
               form.insertAdjacentElement('afterend', statusMessage);

               //Собираем все данные из нашей формы
         const formData = new FormData(form);

            //Изящная реализация закоментированого кода ниже 
            // const object = {};
            // formData.forEach(function(value, key) {
               //    object[key] = value;
               // });
         const jsonData = JSON.stringify(Object.fromEntries(formData.entries()));
               

         // Отправка данных собраных в форму выше
         postData('http://localhost:3000/requests', jsonData)
         .then(data => {
               showThanksModal(message.success);
               statusMessage.remove();
         }).catch(() => {
            showThanksModal(message.failure);
         }).finally(() => {
            form.reset();
         });
      });
   }

      function showThanksModal (message) {
         const prevModalDialog = document.querySelector('.modal__dialog');

         prevModalDialog.classList.add('hide');
         (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

         const thanksModal = document.createElement('div');
         thanksModal.classList.add('modal__dialog');
         thanksModal.innerHTML = `
            <div class="modal__content">
               <div class="modal__close" data-close>&times;</div>
               <div class="modal__title">${message}</div>
            </div>

         `;

         document.querySelector('.modal').append(thanksModal);
         setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
         }, 4000);
      }

      fetch('http://localhost:3000/menu')
      .then(data => data.json());
      // .then(result => console.log(result));




}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./src/js/modules/modal.js":
/*!*********************************!*\
  !*** ./src/js/modules/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal),
/* harmony export */   "closeModal": () => (/* binding */ closeModal)
/* harmony export */ });
//   Modal Timer
function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';
      console.log(modalTimerId);
   if (modalTimerId) {
      // window.removeEventListener('scroll', showModalByScroll);
      clearInterval(modalTimerId);
      // window.removeEventListener('scroll', clearInterval(modalTimerId));// Удаление вызова 
   }
}
function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
}

//  Modal window
function modal(triggerSelector, modalSelector, modalTimerId) {

  const modal = document.querySelector(modalSelector),
  modalOpen = document.querySelectorAll(triggerSelector);

  modalOpen.forEach(btn => { //btn - рандомное название
     btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
  });

   // Отрефакторили закритие модалки про крестику с помощью getAttr.
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal(modalSelector);
      }
   });

   window.addEventListener('scroll', showModalByScroll);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 200) {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);// Удаление вызова модалки перенесено в функцию openModal
      }
   }
   window.addEventListener('scroll', showModalByScroll);
}



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./src/js/modules/slider.js":
/*!**********************************!*\
  !*** ./src/js/modules/slider.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
   
   // <--- SLIDER --->

   const slides = document.querySelectorAll('.offer__slide'),
         slider = document.querySelector('.offer__slider'),
         totalCount = document.querySelector('#total'),
         currentCount = document.querySelector('#current'),
         prevArrow = document.querySelector('.offer__slider-prev'),
         nextArrow = document.querySelector('.offer__slider-next'),
         dots = document.createElement('ol'),
         dotsArr = [];

      ////Добавляем карусельные точки-индикаторы
   dots.classList.add('carousel-indicators');
   slider.append(dots);
   for (let i = 0; i < slides.length; i++){
      const dot = document.createElement('li');
      dot.setAttribute('data-slide-to', i + 1);
      dot.classList.add('dot');
         if (i === 0) {
            dot.style.opacity = 1;
         }
      dots.append(dot);
      dotsArr.push(dot);
   }

   let slideIndex = 1;
   
   showSlides(slideIndex); // Initializing of SLIDER
      if (slides.length < 10) {
         totalCount.textContent = `0${slides.length}`; 
      } else {
         totalCount.textContent = slides.length;
      }

   function showSlides(n) {
      if (n > slides.length) {
         slideIndex = 1;
      }

      if (n < 1) {
         slideIndex = slides.length;
      }

      slides.forEach(item => item.style.display = 'none');
      slides[slideIndex - 1].style.display = 'block';

      if (slideIndex < 10) {
         currentCount.textContent = `0${slideIndex}`; 
      } else {
         currentCount.textContent = slideIndex;
      }
   }

   function changeSlide(n) {
      showSlides(slideIndex += n);
   }

   function makeChangeSlide(num) { // Функция смены слайда по клике на стрелку
      changeSlide(num);
      dotsArr.forEach(dot => dot.style.opacity = '.5');
      dotsArr[slideIndex - 1].style.opacity = 1;
   }
   prevArrow.addEventListener('click', () => {
      makeChangeSlide(-1);
   });
   nextArrow.addEventListener('click', () => {
      makeChangeSlide(+1);
   });


   dotsArr.forEach(dot => {
      dot.addEventListener('click', (e) =>{
         const slideTo = +e.target.getAttribute('data-slide-to');
         slideIndex = slideTo;
         showSlides(slideIndex);

         dotsArr.forEach(dot => dot.style.opacity = '.5');
         dotsArr[slideIndex - 1].style.opacity = 1;
      });
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./src/js/modules/tabs.js":
/*!********************************!*\
  !*** ./src/js/modules/tabs.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {
   // Tabs
   const tabs = document.querySelectorAll('.tabheader__item'),
      tabsContent = document.querySelectorAll('.tabcontent'),
      tabsParent = document.querySelector('.tabheader__items');
     
   function hideTabContent() {
      tabsContent.forEach(item => { // НАзв аргумента по усмотрению
        item.classList.add('hide');
        item.classList.remove('show', 'fade');
  
        });
  
      tabs.forEach(item => {
      item.classList.remove('tabheader__item_active');
       });
    }
  
   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }
  
   hideTabContent();
   showTabContent();
  
   tabsParent.addEventListener('click', (event) => {
      const target = event.target;
  
        if (target && target.classList.contains('tabheader__item')) {
           tabs.forEach((item, i) => {
              if (target == item) {
                 hideTabContent();
                 showTabContent(i);
              }
           });
        }
   });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./src/js/modules/timer.js":
/*!*********************************!*\
  !*** ./src/js/modules/timer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {
   // Promotion Timer
  
   let deadline = new Date('2021-06-26T23:59:59');
  
   function getTimeRemaining(endtime) {
      const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( t / (1000*60*60*24) ),
            hours = Math.floor((t / (1000*60*60) ) % 24 ),
            minutes = Math.floor((t / 1000 / 60) % 60 ),
            seconds = Math.floor((t / 1000) % 60 );
        
      return {
         'total' : t,
         'days' : days,
         'hours' : hours,
         'minutes' : minutes,
         'seconds' : seconds
      };
   }
  
   function getZero(num) {
      if (num>=0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }
  
   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

      updateClock ();
      function updateClock () {
         const t = getTimeRemaining(endtime);

         days.innerHTML = getZero(t.days);
         hours.innerHTML = getZero(t.hours);
         minutes.innerHTML = getZero(t.minutes);
         seconds.innerHTML = getZero(t.seconds);

         if (t.total <= 0) {
            clearInterval(timeInterval);
            days.innerHTML = 0;
            hours.innerHTML = 0;
            minutes.innerHTML = 0;
            seconds.innerHTML = 0;
         }
      }
   }

   setClock('.timer', deadline);

   
   const promotionDescr = document.querySelector('.promotion__descr'),
   spanDate = promotionDescr.querySelector('.spanDate');
   
   // установка даты конца акции на странице слева от таймера
   function setDateSaleEnd(deadline, spanDate) {
   
      let date = new Date(deadline);
      let day = new Intl.DateTimeFormat("ru", {
      month: "long",
      day: "numeric"
      });
      let time = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric"
      });
   
      spanDate.textContent = `${day.format(date)} в ${time.format(date)}`;
   }

   setDateSaleEnd(deadline, spanDate);
  ///
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./src/js/modules/tabs.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/cards */ "./src/js/modules/cards.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./src/js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./src/js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./src/js/modules/forms.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/calc */ "./src/js/modules/calc.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/timer */ "./src/js/modules/timer.js");









window.addEventListener('DOMContentLoaded', () => {
      const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId), 5000);
   (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)();
   (0,_modules_cards__WEBPACK_IMPORTED_MODULE_1__.default)();
   (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('[data-modal]', '.modal', modalTimerId);
   (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)();
   (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form', modalTimerId);
   (0,_modules_calc__WEBPACK_IMPORTED_MODULE_5__.default)();
   (0,_modules_timer__WEBPACK_IMPORTED_MODULE_6__.default)();         
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map