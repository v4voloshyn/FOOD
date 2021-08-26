!function(){"use strict";function e(e,t){const n=document.querySelector(e);n.classList.add("show"),n.classList.remove("hide"),document.body.style.overflow="hidden",t&&clearInterval(t)}function t(e){const t=document.querySelector(e);t.classList.add("hide"),t.classList.remove("show"),document.body.style.overflow=""}window.addEventListener("DOMContentLoaded",(()=>{const n=setTimeout((()=>e(".modal",n)),5e3);(function(e,t,n,o){const s=document.querySelectorAll(e),c=document.querySelectorAll(t),a=document.querySelector(n);function r(){c.forEach((e=>{e.classList.add("hide"),e.classList.remove("show","fade")})),s.forEach((e=>{e.classList.remove(o)}))}function i(e=0){c[e].classList.add("show","fade"),c[e].classList.remove("hide"),s[e].classList.add(o)}r(),i(),a.addEventListener("click",(t=>{const n=t.target;n&&n.classList.contains(e.slice(1))&&s.forEach(((e,t)=>{n==e&&(r(),i(t))}))}))})(".tabheader__item",".tabcontent",".tabheader__items","tabheader__item_active"),function(){class e{constructor(e,t,n,o,s,c,...a){this.src=e,this.altimg=t,this.title=n,this.descr=o,this.classes=a,this.price=s,this.parent=document.querySelector(c),this.exchangeRate=27,this.convertToUAH()}convertToUAH(){this.price=+this.price*this.exchangeRate}render(){const e=document.createElement("div");0===this.classes.length?(this.classes="menu__item",e.classList.add(this.classes)):this.classes.forEach((t=>e.classList.add(["menu__item"],t))),e.innerHTML=`\n         <img src = ${this.src} alt=${this.alt}>\n         <h3 class="menu__item-subtitle">${this.title}</h3>\n         <div class="menu__item-descr">${this.descr}</div>\n         <div class="menu__item-divider"></div>\n         <div class="menu__item-price">\n            <div class="menu__item-cost">Цена:</div>\n            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>\n         </div>\n      `,this.parent.append(e)}}(async e=>{const t=await fetch(e);if(!t.ok)throw new Error(`Could not fetch ${e}, status: ${t.status}`);return await t.json()})("http://localhost:3000/menu").then((t=>{t.forEach((({img:t,altimg:n,title:o,descr:s,price:c})=>{new e(t,n,o,s,c,".menu .container").render()}))}))}(),function(n,o,s){const c=document.querySelector(o);function a(){window.pageYOffset+document.documentElement.clientHeight>=document.documentElement.scrollHeight-200&&(e(o,s),window.removeEventListener("scroll",a))}document.querySelectorAll(n).forEach((t=>{t.addEventListener("click",(()=>e(o,s)))})),c.addEventListener("click",(e=>{e.target!==c&&""!=e.target.getAttribute("data-close")||t(o)})),document.addEventListener("keydown",(e=>{"Escape"===e.code&&c.classList.contains("show")&&t(o)})),window.addEventListener("scroll",a),window.addEventListener("scroll",a)}("[data-modal]",".modal",n),function({container:e,slide:t,nextArr:n,prevArr:o,totalCounter:s,currentCounter:c}){const a=document.querySelectorAll(t),r=document.querySelector(e),i=document.querySelector(s),l=document.querySelector(c),d=document.querySelector(o),u=document.querySelector(n),m=document.createElement("ol"),h=[];m.classList.add("carousel-indicators"),r.append(m);for(let e=0;e<a.length;e++){const t=document.createElement("li");t.setAttribute("data-slide-to",e+1),t.classList.add("dot"),0===e&&(t.style.opacity=1),m.append(t),h.push(t)}let g=1;function f(e){e>a.length&&(g=1),e<1&&(g=a.length),a.forEach((e=>e.style.display="none")),a[g-1].style.display="block",l.textContent=g<10?`0${g}`:g}function v(e){f(g+=e),h.forEach((e=>e.style.opacity=".5")),h[g-1].style.opacity=1}f(g),a.length<10?i.textContent=`0${a.length}`:i.textContent=a.length,d.addEventListener("click",(()=>{v(-1)})),u.addEventListener("click",(()=>{v(1)})),h.forEach((e=>{e.addEventListener("click",(e=>{const t=+e.target.getAttribute("data-slide-to");g=t,f(g),h.forEach((e=>e.style.opacity=".5")),h[g-1].style.opacity=1}))}))}({container:".offer__slider",slide:".offer__slide",nextArr:".offer__slider-next",prevArr:".offer__slider-prev",totalCounter:"#total",currentCounter:"#current"}),function(n,o){function s(n){const s=document.querySelector(".modal__dialog");s.classList.add("hide"),e(".modal",o);const c=document.createElement("div");c.classList.add("modal__dialog"),c.innerHTML=`\n            <div class="modal__content">\n               <div class="modal__close" data-close>&times;</div>\n               <div class="modal__title">${n}</div>\n            </div>\n\n         `,document.querySelector(".modal").append(c),setTimeout((()=>{c.remove(),s.classList.add("show"),s.classList.remove("hide"),t(".modal")}),4e3)}document.querySelectorAll(n).forEach((e=>{var t;(t=e).addEventListener("submit",(e=>{e.preventDefault();const n=document.createElement("img");n.src="icons/spinner.svg",n.style.cssText="\n               display: block;\n               margin: 0 auto;\n               ",t.insertAdjacentElement("afterend",n);const o=new FormData(t);(async(e,t)=>{const n=await fetch("http://localhost:3000/requests",{method:"POST",headers:{"Content-type":"application/json"},body:t});return await n.json()})(0,JSON.stringify(Object.fromEntries(o.entries()))).then((e=>{s("Спасибо, мы с Вами скоро свяжемся"),n.remove()})).catch((()=>{s("Упс, что то пошло не так...")})).finally((()=>{t.reset()}))}))})),fetch("http://localhost:3000/menu").then((e=>e.json()))}("form",n),function(){const e=document.querySelector(".calculating__result span");let t,n,o,s,c;function a(e,t){document.querySelectorAll(e).forEach((e=>{e.classList.remove(t),e.getAttribute("id")===localStorage.getItem("sex")&&e.classList.add(t),e.getAttribute("data-ratio")===localStorage.getItem("ratio")&&e.classList.add(t)}))}function r(){e.textContent=t&&n&&o&&s&&c?"female"===t?Math.round((447.6+9.2*o+3.1*n-4.3*s)*c):Math.round((88.36+13.4*o+4.8*n-5.7*s)*c):"- - "}function i(e,n){const o=document.querySelectorAll(e);o.forEach((e=>{e.addEventListener("click",(e=>{e.target.getAttribute("data-ratio")?(c=+e.target.getAttribute("data-ratio"),localStorage.setItem("ratio",+e.target.getAttribute("data-ratio"))):(t=e.target.getAttribute("id"),localStorage.setItem("sex",e.target.getAttribute("id"))),o.forEach((e=>{e.classList.remove(n)})),e.target.classList.add(n),r()}))}))}function l(e){const t=document.querySelector(e);t.addEventListener("input",(()=>{switch(t.value.match(/\D/g)?t.style.border="1px solid red":t.style.border="none",t.getAttribute("id")){case"height":n=+t.value;break;case"weight":o=+t.value;break;case"age":s=+t.value}r()}))}localStorage.getItem("sex")?t=localStorage.getItem("sex"):(t="female",localStorage.setItem("sex","female")),localStorage.getItem("ratio")?c=localStorage.getItem("ratio"):(c=1.375,localStorage.setItem("ratio",1.375)),a("#gender div","calculating__choose-item_active"),a(".calculating__choose_big div","calculating__choose-item_active"),r(),i("#gender div","calculating__choose-item_active"),i(".calculating__choose_big div","calculating__choose-item_active"),l("#height"),l("#weight"),l("#age")}(),function(e,t){function n(e){return e>=0&&e<10?`0${e}`:e}!function(e,t){const o=document.querySelector(e),s=o.querySelector("#days"),c=o.querySelector("#hours"),a=o.querySelector("#minutes"),r=o.querySelector("#seconds"),i=setInterval(l,1e3);function l(){const e=function(e){const t=Date.parse(e)-Date.parse(new Date);return{total:t,days:Math.floor(t/864e5),hours:Math.floor(t/36e5%24),minutes:Math.floor(t/1e3/60%60),seconds:Math.floor(t/1e3%60)}}(t);s.innerHTML=n(e.days),c.innerHTML=n(e.hours),a.innerHTML=n(e.minutes),r.innerHTML=n(e.seconds),e.total<=0&&(clearInterval(i),s.innerHTML=0,c.innerHTML=0,a.innerHTML=0,r.innerHTML=0)}l()}(e,t),function(e,t){let n=new Date(e),o=new Intl.DateTimeFormat("ru",{month:"long",day:"numeric"}),s=new Intl.DateTimeFormat("ru",{hour:"numeric",minute:"numeric"});t.textContent=`${o.format(n)} в ${s.format(n)}`}(t,document.querySelector(".promotion__descr").querySelector(".spanDate"))}(".timer","2021-06-25T23:59:59")}))}();
//# sourceMappingURL=bundle.js.map