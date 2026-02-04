import{getExerciseById as y,patchRating as $}from"./api-CA10J7K2.js";import{i as u}from"./icons-Diq81sPx.js";import"./vendor-D1yz-ZLW.js";const o=document.querySelector("#exercise-modal"),f=document.querySelector(".exercises-list");let m=null;f&&f.addEventListener("click",async t=>{const e=t.target.closest(".exercise-start-btn");if(e)try{const a=await y(e.dataset.id);a&&p(a)}catch(a){console.error(a)}});function p(t){m=t,o.innerHTML=x(t),o.classList.remove("is-hidden"),document.body.classList.add("no-scroll"),window.addEventListener("keydown",b),w(t)}function w(t){const e=document.querySelector(".btn-favorite");if(!e)return;const r=(JSON.parse(localStorage.getItem("favorites"))||[]).some(s=>s._id===t._id);v(e,r),e.addEventListener("click",()=>{const s=JSON.parse(localStorage.getItem("favorites"))||[],i=s.findIndex(l=>l._id===t._id);i!==-1?(s.splice(i,1),v(e,!1)):(s.push(t),v(e,!0)),localStorage.setItem("favorites",JSON.stringify(s))})}function v(t,e){e?t.innerHTML=`Remove from favorites <svg class="modal-heart" width="20" height="20"><use href="${u}#heart"></use></svg>`:t.innerHTML=`Add to favorites <svg class="modal-heart" width="20" height="20"><use href="${u}#heart"></use></svg>`}function h(){if(o.classList.add("is-hidden"),o.innerHTML="",document.body.classList.remove("no-scroll"),window.removeEventListener("keydown",b),window.location.pathname.includes("favorite")){const t=new Event("favorites-updated");window.dispatchEvent(t)}}function b(t){t.code==="Escape"&&h()}o&&o.addEventListener("click",t=>{(t.target===o||t.target.closest("#modal-close"))&&h()});document.addEventListener("click",t=>{t.target.classList.contains("btn-rating")&&(o.innerHTML=L(m._id),E())});function E(){let t=0;const e=document.querySelectorAll(".rating-radio"),a=document.querySelector("#rating-value"),r=document.getElementById("rating-form"),s=document.querySelectorAll(".rating-label");e.forEach(i=>{i.addEventListener("change",l=>{t=Number(l.target.value),a.textContent=`${t}.0`,s.forEach(c=>{const d=Number(c.dataset.value),n=c.querySelector("svg");d<=t?(n.style.fill="#EEA10C",n.style.stroke="#EEA10C"):(n.style.fill="rgba(244, 244, 244, 0.2)",n.style.stroke="rgba(244, 244, 244, 0.2)")})})}),r&&(r.onsubmit=async i=>{var d,n;i.preventDefault();const{email:l,comment:c}=i.target.elements;if(t===0)return alert("Please select a rating!");try{await $(m._id,{rate:t,email:l.value.trim(),comment:c.value.trim()}),alert("Thank you for your feedback!"),p(m)}catch(g){alert(((n=(d=g.response)==null?void 0:d.data)==null?void 0:n.message)||"Error submitting rating")}})}function L(t){return`
    <div class="modal-content rating-modal">
      <button type="button" class="modal-close-btn" id="modal-close">
        <svg class="modal-close-icon" width="28" height="28"><use href="${u}#cross"></use></svg>
      </button>
      <p class="rating-label">Rating</p>
      <div class="rating-value-container">
        <span id="rating-value">0.0</span>
        
        <div class="star-rating-wrapper">
            ${[1,2,3,4,5].map(e=>`
                <div class="rating-group">
                    <input class="rating-radio visually-hidden" type="radio" name="rate" id="star${e}" value="${e}">
                    <label class="rating-label" for="star${e}" data-value="${e}">
                        <svg class="rating-star-icon" width="24" height="24">
                            <use href="${u}#star"></use>
                        </svg>
                    </label>
                </div>
            `).join("")}
        </div>
      </div>

      <form class="rating-form" id="rating-form">
        <input type="email" name="email" placeholder="Email" required 
               pattern="^\\w+(\\.\\w+)?@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$" class="rating-input"/>
        <textarea name="comment" placeholder="Your comment" required class="rating-textarea"></textarea>
        <button type="submit" class="rating-send-btn">Send</button>
      </form>
    </div>
    
    <style>
        
    </style>
    `}function x(t){const{gifUrl:e,name:a,rating:r,target:s,bodyPart:i,equipment:l,popularity:c,burnedCalories:d,description:n,_id:g}=t;return`
    <div class="modal-content">
      <button type="button" class="modal-close-btn" id="modal-close">
        <svg class="modal-close-icon" width="28" height="28"><use href="${u}#cross"></use></svg>
      </button>
      <div class="modal-exercise-card">
        <div class="modal-gif-wrapper">
          <img src="${e}" alt="${a}" class="modal-gif" width="295" height="258" />
        </div>
        <div class="modal-details">
          <h2 class="modal-title">${a}</h2>
          <div class="modal-rating-row">
              <span class="modal-rating-value">${r.toFixed(1)}</span>
              ${S(r)}
          </div>
          <ul class="modal-stats-list">
            <li class="modal-stat-item"><span>Target</span> <strong>${s}</strong></li>
            <li class="modal-stat-item"><span>Body Part</span> <strong>${i}</strong></li>
            <li class="modal-stat-item"><span>Equipment</span> <strong>${l}</strong></li>
            <li class="modal-stat-item"><span>Popular</span> <strong>${c}</strong></li>
            <li class="modal-stat-item"><span>Burned calories</span> <strong>${d}/3 min</strong></li>
          </ul>
          <p class="modal-description">${n}</p>
          <div class="modal-btns">
            <button class="btn-favorite" data-id="${g}">Add to favorites</button>
            <button class="btn-rating" type="button">Give a rating</button>
          </div>
        </div>
      </div>
    </div>`}function S(t){let e="";for(let a=1;a<=5;a++){const s=a<=Math.round(t)?"#EEA10C":"rgba(244, 244, 244, 0.2)";e+=`
        <span style="display: inline-flex;">
            <svg class="modal-star-icon" width="18" height="18" style="fill: ${s}; stroke: ${s}">
                <use href="${u}#star"></use>
            </svg>
        </span>`}return`<div class="modal-stars">${e}</div>`}export{p as openModal};
//# sourceMappingURL=modals-C-0z28le.js.map
