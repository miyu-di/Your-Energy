import{getFilters as x,getExercises as b}from"./api-CA10J7K2.js";import{i as M}from"./icons-mdIB9KqP.js";import"./vendor-D1yz-ZLW.js";function k(e){return e.map(({_id:t,name:r,rating:i,burnedCalories:o,time:a,bodyPart:n,target:y})=>`
      <li class="exercise-item">
        <div class="exercise-card-top">
          <span class="exercise-badge">WORKOUT</span>
          
          <div class="exercise-rating-container">
            <span class="exercise-rating">${Math.round(i).toFixed(1)}</span>
            <svg class="exercise-star-icon" width="13" height="13">
              <use href="${M}#star"></use>
            </svg>
          </div>

          <button class="exercise-start-btn" data-id="${t}">
            Start
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 14L14 7.5M14 7.5L7.5 1M14 7.5H1" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>

        <div class="exercise-card-title">
          <div class="exercise-icon-wrapper">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#242424" />
                <path d="M18.8234 8.72544C18.6138 8.47504 18.2403 8.44212 17.9899 8.65092L16.349 10.0294L15.5943 8.15967C15.5675 8.08949 15.5267 8.03057 15.4799 7.97859C15.3257 7.63549 15.058 7.34091 14.6889 7.17023C14.5286 7.09745 14.3631 7.05846 14.1977 7.0394C14.1613 7.02034 14.1283 6.99521 14.0868 6.98222L11.199 6.17732C11.037 6.13314 10.8741 6.16173 10.7407 6.2397C10.5821 6.29342 10.4461 6.40865 10.3811 6.57587L9.29378 9.37178C9.17594 9.67589 9.3267 10.019 9.63168 10.1386C9.93492 10.2564 10.2789 10.1048 10.3976 9.79978L11.316 7.43882L12.6312 7.80444C12.5991 7.85643 12.5645 7.90495 12.5385 7.9604L10.8524 11.6149C10.8282 11.6686 10.8152 11.7232 10.7979 11.7787L8.7488 15.214L5.31955 16.3611C4.9314 16.6514 4.84909 17.1981 5.13587 17.5862C5.42439 17.9752 5.97282 18.0575 6.36011 17.7708L9.86907 16.5621C9.97651 16.4841 10.0545 16.3819 10.1134 16.2719C10.1576 16.2251 10.2078 16.1878 10.2416 16.1298L11.4633 14.0816L13.6319 15.9296L11.3116 18.5445C10.9919 18.9049 11.024 19.4603 11.3862 19.7791C11.7474 20.1005 12.3011 20.0667 12.6225 19.7046L15.5181 16.4426C15.6082 16.342 15.6619 16.2259 15.6983 16.1047C15.7199 16.0388 15.7199 15.9704 15.7251 15.9019C15.7251 15.8673 15.7381 15.8361 15.7355 15.804C15.7277 15.5649 15.6307 15.3327 15.4349 15.1672L13.4395 13.4656C13.5834 13.3287 13.7055 13.1658 13.7939 12.9743L15.0866 10.1749L15.5007 11.2779C15.5181 11.3758 15.551 11.472 15.6203 11.5525C15.6827 11.627 15.7624 11.6764 15.8473 11.7111C15.856 11.7154 15.8664 11.7163 15.8768 11.7189C15.9305 11.7379 15.9851 11.7561 16.0414 11.7587C16.1081 11.7648 16.1757 11.7561 16.2441 11.7371C16.2459 11.7362 16.2467 11.7362 16.2467 11.7362C16.2649 11.7319 16.2831 11.7353 16.3013 11.7275C16.3975 11.6912 16.4711 11.6296 16.5344 11.5577L18.8893 9.55892C19.1397 9.34838 19.034 8.97583 18.8234 8.72544Z" fill="#F4F4F4" />
                <path d="M15.8448 7.30102C16.7564 7.30102 17.4954 6.56206 17.4954 5.65051C17.4954 4.73896 16.7564 4 15.8448 4C14.9333 4 14.1943 4.73896 14.1943 5.65051C14.1943 6.56206 14.9333 7.30102 15.8448 7.30102Z" fill="#F4F4F4" />
            </svg>
          </div>
          <h3 class="exercise-name">${f(r)}</h3>
        </div>

        <ul class="exercise-info-list">
          <li class="exercise-info-item">
            <span class="info-label">Burned calories:</span>
            <span class="info-value">${o} / ${a} min</span>
          </li>
          <li class="exercise-info-item">
            <span class="info-label">Body part:</span>
            <span class="info-value">${f(n)}</span>
          </li>
          <li class="exercise-info-item">
            <span class="info-label">Target:</span>
            <span class="info-value">${f(y)}</span>
          </li>
        </ul>
      </li>
      `).join("")}function f(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}const c=document.querySelector(".exercises-list"),w=document.querySelectorAll(".filter-btn"),d=document.getElementById("pagination"),m=document.querySelector(".breadcrumb-current"),h=document.querySelector(".breadcrumb-divider"),l=document.getElementById("search-form"),E=document.querySelector(".filters-nav");let s={filter:"Muscles",categoryName:"",keyword:"",page:1,view:"categories"};E&&c&&T();async function T(){C(s.filter),await p(s.filter,1),$()}function $(){w.forEach(e=>{e.addEventListener("click",async t=>{t.preventDefault();const r=t.currentTarget.dataset.filter;if(t.currentTarget.classList.contains("active")&&s.view==="exercises")return B(r);t.currentTarget.classList.contains("active")||(s.filter=r,s.page=1,s.view="categories",s.categoryName="",C(r),m.textContent="",h.style.display="none",l.classList.add("is-hidden"),await p(s.filter,s.page))})}),c.addEventListener("click",async e=>{if(s.view==="exercises")return;const t=e.target.closest(".filter-item");if(!t)return;const r=t.dataset.name,i=t.dataset.filter;s.view="exercises",s.categoryName=r,s.page=1,h.style.display="inline-block",m.textContent=v(r),l.classList.remove("is-hidden"),await g(i,r,1)}),d==null||d.addEventListener("click",async e=>{if(!e.target.classList.contains("pg-btn"))return;const t=Number(e.target.dataset.page);s.page=t,s.view==="categories"?await p(s.filter,t):await g(s.filter,s.categoryName,t),window.scrollTo({top:c.offsetTop-100,behavior:"smooth"})}),l==null||l.addEventListener("submit",async e=>{e.preventDefault();const r=e.currentTarget.elements.keyword.value.trim().toLowerCase();s.keyword=r,s.page=1,await g(s.filter,s.categoryName,s.page)})}async function B(e){s.filter=e,s.page=1,s.view="categories",s.categoryName="",l.reset(),C(e),m.textContent="",h.style.display="none",l.classList.add("is-hidden"),await p(s.filter,s.page)}async function p(e,t){try{c.innerHTML='<p class="loader">Loading...</p>';const r=await x(e,t);r.results.length>0&&(c.innerHTML=H(r.results),L(r.totalPages,t))}catch(r){console.error(r),c.innerHTML="<p>Error loading categories.</p>"}}async function g(e,t,r){try{c.innerHTML='<p class="loader">Loading exercises...</p>';let i="muscles";e==="Body parts"&&(i="bodypart"),e==="Equipment"&&(i="equipment");const o={[i]:t.toLowerCase(),page:r,limit:10,keyword:s.keyword},a=await b(o);a.results&&a.results.length>0?(c.innerHTML=k(a.results),L(a.totalPages,r)):(c.innerHTML=`
        <p class="no-results-message">
          Unfortunately, <strong>no results</strong> were found matching your search, please try again.
        </p>`,d.innerHTML="")}catch(i){console.error(i),c.innerHTML="<p>Error loading exercises.</p>"}}function L(e,t){if(!d||(d.innerHTML="",e<=1))return;const r=[],i=5;t>1&&(r.push(u("<<",1,"arrow")),r.push(u("<",t-1,"arrow")));let o=Math.max(1,t-2),a=Math.min(e,o+i-1);a-o<i-1&&(o=Math.max(1,a-i+1));for(let n=o;n<=a;n++)r.push(u(n,n,n===t?"active":""));if(a<e){if(a<e-1){const n=document.createElement("span");n.textContent="...",n.className="pg-dots",r.push(n)}r.push(u(e,e,""))}t<e&&(r.push(u(">",t+1,"arrow")),r.push(u(">>",e,"arrow"))),r.forEach(n=>d.appendChild(n))}function u(e,t,r){const i=document.createElement("button");return i.className=`pg-btn ${r}`,i.textContent=e,i.dataset.page=t,i}function C(e){w.forEach(t=>{t.classList.toggle("active",t.dataset.filter===e)})}function H(e){return e.map(t=>`
    <li class="filter-item" 
        data-name="${t.name}" 
        data-filter="${t.filter}"
        style="background: linear-gradient(0deg, rgba(17,17,17,0.5), rgba(17,17,17,0.5)), url('${t.imgURL}') center/cover no-repeat;">
        <div class="filter-text">
            <h3>${v(t.name)}</h3>
            <p>${t.filter}</p>
        </div>
    </li>
  `).join("")}function v(e){return e?e.charAt(0).toUpperCase()+e.slice(1):""}
//# sourceMappingURL=filters-CrtjN9eN.js.map
