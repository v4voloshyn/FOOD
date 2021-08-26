import {getMenuCardContent} from '../services/services';

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

export default cards;