(function(window){
  "use strict";
  function inject()
  {
    let _source = {};
    _source.cookie = _cookie();
    _source.doc = _doc();
    return _source;
  }

  function _cookie()
  {
    let _cookie = {};

    _cookie.set  = function( name, value, days)
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

    _cookie.get = function(name)
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

    return _cookie;
  }

  function _doc(element, className, content, parent, click){
  if(arguments[1])
  {
    const htmlRgx = new RegExp('/^/');
    let el = document.createElement(element);
    if(typeof className === 'string' || Array.isArray((className)))
      el.classList.add(className);

    if(htmlRgx.test(content))
      el.innerHTML = content;
    else
      el.innerText = content;

    if(click)
      el.onclick = click;
    if(parent)
    {
      parent.appendChild(el);
    }
    return el;
  }
  let _doc = {};
  }

  if(!window.inject)
    window.ij = inject();
})(window);