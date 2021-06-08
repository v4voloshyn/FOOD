//   Modal Timer
function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';
      // console.log(modalTimerId);
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



export default modal;
export {openModal};
export {closeModal};