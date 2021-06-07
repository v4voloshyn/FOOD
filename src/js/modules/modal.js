//   Modal Timer
const modalTimerId = setTimeout(openModal, 5000);
function openModal() {
   const modal = document.querySelector('.modal');
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = 'hidden';
   window.removeEventListener('scroll', showModalByScroll);
   // window.removeEventListener('scroll', clearInterval(modalTimerId));// Удаление вызова 
   clearInterval(modalTimerId);
}
function closeModal() {
   const modal = document.querySelector('.modal');
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.style.overflow = '';
}

function modal() {
   //  Modal window
  const modal = document.querySelector('.modal'),
  modalOpen = document.querySelectorAll('[data-modal]');

  modalOpen.forEach(btn => { //btn - рандомное название
     btn.addEventListener('click', openModal);
  });

   // Отрефакторили закритие модалки про крестику с помощью getAttr.
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == "") {
      closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
      closeModal();
      }
   });

   window.addEventListener('scroll', showModalByScroll);

}
function showModalByScroll() {
   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 200) {
      openModal();
   // window.removeEventListener('scroll', showModalByScroll);// Удаление вызова модалки перенесено в функцию openModal
}}
export default modal;
export {openModal};
export {closeModal};