﻿!function(t){var e={};function n(o){if(e[o])return e[o].exports;var i=e[o]={i:o,l:!1,exports:{}};return t[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,o){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:o})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(o,i,function(e){return t[e]}.bind(null,i));return o},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}({0:function(t,e,n){t.exports=n(126)},126:function(t,e,n){"use strict";n.r(e);var o=n(184);window.initPageLayoutUI=window.initPageLayoutUI||function(){o.leftMenu.init(),window.__leftMenu=o.leftMenu};try{stManager.done(jsc("web/page_layout.js"))}catch(t){console.log(t.message)}},184:function(t,e,n){"use strict";n.r(e),n.d(e,"leftMenu",function(){return o});var o=new(function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.isInited=!1,this.menuEle=null,this.handleUpdateRequest=this.handleUpdateRequest.bind(this),this.handleScroll=this.handleScroll.bind(this)}return t.prototype.init=function(){if(this.isInited)return!1;this.menuEle=ge("side_bar"),this.menuEle?(this.lastScrollTop=window.scrollGetY(),this.firstScrollUp=!1,this.firstScrollDown=!1,this.resetState()):this._noMenu=!0},t.prototype.handleUpdateRequest=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this._noMenu||(t?(this.setPositionTop(0),this.setState("STATE_STICKY_BOTTOM")):this.handleScroll())},t.prototype.resetState=function(){this.setPositionTop(0),this.setState(window.scrollGetY()>10?"STATE_STICKY_TOP":"STATE_STICKY_BOTTOM")},t.prototype.setState=function(t){this.currentState!==t&&(this.currentState=t,"STATE_STICKY_TOP"===t?addClass(this.menuEle,"sticky_top"):"STATE_STICKY_BOTTOM"===t&&removeClass(this.menuEle,"sticky_top"))},t.prototype.setPositionTop=function(t){t>=0&&this.menuEle&&this.menuEle.style.setProperty("top",t+"px")},t.prototype.handleScrollDown=function(t){this.firstScrollDown||("STATE_STICKY_TOP"===this.currentState&&this.setPositionTop(t),this.setState("STATE_STICKY_BOTTOM")),this.firstScrollDown=!0,this.firstScrollUp=!1},t.prototype.handleScrollUp=function(t){this.firstScrollUp&&"STATE_STICKY_BOTTOM"===this.currentState&&this.menuEle.getBoundingClientRect().bottom<0&&this.setPositionTop(t-this.menuEle.clientHeight),"STATE_STICKY_TOP"!==this.currentState&&this.menuEle.getBoundingClientRect().top>=0&&(this.setState("STATE_STICKY_TOP"),this.setPositionTop(0)),this.firstScrollUp=!0,this.firstScrollDown=!1},t.prototype.handleScroll=function(){var t=window.scrollGetY();Boolean(this.lastScrollTop)&&(t>this.lastScrollTop?this.handleScrollDown(t):this.handleScrollUp(t)),this.lastScrollTop=t},t}())}});