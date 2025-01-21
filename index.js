import{a as l,i}from"./assets/vendor-4yCzdkXl.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function o(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(s){if(s.ep)return;s.ep=!0;const n=o(s);fetch(s.href,n)}})();const m=document.querySelector(".deliveries-form-time-js"),y=()=>{const e=new Date,r=e.getFullYear(),o=String(e.getMonth()+1).padStart(2,"0"),t=String(e.getDate()).padStart(2,"0");return`${r}-${o}-${t}`},v=()=>{setInterval(()=>{const e=new Date,r=String(e.getHours()).padStart(2,"0"),o=String(e.getMinutes()).padStart(2,"0"),t=String(e.getSeconds()).padStart(2,"0");m.textContent=`${r}:${o}:${t}`},1e3)},c="https://6788090fc4a42c9161091efe.mockapi.io/deliveries",f=e=>l.post(c,e).then(()=>{i.success({title:"Dodano dostawę!",position:"topRight",timeout:7e3})}).catch(o=>{i.error({message:o,position:"topRight",timeout:7e3})}).data,h=e=>l.delete(`${c}/${e}`).then(o=>{i.success({message:"Dostawa usunięta",position:"topRight",timeout:7e3})}).catch(o=>{i.error({message:o,position:"topRight",timeout:7e3})}),d=()=>l.get(c),u=e=>{const r=document.querySelector(".deliveries-table-body"),o=e.map(t=>`
        <tr class="deliveries-table-body-row">
            <td class="deliveries-table-body-text">${t.id}</td>
            <td class="deliveries-table-body-text">${t.deliveryNumber}</td>
            <td class="deliveries-table-body-text">${t.deliveryDescr}</td>
            <td class="deliveries-table-body-text">${t.supplier}</td>
            <td class="deliveries-table-body-text">${t.carrier}</td>
            <td class="deliveries-table-body-text">${t.shipingNoteNumber}</td>
            <td class="deliveries-table-body-text">${t.pallets}</td>
            <td class="deliveries-table-body-text">${t.boxes}</td>
            <td class="deliveries-table-body-text">${t.pieces}</td>
            <td class="deliveries-table-body-text">${t.incomingShipmentID}</td>
            <td class="deliveries-table-body-text">${t.admissionDate}</td>
            <td class="deliveries-table-body-text">${t.admissionTime}</td>
            <td class="deliveries-table-body-text">${t.recipientFullName}</td>
            <td class="deliveries-table-body-text">${t.abroad}</td>
            <td class="deliveries-table-body-text">${t.invoiceNumber}</td>
            <td class="deliveries-table-body-text">${t.comments}</td>
        </tr>
    `).join("");r.insertAdjacentHTML("beforeend",o)},p=document.querySelector(".deliveries-form-js"),x=document.querySelector(".delivery-no-number"),D=document.querySelector(".delivery-no-year"),b=document.querySelector(".deliveries-form-date-js"),S=document.querySelector(".full-delivery-no-js"),$=document.querySelector(".recipient-name-user-login"),g=document.querySelector(".delete-delivery-form-js"),N=document.querySelector(".deliveries-table-body");document.addEventListener("DOMContentLoaded",async()=>{try{const{data:e}=await d();u(e);const r=e[e.length-1].deliveryNumber,[o,t,s]=r.split("/"),n=String(Number(o)+1).padStart(4,"0");x.textContent=n}catch(e){console.log(e)}});D.textContent=new Date().getFullYear();b.textContent=`${y()}`;v();const C=async e=>{try{e.preventDefault();const r={supplier:e.target.elements.supplier.value.trim().toUpperCase(),abroad:e.target.elements.abroad.value.trim().toUpperCase(),carrier:e.target.elements.carrier.value.trim().toUpperCase(),deliveryNumber:S.textContent.trim(),deliveryDescr:e.target.elements["delivery-descr"].value.trim().toUpperCase(),incomingShipmentID:e.target.elements["incoming-shipment-id"].value,pallets:e.target.elements.pallets.value,boxes:e.target.elements.boxes.value,pieces:e.target.elements.pieces.value,shipingNoteNumber:e.target.elements["shiping-note-number"].value.trim().toUpperCase(),admissionDate:b.textContent,admissionTime:m.textContent,recipientFullName:$.textContent.toUpperCase(),invoiceNumber:e.target.elements["invoice-num"].value.trim().toUpperCase(),comments:e.target.elements.comments.value.trim().toUpperCase()};await f(r);const{data:o}=await d(),t=Number(o[o.length-1].id)+1,s=[];s.push(r),s[0].id=t,u(s),p.reset()}catch(r){console.log(r)}},w=async e=>{try{e.preventDefault();const r=e.target.elements["delivery-id"].value;await h(r),N.innerHTML="";const{data:o}=await d();u(o),g.reset()}catch(r){console.log(r)}};p.addEventListener("submit",C);g.addEventListener("submit",w);
//# sourceMappingURL=index.js.map
