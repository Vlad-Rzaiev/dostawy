(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();document.querySelector(".delivery-no-number");const c=document.querySelector(".deliveries-form-date-js"),u=document.querySelector(".deliveries-form-time-js"),d=()=>{const r=new Date,o=r.getFullYear(),s=String(r.getMonth()+1).padStart(2,"0"),n=String(r.getDate()).padStart(2,"0");return`${o}-${s}-${n}`},a=()=>{setInterval(()=>{const r=new Date,o=String(r.getHours()).padStart(2,"0"),s=String(r.getMinutes()).padStart(2,"0"),n=String(r.getSeconds()).padStart(2,"0");u.textContent=`${o}:${s}:${n}`},1e3)};a();c.textContent=`${d()}`;
//# sourceMappingURL=index.js.map
