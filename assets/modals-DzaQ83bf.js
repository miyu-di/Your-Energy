import{getExerciseById as y,patchRating as w}from"./api-CA10J7K2.js";import{i as d}from"./icons-mdIB9KqP.js";import"./vendor-D1yz-ZLW.js";const r=document.querySelector("#exercise-modal"),v=document.querySelector(".exercises-list");let m=null;v&&v.addEventListener("click",async t=>{const e=t.target.closest(".exercise-start-btn");if(e)try{const a=await y(e.dataset.id);a&&p(a)}catch(a){console.error(a)}});function p(t){m=t,r.innerHTML=L(t),r.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),window.addEventListener("keydown",h),$(t)}function $(t){const e=document.querySelector(".btn-favorite");if(!e)return;const o=(JSON.parse(localStorage.getItem("favorites"))||[]).some(s=>s._id===t._id);g(e,o),e.addEventListener("click",()=>{const s=JSON.parse(localStorage.getItem("favorites"))||[],n=s.findIndex(i=>i._id===t._id);n!==-1?(s.splice(n,1),g(e,!1)):(s.push(t),g(e,!0)),localStorage.setItem("favorites",JSON.stringify(s))})}function g(t,e){e?t.innerHTML=`Remove from favorites <svg class="modal-heart" width="20" height="20">
                <use href="${d}#heart"></use>
              </svg>`:t.innerHTML=`Add to favorites <svg class="modal-heart" width="20" height="20">
                <use href="${d}#heart"></use>
              </svg>`}function f(){if(r.classList.add("is-hidden"),r.innerHTML="",document.body.classList.remove("no-scroll"),window.removeEventListener("keydown",h),window.location.pathname.includes("favorite")){const t=new Event("favorites-updated");window.dispatchEvent(t)}}function h(t){t.code==="Escape"&&f()}r&&r.addEventListener("click",t=>{(t.target===r||t.target.closest("#modal-close"))&&f()});document.addEventListener("click",t=>{t.target.classList.contains("btn-rating")&&(r.innerHTML=x(m._id),E())});function E(){let t=0;const e=document.querySelectorAll(".star-input"),a=document.querySelector("#rating-value"),o=document.getElementById("rating-form");e.forEach(s=>{s.addEventListener("click",n=>{t=Number(n.target.dataset.value),a.textContent=`${t}.0`,e.forEach(i=>i.classList.toggle("active",i.dataset.value<=t))})}),o&&(o.onsubmit=async s=>{var l,c;s.preventDefault();const{email:n,comment:i}=s.target.elements;if(t===0)return alert("Please select a rating!");try{await w(m._id,{rate:t,email:n.value.trim(),comment:i.value.trim()}),alert("Thank you for your feedback!"),p(m)}catch(u){alert(((c=(l=u.response)==null?void 0:l.data)==null?void 0:c.message)||"Error submitting rating")}})}function L(t){const{gifUrl:e,name:a,rating:o,target:s,bodyPart:n,equipment:i,popularity:l,burnedCalories:c,description:u,_id:b}=t;return`
    <div class="modal-content">
      <button type="button" class="modal-close-btn" id="modal-close">
        <svg class="modal-close-icon" width="28" height="28"><use href="${d}#cross"></use></svg>
      </button>
      <div class="modal-exercise-card">
        <div class="modal-gif-wrapper">
          <img src="${e}" alt="${a}" class="modal-gif" width="295" height="258" />
        </div>
        <div class="modal-details">
          <h2 class="modal-title">${a}</h2>
          <div class="modal-rating-row">
              <span class="modal-rating-value">${o.toFixed(1)}</span>
              ${S(o)}
          </div>
          <ul class="modal-stats-list">
            <li class="modal-stat-item"><span>Target</span> <strong>${s}</strong></li>
            <li class="modal-stat-item"><span>Body Part</span> <strong>${n}</strong></li>
            <li class="modal-stat-item"><span>Equipment</span> <strong>${i}</strong></li>
            <li class="modal-stat-item"><span>Popular</span> <strong>${l}</strong></li>
            <li class="modal-stat-item"><span>Burned calories</span> <strong>${c}/3 min</strong></li>
          </ul>
          <p class="modal-description">${u}</p>
          <div class="modal-btns">
            <button class="btn-favorite" data-id="${b}">Add to favorites</button>
            <button class="btn-rating" type="button">Give a rating</button>
          </div>
        </div>
      </div>
    </div>`}function x(t){return`
    <div class="modal-content rating-modal">
      <button type="button" class="modal-close-btn" id="modal-close">
        <svg class="modal-close-icon" width="28" height="28"><use href="${d}#cross"></use></svg>
      </button>
      <p class="rating-label">Rating</p>
      <div class="rating-value-container">
        <span id="rating-value">0.0</span>
        <div class="star-rating">
            ${[1,2,3,4,5].map(e=>`<span class="star-input" data-value="${e}">★</span>`).join("")}
        </div>
      </div>
      <form class="rating-form" id="rating-form">
        <input type="email" name="email" placeholder="Email" required 
               pattern="^\\w+(\\.\\w+)?@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$" class="rating-input"/>
        <textarea name="comment" placeholder="Your comment" required class="rating-textarea"></textarea>
        <button type="submit" class="rating-send-btn">Send</button>
      </form>
    </div>`}function S(t){let e="";for(let a=1;a<=5;a++)e+=`<span style="color: ${a<=Math.round(t)?"#EEA10C":"rgba(255,255,255,0.2)"}">★</span>`;return`<div class="modal-stars">${e}</div>`}export{p as openModal};
//# sourceMappingURL=modals-DzaQ83bf.js.map
