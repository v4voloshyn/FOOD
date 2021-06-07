import {openModal, closeModal} from './modal';

function forms() {
//Forms
      const forms = document.querySelectorAll('form');

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
         openModal();

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
            closeModal();
         }, 4000);
      }

      fetch('http://localhost:3000/menu')
      .then(data => data.json());
      // .then(result => console.log(result));




}

export default forms;