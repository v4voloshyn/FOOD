function timer(id, deadline) {
   // Promotion Timer
  
   // let deadline = new Date('2021-06-25T23:59:59');
  
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

   setClock(id, deadline);

   
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

export default timer;