﻿!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:i})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var o in t)n.d(i,o,function(e){return t[e]}.bind(null,o));return i},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=3)}({114:function(t,e,n){"use strict";n.r(e),n.d(e,"StickersAnimation",function(){return i});var i=function(){var t=!1,e=!1,n={},o={},a={},r=void 0,s={};function c(t){if(window.isMVK){var e=document.createElement("script");e.onload=function(){t()},e.src="/js/cmodules/web/bodymovin.js",document.head.appendChild(e)}else stManager.add([jsc("web/bodymovin.js")],function(){t()})}function u(t){var e=f(t),n=1;if(e){hasClass(t,"animation_play")||(hide(geByClass1("sticker_img",t)),addClass(t,"animation_play")),e.play();var i=attr(t,"data-loop-count");i=parseInt(i),isNaN(i)&&(i=3),-1!==i&&(!e._cbs.loopComplete||e._cbs.loopComplete&&0===e._cbs.loopComplete.length)&&e.addEventListener("loopComplete",function o(a){var r=!0;i>=++n&&(r=!1),r&&(l(t,!1),""!==e._cbs.loopComplete&&e.removeEventListener("loopComplete",o),e.stop())})}}function d(t){var e=attr(t,"data-uid");return e||(e=attr(t,"data-uid",Math.random().toString(32).substr(2))),e}function l(t,e){s[d(t)]=e}function f(t){var e=attr(t,"data-uniq-id");if(!geByClass1("svg_sticker_animation",t))return!1;var n=o[e];return n||!1}function m(t,e){var i=f(t);if(i)"function"==typeof e&&e(i);else{var a=attr(t,"data-uniq-id");if(!s[d(t)]){l(t,!0);var r=attr(t,"data-animation-path"),c=attr(t,"data-sticker-id"),u=!1;if(c&&(u=n[c]?p(t):r&&p(t)),u){var m={container:t,renderer:"svg",loop:!0,autoplay:!1,name:a,rendererSettings:{scaleMode:"noScale",progressiveLoad:!0,hideOnTransparent:!0,className:"svg_sticker_animation"}};n[c]?m.animationData=n[c]:m.path=r;var v=geByClass1("svg_sticker_animation",t);if(v&&re(v),i=bodymovin.loadAnimation(m),!n[c])return void i.addEventListener("data_ready",function(){n[c]=i.animationData,o[a]=i,"function"==typeof e&&e(i)})}"function"==typeof e&&(o[a]=i,"function"==typeof e&&e(i))}}}return{checkSettingsAndLoadInWeb:function(t){if(StickersSettings.getAutoplay()){var e=ge("fc_msg"+t),n=geByClass1("sticker_animation",e);i.loadAndPlaySticker(n)}},checkSettingsAndLoad:function(t,e,n){StickersSettings.getAutoplay()&&(n?i.loadStickerInMvkIMAndPlay(t,e):(t.textFull||t.text).indexOf("sticker_animation",0)&&i.loadStickerInMvkIMAndPlay(t.id,e))},loadStickerInMvkIMAndPlay:function(t,e){var n="_msg"+t;e&&(n="msg_id_"+t);var o=geByClass1("sticker_animation",geByClass1(n));i.loadAndPlayStickerWithTimer(o,500)},loadAutoplayAnimationStickers:function(n){if("undefined"!=typeof bodymovin){if(n){if(e)return;e=!0}if(!t){t=!0;var o=geByClass("sticker_animation_autoplay");o&&each(o,function(t,e){m(e,function(){u(e)})}),t=!1}}else c(function(){i.loadAutoplayAnimationStickers()})},loadAndPlaySticker:function(t){if(t)return"undefined"==typeof bodymovin?(c(function(){i.loadAndPlaySticker(t)}),""):void requestAnimationFrame(function(){m(t,function(){u(t)})})},loadAndPlayStickerWithTimer:function(t,e){if(t&&!a[t]){e||(e=1e3);var n=ge(t);hasClass(n,"sticker_animation_disabled_timer")||(a[t]=setTimeout(function(){!n&&(n=ge(t),hasClass(n,"sticker_animation_disabled_timer"))||(i.loadAndPlaySticker(n),clearTimeout(a[t]),a[t]=!1)},e))}},reloadStickers:function(){o={}},touchStartSticker:function(t){window.oncontextmenu||(window.oncontextmenu=function(t){return t.preventDefault(),t.stopPropagation(),window.oncontextmenu=null,!1}),r=setTimeout(function(){i.loadAndPlaySticker(t)},500)},touchEndSticker:function(){r&&clearTimeout(r)}};function p(t){var e=t.getBoundingClientRect().top,n=t.getBoundingClientRect().bottom;return e<window.innerHeight&&n>=0&&isVisible(t)}}()},116:function(t,e,n){"use strict";n.r(e),n.d(e,"StickersSettings",function(){return i});var i={autoplay:0,setAutoplay:function(t){this.autoplay=t},getAutoplay:function(){return i.autoplay}}},182:function(t,e,n){"use strict";n.r(e);var i=n(114),o=n(116),a=n(92);window.StickersAnimation=i.StickersAnimation,window.StickersSettings=o.StickersSettings,window.Stickers=a.Stickers;try{stManager.done(jsc("web/stickers.js"))}catch(t){}},3:function(t,e,n){t.exports=n(182)},92:function(t,e,n){"use strict";n.r(e),n.d(e,"Stickers",function(){return a});var i={},o=function(t,e,n,o){delete i[e],1===o?Emoji.favorite.addFavoriteSticker(t,e,n):-1===o&&Emoji.favorite.deleteFavoriteSticker(t,e,n)};var a={toggleFavorite:function(t,e,n){if(e&&e.stopPropagation(),!hasClass(t,"on")&&Emoji.stickers[Emoji.TAB_FAVORITE_STICKERS].stickers.length>=Emoji.favoriteLimit&&!Emoji.favoriteLimitNoticed){var a=langStr(getLang("purchases_stickers_favorite_limit_notice"),"%s",Emoji.favoriteLimit);return setTimeout(showFastBox(getLang("global_error"),a).hide,3e3),ajax.post("stickers.php",{act:"favorite_limit_noticed",value:1}),Emoji.favoriteLimitNoticed=!0,!1}var r=attr(t,"data-sticker-id"),s=attr(t,"data-hash");return!(!r||!s)&&!i[r]&&(i[r]=1,toggleClass(t,"on"),void ajax.post("/stickers.php",{act:"toggle_favorite",sticker_id:r,hash:s},{onDone:o.pbind(n,r,t)}))},getStickerUrl:function(t,e){var n={id:t,size:e};return window.isMVK?rs(window.store.stickers.url_template,n):getTemplate("stickers_sticker_url",n)}}}});