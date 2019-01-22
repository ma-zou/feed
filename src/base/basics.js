/* BODY CLASS HANDLING */
var body = document.querySelector('body');
body.classList.remove('noJS');
body.classList.add('javascript');

if ('ontouchstart' in document.documentElement) body.classList.add('isTouch');

/* Replace all a[href^="tel"] by span elements */
function phonelink(){var e=document.querySelectorAll('a[href^="tel:"]'),t=document.querySelectorAll('a[href^="whatsapp://"]');for(i=0;i<e.length;i++){var r=e[i],a=r.className,l=r.innerHTML,n='<span class="'+a+'">'+l+"</span>";r.outerHTML=n}for(i=0;i<t.length;i++){var r=t[i];r.setAttribute("href",r.getAttribute("href").replace("whatsapp://","https://web.whatsapp.com/"))}}

/* REPLACE a[href^="tel"] BY SPAN ELEMENT IF NOT MOBILE DEVICE */
if(!('ontouchstart' in window || navigator.maxTouchPoints)) phonelink();

/*
 * css breakpoints in javascript object
 * https://github.com/ma-zou/breakpoints_from_css/blob/master/script.js
*/
window.breakpoint=function(e,t){var n=window.getComputedStyle(document.querySelector("body"),":before").getPropertyValue("content").replace(/\"/g,"").split("...."),o=new Array;for(i=0;i<n.length;i++){var r=n[i].split(":");o[r[0]]=r[1]}return t=void 0===t?"min":t,void 0===e?o:"min"===t?window.matchMedia("(min-width: "+o[e]+")").matches:window.matchMedia("(max-width: "+breakpoint[e]+")").matches};

/* MAILMASK */
(function() {var maillinks = document.querySelectorAll('a[data-email]');for (i = 0; i < maillinks.length; i++) {var data = JSON.parse(maillinks[i].getAttribute('data-email'));maillinks[i].href = "mailto:" + data.name + "@" + data.host;maillinks[i].innerHTML = data.name + "@" + data.host;}})();

/*
 * new scrollDir(document.body); 
 * Adds a class to an element to indicate the scroll direction
 */
function ScrollDir(elm) {var lastScrollTop = 0;document.addEventListener('scroll', function(e){var scrollTop = window.pageYOffset || document.documentElement.scrollTop;if (scrollTop > lastScrollTop) {elm.classList.add('scrollingDown');elm.classList.remove('scrollingUp');}else{elm.classList.remove('scrollingDown');elm.classList.add('scrollingUp');}lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;});}

window.addEventListener('keydown', function(e) {if(e.which == 13 && document.activeElement.getAttribute('tabindex') != null) document.activeElement.click();});




/**
 * @desc J Library with handy helper functions
 * @version 1.0.0
 * @author Dominik Kressler
 * @author Malte Zoudlik
*/
var J = function()
{
    return this
};
J.prototype.merge = function(obj1, obj2)
{
    var obj3 = {};
    
    for (var attrname in obj1)
        obj3[attrname] = obj1[attrname];
    
    for (var attrname in obj2)
        obj3[attrname] = obj2[attrname];
    
    return obj3;
};
J.prototype.isOnScreen = function(node)
{
    var bounding = node.getBoundingClientRect();
    
    var isOnScreen = (
        bounding.top + bounding.height >= 0 &&
        bounding.left + bounding.width >= 0 &&
        bounding.right - bounding.width <= (window.innerWidth || document.documentElement.clientWidth) &&
        bounding.bottom - bounding.height <= (window.innerHeight || document.documentElement.clientHeight)
    );

    if(isOnScreen) 
    {
        node.classList.add('lazyLoaded');
        node.classList.add('isOnScreen');
    }
    else node.classList.remove('isOnScreen');

    return isOnScreen;
};
J.prototype.isNodeElement = function(element) {
    return element instanceof Element || element instanceof HTMLDocument; 
};
J.prototype.deep_value = function(obj, path){
    for (var i=0, path=path.split('.'), len=path.length; i<len; i++){
        if(obj[path[i]] == null || typeof obj[path[i]] == "undefined") obj = '';
        else obj = obj[path[i]];
    };
    return obj;
};
J = new J();