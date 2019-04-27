/*!
 * artplayer-tool-thumbnail.js v3.1.7
 * Github: https://github.com/zhw2590582/ArtPlayer#readme
 * (c) 2017-2019 Harvey Zack
 * Released under the MIT License.
 */

!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define(e):(t=t||self)["artplayer-tool-thumbnail"]=e()}(this,function(){"use strict";var o=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")};function i(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}var e=function(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t};function t(t,e){return t(e={exports:{}},e.exports),e.exports}var n=t(function(e){function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function o(t){return"function"==typeof Symbol&&"symbol"===n(Symbol.iterator)?e.exports=o=function(t){return n(t)}:e.exports=o=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":n(t)},o(t)}e.exports=o});var r=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t};var a=function(t,e){return!e||"object"!==n(e)&&"function"!=typeof e?r(t):e},s=t(function(e){function n(t){return e.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(t)}e.exports=n}),u=t(function(n){function o(t,e){return n.exports=o=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},o(t,e)}n.exports=o});var l=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&u(t,e)};function c(){}c.prototype={on:function(t,e,n){var o=this.e||(this.e={});return(o[t]||(o[t]=[])).push({fn:e,ctx:n}),this},once:function(t,e,n){var o=this;function i(){o.off(t,i),e.apply(n,arguments)}return i._=e,this.on(t,i,n)},emit:function(t){for(var e=[].slice.call(arguments,1),n=((this.e||(this.e={}))[t]||[]).slice(),o=0,i=n.length;o<i;o++)n[o].fn.apply(n[o].ctx,e);return this},off:function(t,e){var n=this.e||(this.e={}),o=n[t],i=[];if(o&&e)for(var r=0,a=o.length;r<a;r++)o[r].fn!==e&&o[r].fn._!==e&&i.push(o[r]);return i.length?n[t]=i:delete n[t],this}};var h=c,f=c;function p(e){return new Promise(function(t){return setTimeout(t,e)})}function d(t,e,n){return Math.max(Math.min(t,Math.max(e,n)),Math.min(e,n))}h.TinyEmitter=f;var m=function(t){function n(){var t,e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return o(this,n),(t=a(this,s(n).call(this))).processing=!1,t.option={},t.setup(Object.assign({},n.DEFAULTS,e)),t.video=n.creatVideo(),t.inputChange=t.inputChange.bind(r(t)),t.ondrop=t.ondrop.bind(r(t)),t.option.fileInput.addEventListener("change",t.inputChange),t.option.fileInput.addEventListener("dragover",n.ondragover),t.option.fileInput.addEventListener("drop",n.ondrop),t}return l(n,h),e(n,[{key:"ondrop",value:function(t){t.preventDefault();var e=t.dataTransfer.files[0];this.loadVideo(e)}},{key:"setup",value:function(){var e=this,t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.option=Object.assign({},this.option,t);var n=this.option,o=n.fileInput,i=n.delay,r=n.number,a=n.width,s=n.height,u=n.column;if(this.errorHandle(o instanceof Element,"The 'fileInput' is not a Element"),"INPUT"!==o.tagName||"file"!==o.type){o.style.position="relative";var l=document.createElement("input");l.type="file",l.style.position="absolute",l.style.width="100%",l.style.height="100%",l.style.left="0",l.style.top="0",l.style.right="0",l.style.bottom="0",l.style.opacity="0",o.appendChild(l),this.option.fileInput=l}return["delay","number","width","height","column"].forEach(function(t){e.errorHandle("number"==typeof e.option[t],"The '".concat(t,"' is not a number"))}),this.option.delay=d(i,10,1e3),this.option.number=d(r,10,1e3),this.option.width=d(a,10,1e3),this.option.height=d(s,10,1e3),this.option.column=d(u,1,1e3),this}},{key:"inputChange",value:function(){var t=this.option.fileInput.files[0];this.loadVideo(t)}},{key:"loadVideo",value:function(t){var e=this,n=this.option.delay;if(t){var o=this.video.canPlayType(t.type);this.errorHandle("maybe"===o||"probably"===o,"Playback of this file format is not supported: ".concat(t.type));var i=URL.createObjectURL(t);this.videoUrl=i,this.file=t,this.emit("file",this.file),this.video.src=i,p(n).then(function(){e.emit("video",e.video)}).catch(function(t){e.emit("error",t.message),console.error(t)})}}},{key:"start",value:function(){var o=this,t=this.option,i=t.width,r=t.height,a=t.number,s=t.delay;this.density=a/this.video.duration,this.errorHandle(this.file&&this.video,"Please select the video file first"),this.errorHandle(!this.processing,"There is currently a task in progress, please wait a moment..."),this.errorHandle(this.density<=1,"The preview density cannot be greater than 1, but got ".concat(this.density));var e=this.creatScreenshotDate(),u=this.creatCanvas(),l=u.getContext("2d");this.emit("canvas",u);var n=e.map(function(t,n){return function(){return o.video.currentTime=t.time,new Promise(function(e){p(s).then(function(){l.drawImage(o.video,t.x,t.y,i,r),u.toBlob(function(t){o.thumbnailUrl&&URL.revokeObjectURL(o.thumbnailUrl),o.thumbnailUrl=URL.createObjectURL(t),o.emit("update",o.thumbnailUrl,(n+1)/a),e()})}).catch(function(t){console.error(t)})})}});return this.processing=!0,function(t){return t.reduce(function(t,e){return t.then(e)},Promise.resolve())}(n).then(function(){return p(2*s).then(function(){o.processing=!1,o.emit("done")}).catch(function(t){o.processing=!1,o.emit("error",t.message),console.error(t)})}).catch(function(t){o.processing=!1,o.emit("error",t.message),console.error(t)})}},{key:"creatScreenshotDate",value:function(){for(var t=this.option,e=t.number,n=t.width,o=t.height,i=t.column,r=this.video.duration/e,a=[r];a.length<e;){var s=a[a.length-1];a.push(s+r)}return a.map(function(t,e){return{time:t-r/2,x:e%i*n,y:Math.floor(e/i)*o}})}},{key:"creatCanvas",value:function(){var t=this.option,e=t.number,n=t.width,o=t.height,i=t.column,r=document.createElement("canvas"),a=r.getContext("2d");return r.width=n*i,r.height=Math.ceil(e/i)*o+30,a.fillStyle="black",a.fillRect(0,0,r.width,r.height),a.font="14px Georgia",a.fillStyle="#fff",a.fillText("From: https://artplayer.org/, Number: ".concat(e,", Width: ").concat(n,", Height: ").concat(o,", Column: ").concat(i),10,r.height-11),r}},{key:"download",value:function(){this.errorHandle(this.file&&this.thumbnailUrl,"Download does not seem to be ready, please create preview first"),this.errorHandle(!this.processing,"There is currently a task in progress, please wait a moment...");var t=document.createElement("a"),e="".concat(function(t){var e=t.split(".");return e.pop(),e.join(".")}(this.file.name),".png");return t.download=e,t.href=this.thumbnailUrl,document.body.appendChild(t),t.click(),document.body.removeChild(t),this.emit("download",e),this}},{key:"errorHandle",value:function(t,e){if(!t)throw this.emit("error",e),new Error(e)}},{key:"destroy",value:function(){this.option.fileInput.removeEventListener("change",this.inputChange),this.option.fileInput.removeEventListener("dragover",n.ondragover),this.option.fileInput.removeEventListener("drop",n.ondrop),document.body.removeChild(this.video),this.videoUrl&&URL.revokeObjectURL(this.videoUrl),this.thumbnailUrl&&URL.revokeObjectURL(this.thumbnailUrl),this.emit("destroy")}}],[{key:"ondragover",value:function(t){t.preventDefault()}},{key:"creatVideo",value:function(){var t=document.createElement("video");return t.style.position="absolute",t.style.top="-9999px",t.style.left="-9999px",t.muted=!0,t.controls=!0,document.body.appendChild(t),t}},{key:"DEFAULTS",get:function(){return{delay:300,number:60,width:160,height:90,column:10}}}]),n}();return window.ArtplayerToolThumbnail=m});
