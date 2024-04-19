import{_ as V}from"./uploader-CugjJYdL.js";import{h as f}from"./http-CiWzU4pP.js";import{e as C,f as h,i as k,m as P,r,o as p,c as _,a as e,b as a,w as u,d as m}from"./index-BPnDSaWA.js";const q={class:"w-full h-full grid justify-items-center items-center pt-16"},j={class:"w-[85%] h-[90%] flex flex-col gap-y-10 bg-gray-100 rounded-xl p-7"},z={class:"flex justify-between"},S=e("h2",{class:"text-[1.3vw]"},"Create Product",-1),U={class:"flex gap-x-4"},B={class:"grid grid-cols-2 w-full place-items-center"},N={class:"grid w-1/2"},R=e("label",{id:"product-label",class:"text-[.8rem] translate-y-[50%] bg-gray-100 w-fit z-10 px-1 ml-2 text-gray-500"}," Product name ",-1),L={class:"grid w-1/2"},T={class:"grid col-[1/-1] w-full place-items-center py-7"},E=e("header",{class:"flex justify-between place-self-start pb-5"},[e("h2",{class:"text-[1.2vw]"},"Select picture")],-1),F={class:"h-[33vh] aspect-square grid grid-cols-1 grid-rows-1 overflow-hidden"},H={key:0,class:"bg-slate-400 h-[33vh] w-[100%] aspect-square rounded-3xl overflow-hidden place-items-center grid"},I=["src"],O={key:1,class:"bg-slate-400 h-[33vh] w-[100%] aspect-square rounded-3xl overflow-hidden"},A=e("img",{class:"w-full h-full z-10",src:V,alt:"upload image here"},null,-1),D=[A],Q=C({__name:"CreateProductPage",setup(G){const c=h({selected:"",options:[]}),o=h({name:"",category_id:"",picture:null}),n=k(null),g=P();f.get("/api/category").then(({status:t,data:s})=>{if(t==200){const{categories:d}=s.data;c.options=d.map(i=>({label:i.name,value:i.id}))}});const w=t=>{o.category_id=t.value},v=t=>{n.value=null,o.picture=null,o.picture=t.target.files[0],n.value=URL.createObjectURL(t.target.files[0])},x=async()=>{const{status:t}=await f.post("/api/product",o,{headers:{"Content-Type":"multipart/form-data"}});t==201&&g.push("/dashboard/products")};return(t,s)=>{const d=r("ui-button"),i=r("router-link"),b=r("ui-textfield"),y=r("ui-select");return p(),_("div",q,[e("div",j,[e("header",z,[S,e("div",U,[a(i,{to:"/dashboard"},{default:u(()=>[a(d,{class:"w-36 text-[.8vw] font-semibold h-12",outlined:""},{default:u(()=>[m(" Cancel ")]),_:1})]),_:1}),a(d,{class:"w-36 text-[.8vw] font-semibold h-12",unelevated:"",onClick:x},{default:u(()=>[m(" submit ")]),_:1})])]),e("div",B,[e("section",N,[R,a(b,{modelValue:o.name,"onUpdate:modelValue":s[0]||(s[0]=l=>o.name=l),outlined:"",required:"","input-type":"text",attrs:{placeholder:"Product name",labelId:"#product-label",autocomplete:"off"},placeholder:"Product name"},null,8,["modelValue"])]),e("section",L,[a(y,{id:"full-func-js-select",modelValue:c.selected,"onUpdate:modelValue":s[1]||(s[1]=l=>c.selected=l),options:c.options,onSelected:s[2]||(s[2]=l=>w(l))},{default:u(()=>[m(" Select category ")]),_:1},8,["modelValue","options"])]),e("section",T,[E,e("section",F,[n.value?(p(),_("div",H,[e("img",{class:"w-[90%] h-[90%] z-10",src:n.value},null,8,I)])):(p(),_("div",O,D)),e("input",{type:"file",required:"",class:"h-[100%] aspect-square z-20 cursor-pointer opacity-0 rounded-3xl",onchange:v})])])])])])}}});export{Q as default};
