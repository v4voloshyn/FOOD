// Выгружаем данные с заказов на сервер
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

// Создаем карточки интерактивно. 

const getMenuCardContent = async (url) => {
const res = await fetch(url); // res - result
   if(!res.ok){
      throw new Error(`Could not fetch ${url}, status: ${res.status}`);// Выкинуть в консоль Объект ошибки
   }

return await res.json();
};


export {postData};
export {getMenuCardContent};