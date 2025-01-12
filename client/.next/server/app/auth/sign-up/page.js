(()=>{var e={};e.id=301,e.ids=[301],e.modules={399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},209:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},9348:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},412:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},7790:e=>{"use strict";e.exports=require("assert")},7702:e=>{"use strict";e.exports=require("events")},2048:e=>{"use strict";e.exports=require("fs")},2615:e=>{"use strict";e.exports=require("http")},5240:e=>{"use strict";e.exports=require("https")},9801:e=>{"use strict";e.exports=require("os")},5315:e=>{"use strict";e.exports=require("path")},6162:e=>{"use strict";e.exports=require("stream")},4175:e=>{"use strict";e.exports=require("tty")},7360:e=>{"use strict";e.exports=require("url")},1764:e=>{"use strict";e.exports=require("util")},1568:e=>{"use strict";e.exports=require("zlib")},3546:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>a.a,__next_app__:()=>d,pages:()=>c,routeModule:()=>p,tree:()=>u});var s=t(9442),i=t(42),n=t(8190),a=t.n(n),o=t(3289),l={};for(let e in o)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>o[e]);t.d(r,l);let u=["",{children:["auth",{children:["sign-up",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,8370)),"/Users/brinis/Documents/mini-microservices-boilerplate/ticketing/client/src/app/auth/sign-up/page.js"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,3041)),"/Users/brinis/Documents/mini-microservices-boilerplate/ticketing/client/src/app/layout.js"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,6042,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/brinis/Documents/mini-microservices-boilerplate/ticketing/client/src/app/auth/sign-up/page.js"],d={require:t,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/auth/sign-up/page",pathname:"/auth/sign-up",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:u}})},2884:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,6472,23)),Promise.resolve().then(t.t.bind(t,2461,23)),Promise.resolve().then(t.t.bind(t,8190,23)),Promise.resolve().then(t.t.bind(t,5282,23)),Promise.resolve().then(t.t.bind(t,6613,23)),Promise.resolve().then(t.t.bind(t,5486,23)),Promise.resolve().then(t.t.bind(t,8825,23))},9833:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,2144,23)),Promise.resolve().then(t.t.bind(t,2302,23)),Promise.resolve().then(t.t.bind(t,3582,23)),Promise.resolve().then(t.t.bind(t,9587,23)),Promise.resolve().then(t.t.bind(t,5329,23)),Promise.resolve().then(t.t.bind(t,599,23)),Promise.resolve().then(t.t.bind(t,2118,23))},1926:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,821,23))},3261:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,3510,23))},9328:(e,r,t)=>{Promise.resolve().then(t.bind(t,8370))},6855:(e,r,t)=>{Promise.resolve().then(t.bind(t,4196))},4619:(e,r,t)=>{"use strict";var s=t(9877);t.o(s,"redirect")&&t.d(r,{redirect:function(){return s.redirect}}),t.o(s,"useParams")&&t.d(r,{useParams:function(){return s.useParams}}),t.o(s,"useRouter")&&t.d(r,{useRouter:function(){return s.useRouter}})},4196:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>o});var s=t(6493),i=t(3606),n=t(2581),a=t(4619);function o(){let[e,r]=(0,i.useState)(""),[t,o]=(0,i.useState)(""),{doRequest:l,errors:u}=(0,n.Z)({url:"/api/users/sign-up",method:"post",body:{email:e,password:t}}),c=async e=>{e.preventDefault(),await l()&&(0,a.redirect)("/")};return(0,s.jsxs)("form",{onSubmit:c,children:[(0,s.jsx)("h1",{children:"Sign Up"}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Email Address"}),(0,s.jsx)("input",{value:e,onChange:e=>r(e.target.value),className:"form-control"})]}),(0,s.jsxs)("div",{className:"form-group",children:[(0,s.jsx)("label",{children:"Password"}),(0,s.jsx)("input",{value:t,onChange:e=>o(e.target.value),type:"password",className:"form-control"})]}),u,(0,s.jsx)("button",{className:"btn btn-primary",children:"Sign Up"})]})}},2581:(e,r,t)=>{"use strict";t.d(r,{Z:()=>a});var s=t(6493),i=t(9760),n=t(3606);let a=({url:e,method:r,body:t,onSuccess:a})=>{let[o,l]=(0,n.useState)(null);return{doRequest:async(n={})=>{try{l(null);let s=await i.Z[r](e,{...t,...n});return a&&a(s.data),s.data}catch(e){console.log(e),l((0,s.jsxs)("div",{className:"alert alert-danger",children:[(0,s.jsx)("h4",{children:"Ooops...."}),(0,s.jsx)("ul",{className:"my-0",children:e.response.data.errors.map(e=>(0,s.jsx)("li",{children:e.message},e.message))})]}))}},errors:o}}},9420:(e,r,t)=>{"use strict";t.d(r,{g:()=>n});var s=t(1652),i=t(8051);async function n(){let e=await (0,i.A)(),{data:{currentUser:r}}=await s.Z.get("http://www.ticketing-app-dev.xyz/api/users/current-user",{headers:e});return r}},8370:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>s});let s=(0,t(8105).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/Users/brinis/Documents/mini-microservices-boilerplate/ticketing/client/src/app/auth/sign-up/page.js\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/brinis/Documents/mini-microservices-boilerplate/ticketing/client/src/app/auth/sign-up/page.js","default")},3041:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l,metadata:()=>o});var s=t(7705);t(5023),t(8399);var i=t(9420),n=t(3496);async function a(){let e=await (0,i.g)(),r=[!e&&{label:"Sign Up",href:"/auth/sign-up"},!e&&{label:"Sign In",href:"/auth/sign-in"},e&&{label:"Sell Ticket",href:"/tickets/new"},e&&{label:"My Orders",href:"/orders"},e&&{label:"Sign Out",href:"/auth/sign-out"}].filter(e=>e).map(({label:e,href:r})=>(0,s.jsx)("li",{className:"nav-item",children:(0,s.jsx)(n.default,{href:r,className:"nav-link",children:e})},r));return(0,s.jsxs)("nav",{className:"navbar navbar-light bg-light",children:[(0,s.jsx)(n.default,{href:"/",className:"navbar-brand",children:"GitTix"}),(0,s.jsx)("div",{className:"d-flex justify-content-end",children:(0,s.jsx)("ul",{className:"nav d-flex align-items-center",children:r})})]})}let o={title:"Create Next App",description:"Generated by create next app"};async function l({children:e}){return(0,s.jsx)("html",{lang:"en",children:(0,s.jsxs)("body",{className:"antialiased",children:[(0,s.jsx)(a,{}),(0,s.jsx)("div",{className:"container",children:e})]})})}},5023:()=>{}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[779,854,760],()=>t(3546));module.exports=s})();