$(document).ready(function()
{

  $.Spinner = new Spinner();
  $.Spinner.start();
  fetch('../js/pager.json').then(function (response) {
    return response.json();
  }).then(function (pager) {
    $.PageController = new PageController(pager);
    $.PageController.setPage(ij.cookie.get('view') || 'HOME').then(function(){
      _nav()
      _init($.PageController.getPage());
    });
  });




  /**CONTROLLERS*/
  /**
   * @constructor
   */
  function PageController(lib) {
    let self = this;
    self.lib = lib;
    self.setPage = function (view) {
      let isNav = _.find(self.lib, function(navItem){ return navItem.name == view; })
      if (!!isNav) {
        ij.cookie.set('view', view, 7);
        self.currentView = view;
        return Promise.resolve($('.content-wrapper').load(isNav.path))
      }
      return Promise.reject('params')
    };
    self.getPage = function () {
      return self.currentView;
    };
    return self;
  }

  function Spinner()
  {
    let loader = $('.loader-container');
    this.start = function(){
      loader.show();
      loader.addClass('active');
    };
    this.stop = function(){
      loader.fadeOut({duration:50});
      setTimeout(function()
      {
        if (loader.hasClass('active'))
          loader.removeClass('active')
      }, 500)
    };
    this.timer = 2000;
    return this
  }

  function _init(view) {
    switch (view) {
      case 'HOME':
        startHome();
        break;
      case 'WORK':
        startWork();
        break;
      case 'SKILLS':
        startSkills();
        break;
      case 'CONTACT':
        startContact();
        break;
      case 'ABOUT':
        startAbout();
        break;
      default:
    }
  }

  function _nav()
  {
    let burgerMenu = $('.sidebar-burger-menu');
    let navMenu = $('.menu');
    let sideNav = $('.sidebar-nav');
    let navList = $('.sidebar-nav .sidebar-nav__item');
    navList.each(function()
    {
      let self = $(this);
      if (self.attr('data-nav') === $.PageController.getPage())
        self.addClass('active');
      self.click(function()
      {
        $.Spinner.start();
        clearNav();
        self.addClass('active');
        $.PageController.setPage(self.attr('data-nav')).then(function(){
          _init($.PageController.getPage());
        })
      })
    });
    burgerMenu.click(function()
    {
      navMenu.toggleClass('active');
      sideNav.toggleClass('active');
    })
  }

  function startHome()
  {
    setTimeout(function()
    {
      $.Spinner.stop();
      $('.content-wrapper').addClass('active');

      animateMediaDrop($('.col-logo'), 'drop')
    }, Spinner().timer)
  }

  function startWork()
  {
    setTimeout(function()
    {
      $.Spinner.stop();

      $('.content-wrapper').addClass('active');
    }, Spinner().timer)
  }

  function startContact(){
    setTimeout(function()
    {
      $.Spinner.stop();

      $('.content-wrapper').addClass('active')
    }, Spinner().timer)
  }
  function startAbout()
  {
    setTimeout(function()
    {
      $.Spinner.stop();
      $('.content-wrapper').addClass('active')
      animateMediaDrop($('#websoar'), 'fade')
    }, Spinner().timer)
  }

  function startSkills()
  {
    setTimeout(function()
    {
      $.Spinner.stop();
      $('.content-wrapper').addClass('active')
      if(!$('#tagcanvas').tagcanvas({
          textColour: '#3FC4E4',
          outlineColour: 'transparent',
          reverse: true,
          maxSpeed: 0.18,
          zoom: .45,
          zoomMax: .45,
          stretchX: 3,
          stretchY: 3,
          textHeight:36,
          shuffleTags: true,
          weight:true,
          weightMode: "size",
          txtOpt: true,
          textFont: "Raleway, sans-serif",
          noSelect: true,
          initial: [0.1,-.05]
        },'tags')) {
        // something went wrong, hide the canvas container
        $('#ajaxsass').hide();
      }
    }, 2000)
  }

  /**HELPERS**/

  function animateMediaDrop(el, animation)
  {
    if (animation == 'drop')
      el.show({effect: 'drop', easing: "swing", duration: 1500 })
    else if (animation == 'fade')
      el.fadeIn({duration: 1000, easing: 'swing'});
  }

  function clearNav(){
    $(".sidebar-nav__item").each(function()
    {
      if ($(this).hasClass('active'))
        $(this).removeClass('active')
    })
  }
});
