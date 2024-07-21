(function(z,t){typeof exports=="object"&&typeof module<"u"?t(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],t):(z=typeof globalThis<"u"?globalThis:z||self,t(z["vue-spin-the-wheel"]={},z.Vue))})(this,function(z,t){"use strict";function v(e,u){const d=[];for(;e!=="";){let a=e.substr(0,u);if(e.charAt(u)!==""&&e.charAt(u)!==" "){const n=a.lastIndexOf(" ");n!==-1&&(a=a.substr(0,n))}e=e.replace(a,"").trim(),d.push(a)}return d}const I={radius:250,textRadius:190,textLength:6,textDirection:"horizontal",lineHeight:20,borderWidth:0,borderColor:"transparent",btnText:"Spin",btnWidth:140,fontSize:34};function M(e){const u=t.ref(),d=t.computed(()=>Object.assign(I,e.canvas||{}));let a,n;function g(){if(a=u.value,a.getContext){const{radius:l,textRadius:o,borderWidth:r,borderColor:s,fontSize:b}=d.value;if(!l||!o||!r||!s||!b)throw new Error("radius, textRadius, borderWidth, borderColor, and fontSize are required");const h=Math.PI/(e.prizes.length/2);n=a.getContext("2d"),n.clearRect(0,0,l*2,l*2),n.strokeStyle=s,n.lineWidth=r*2,n.font=`${b}px Arial`,e.prizes.forEach((c,k)=>{m(c,k,h,l,o,r)})}}function m(l,o,r,s,b,h=0){const c=o*r-Math.PI/2;n.fillStyle=l.bgColor,n.beginPath(),n.arc(s,s,s-h,c,c+r,!1),n.stroke(),n.arc(s,s,0,c+r,c,!0),n.fill(),n.save(),n.fillStyle=l.color,n.translate(s+Math.cos(c+r/2)*b,s+Math.sin(c+r/2)*b),S(c,r,l.name),n.restore()}function S(l,o,r){const{lineHeight:s,textLength:b,textDirection:h}=d.value;if(!s||!b||!h)throw new Error("lineHeight, textLength, and textDirection are required");const c=v(r,b);c&&(h==="vertical"?n.rotate(l+o/2+Math.PI):n.rotate(l+o/2+Math.PI/2),c.forEach((k,E)=>w(k,E,h,s,c.length)))}function w(l,o,r,s,b=0){let h=-n.measureText(l).width/2,c=(o+1)*s;r==="vertical"&&(h=0,c=(o+1)*s-b*s/2),n.fillText(l,h,c)}return t.onMounted(()=>{e.type==="canvas"&&g()}),t.onUpdated(()=>{e.type==="canvas"&&g()}),{wheelEl:u,canvasConfig:d,drawCanvas:g}}function T(e,u){const d=t.ref(!1),a=t.ref(0),n=t.ref(),g=t.computed(()=>e.useWeight?100:e.prizes.reduce((i,f)=>i+(f.probability||0),0)),m=t.computed(()=>{if(e.useWeight)return 0;const i=[...e.prizes].sort((y,p)=>{const C=String(y.probability).split(".")[1],R=String(p.probability).split(".")[1],A=C?C.length:0;return(R?R.length:0)-A}),f=String(i[0].probability).split(".")[1],x=f?f.length:0;return[1,10,100,1e3,1e4][x>4?4:x]}),S=t.computed(()=>{const i=[];return e.prizes.forEach(f=>{const x=e.useWeight?f.weight||0:(f.probability||0)*m.value,y=new Array(x).fill(f.id);i.push(...y)}),i}),w=t.computed(()=>d.value?e.duration/1e3:0),l=t.computed(()=>({"-webkit-transform":`rotateZ(${a.value}deg)`,transform:`rotateZ(${a.value}deg)`,"-webkit-transition-duration":`${w.value}s`,"transition-duration":`${w.value}s`,"-webkit-transition-timing-function:":e.timingFun,"transition-timing-function":e.timingFun})),o=t.computed(()=>{let i=e.angleBase*360;return e.angleBase<0&&(i-=360),i}),r=t.computed(()=>!e.disabled&&!d.value&&g.value===100);t.watch(()=>e.prizeId,i=>{if(!d.value)return;let f=B(i);e.angleBase<0&&(f-=360);const x=a.value;let y=e.angleBase*360+f;const p=360*Math.floor((y-x)/360);e.angleBase>=0?y+=Math.abs(p):y+=-360-p,a.value=y}),s();function s(){if(g.value!==100)throw new Error("Prizes Is Error: Sum of probabilities is not 100!");return!0}function b(){if(r.value){if(e.verify){u("rotateStart",h);return}u("rotateStart"),h()}}function h(){d.value=!0;const i=e.prizeId||E();a.value=o.value+B(i)}function c(){d.value=!1,a.value%=360,u("rotateEnd",n.value)}function k(i,f){return i=Math.ceil(i),f=Math.floor(f),Math.floor(Math.random()*(f-i+1))+i}function E(){const i=S.value.length;return S.value[k(0,i-1)]}function B(i){const f=360/e.prizes.length,x=e.prizes.findIndex(y=>y.id===i);return n.value=e.prizes[x],360-(f*x+f/2)}return{rotateStyle:l,handleClick:b,onRotateEnd:c}}const _={class:"fw-container"},P=["width","height"],W={class:"fw-btn"},D=((e,u)=>{const d=e.__vccOpts||e;for(const[a,n]of u)d[a]=n;return d})(t.defineComponent({__name:"index",props:{type:{default:"canvas"},useWeight:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},verify:{type:Boolean,default:!1},canvas:null,duration:{default:6e3},timingFun:{default:"cubic-bezier(0.36, 0.95, 0.64, 1)"},angleBase:{default:10},prizeId:{default:0},prizes:{default:()=>[]}},emits:["rotateStart","rotateEnd"],setup(e,{expose:u,emit:d}){const a=e,{wheelEl:n,canvasConfig:g}=M(a),{handleClick:m,rotateStyle:S,onRotateEnd:w}=T(a,d);return u({startRotate:()=>{m()}}),(l,o)=>(t.openBlock(),t.createElementBlock("div",_,[t.createElementVNode("div",{class:"fw-wheel",style:t.normalizeStyle(t.unref(S)),onTransitionend:o[0]||(o[0]=(...r)=>t.unref(w)&&t.unref(w)(...r)),"on:webkitTransitionend":o[1]||(o[1]=(...r)=>t.unref(w)&&t.unref(w)(...r))},[e.type==="canvas"?(t.openBlock(),t.createElementBlock("canvas",{key:0,ref_key:"wheelEl",ref:n,width:(t.unref(g).radius||1)*2,height:(t.unref(g).radius||1)*2},null,8,P)):t.renderSlot(l.$slots,"wheel",{key:1},void 0,!0)],36),t.createElementVNode("div",W,[e.type==="canvas"?(t.openBlock(),t.createElementBlock("div",{key:0,class:"fw-btn__btn",style:t.normalizeStyle({width:t.unref(g).btnWidth+"px",height:t.unref(g).btnWidth+"px"}),onClick:o[2]||(o[2]=(...r)=>t.unref(m)&&t.unref(m)(...r))},t.toDisplayString(t.unref(g).btnText),5)):(t.openBlock(),t.createElementBlock("div",{key:1,class:"fw-btn__image",onClick:o[3]||(o[3]=(...r)=>t.unref(m)&&t.unref(m)(...r))},[t.renderSlot(l.$slots,"button",{},void 0,!0)]))])]))}}),[["__scopeId","data-v-f344fcc3"]]);z.SpinTheWheel=D,Object.defineProperty(z,Symbol.toStringTag,{value:"Module"})});
