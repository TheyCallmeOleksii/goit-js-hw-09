const e=document.querySelector("[data-start]"),t=document.querySelector("[data-stop]"),d=document.querySelector("body");let a=null;function l(){a?(clearInterval(a),a=null,e.disabled=!1,t.disabled=!0):(a=setInterval((()=>{d.style.backgroundColor=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,"0")}`}),1e3),e.disabled=!0,t.disabled=!1)}e.addEventListener("click",l),t.addEventListener("click",l);
//# sourceMappingURL=01-color-switcher.7d3ecddc.js.map
