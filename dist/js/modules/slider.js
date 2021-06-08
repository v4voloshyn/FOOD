function slider({container, slide, nextArr, prevArr, totalCounter, currentCounter}) {
   
   // <--- SLIDER --->

   const slides = document.querySelectorAll(slide),
         slider = document.querySelector(container),
         totalCount = document.querySelector(totalCounter),
         currentCount = document.querySelector(currentCounter),
         prevArrow = document.querySelector(prevArr),
         nextArrow = document.querySelector(nextArr),
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

export default slider;