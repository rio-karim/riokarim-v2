(function(window){
  "use strict";
  const UTIL = new Inject().util;
  function Inject()
  {
    this.cookie = new Cookie;
    this.util = new Util;
    this.el = _element;
  }

  function Cookie()
  {
    this.set  = function( name, value, days)
    {
      let expires = "";
      if (days)
      {
        let date = new Date();
        let daysMs = (days*24*60*60*1000);
        date.setTime(date.getTime() + daysMs);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + (value || "")  + expires + "; path=/";
    };

    this.get = function(name)
    {
      let nameEQ = name + "=";
      let ca = document.cookie.split(';');
      for ( let i = 0; i < ca.length; i++)
      {
        let c = ca[i];
        while (c.charAt(0) === ' ')
          c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0)
          return c.substring(nameEQ.length,c.length);
      }
      return false;
    };
  }

  function Util()
  {
    let self = this;
    self.count = 0;
    self.incr = function(i)
    {
      self.count++;
      return i+1
    };
    self.elAssign = function(element)
    {
      element.setAttribute('data-ij', self.incr(self.count));
      return element
    };
    self.error = function(source, error)
    {
      console.error(source, error);
      console.warn("INJECT: An error has caused a critical compilation issue.")
    };
  }

  function _element(element, className, content, parent, click){
    let ret;
    const exists = !!document.querySelector(parent.selector);
    if (!exists)
      UTIL.error(parent, " is not in the current document, please check your Parent parameters.");

    let el = UTIL.elAssign(document.createElement(element));
    if (typeof className === 'string' || Array.isArray((className)))
      el.classList.add(className);
    if (content.includes('<') || content.includes('>'))
      el.innerHTML = content;
    else
      el.innerText = content;
    if (click)
      el.onclick = click;
    ret = el;
    if (parent.length) {
      let parentAppend = parent instanceof Element ? parent : parent[0];
      parentAppend.appendChild(el);
      let selector = `${el.nodeName}[data-ij='${el.dataset.ij}']`;
      ret = Object.assign(document.querySelector(selector), {
        ijContent: function(text)
        {
          if (text.includes('<') || text.includes('>'))
            this.innerHTML = text;
          else
            this.innerText = text;
        }
      });
    }
    return ret;
  }

  if(!window.ij)
    window.ij = new Inject();
})(window);