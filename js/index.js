$(document).ready(function()
{
  $.Spinner = new Spinner();
  $.Spinner.start();
  fetch('../js/pager.json').then(function (response) {
    return response.json();
  }).then(function (pager) {
    $.PageController = new PageController(pager);
    $.PageController.setPage(ij.cookie.get('view') || 'HOME').then(function(){
      _nav();
      _init($.PageController.currentPage());
    });
  });

  /**
   *
   * @param lib {Object} - Insert the navigational object
   "0":
      {
      "name": "HOME",
      "path": "../views/home.html"
       },
   * @returns {PageController}
   * @constructor
   */
  function PageController(lib) {
    let self = this;
    self.lib = lib;
    self.pageStack = [];
    self.setPage = function (view) {
      let isNav = _.find(self.lib, function(navItem){ return navItem.name == view; })
      if (!!isNav) {
        ij.cookie.set('view', view, 7);
        self.currentView = view;
        return Promise.resolve($('.content-wrapper').load(isNav.path))
      }
      return Promise.reject('params')
    };
    self.currentPage = function () {
      return self.currentView;
    };
    return self;
    /*
    self.stackPage = function (page)
    { self.pageStack.push({ name : name, html : page})
    self.popPage = function ( view )
    {
      let isPage =  _.find(self.pageStack, function(pageItem){ return pageItem.name == view; })
      return isPage || false;
    };
    */
  }

  function Rubix(container, options){
    let self = this;
    self.container = container;
    self.cache = setImages();
    function setImages(){
      let nodes = container[0].children
      _.extend(container[0].style, {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        display:"flex",
        flexFlow:"row wrap",
      });
      _.each(nodes, function(node){
        let imgSrc = node.dataset.rubix;
        _.extend(node.style, {
          background: "url(' "+imgSrc+ "') center center no-repeat",
          backgroundSize: "cover",
          flexBasis: "25%",
        });
      })
      return cacheImages(nodes)
    }
    function cacheImages(nodes){
      let cache = [];
      _.each(nodes, function(node, i){
        if (i >= 12){
          cache.push(node)
        }
      });
      _.each(cache, function(image){
        let idx = _.indexOf(nodes, image)
        _.extend(nodes[idx].style, {
          display: "none",
        })
      })

      return fadeTime(cache)
    }
    function fadeTime(cache){
      let nodes =  container[0].children;
      setInterval(function() {
        let node = nodes[_.random(0, 12)]
        $('li[data-rubix="' + node.dataset.rubix + '"]').fadeOut();
        var idx = _.random(0, cache.length)
        _.extend(node.style, {
          background: self.cache[idx].style.background,
        })
        delete self.cache[idx];
        $('li[data-rubix="' + node.dataset.rubix + '"]').fadeIn();

        cache.push(node)
        console.log(cache)
      }, 4000);
      return cache;
    }
  }

  /**
   * @constructor
   */
  function Spinner()
  {
    let loader = $('.loader-container');
    this.start = function(){
      $('.content-wrapper').removeClass('active')
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

  /**
   *
   * @param view {String} - The key name of the view
   * @private
   */
  function _init(view) {
    switch (view) {
      case 'HOME':
        startHome();
        break;
      case 'WORK':
        startWork()
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

  /**
   *
   * @private
   */
  function _nav()
  {
    let burgerMenu = $('.sidebar-burger-menu');
    let navMenu = $('.menu');
    let sideNav = $('.sidebar-nav');
    let navList = $('*[data-nav]');
    navList.each(function()
    {
      let self = $(this);
      if (self.attr('data-nav') === $.PageController.currentPage())
        self.addClass('active');
      self.click(function()
      {
        $.Spinner.start();
        clearNav();
        self.addClass('active');
        $.PageController.setPage(self.attr('data-nav')).then(function(){
          _init($.PageController.currentPage());
        })
      })
    });
    burgerMenu.click(function()
    {
      navMenu.toggleClass('active');
      sideNav.toggleClass('active');
    })
  }

  /**
   *
   */
  function startHome()
  {
    setTimeout(function()
    {
      let contactBtn = $('.btn[data-nav="CONTACT"]')
      contactBtn.click( function() {
        $.Spinner.start();
        clearNav();
        $('div[data-nav=\'CONTACT\']').addClass('active');
        $.PageController.setPage('CONTACT').then(function () {
          _init($.PageController.currentPage());
        })
      })
      $.Spinner.stop();
      $('.content-wrapper').addClass('active');

      animateMediaDrop($('.col-logo'), 'drop')
    }, $.Spinner.timer)
  }

  function startWork()
  {
    setTimeout(function()
    {

      const rubix = new Rubix($('.rubix'))

      console.log(rubix)
      $.Spinner.stop();

      $('.content-wrapper').addClass('active');
    }, $.Spinner.timer)
  }

  function startContact(){
    setTimeout(function()
    {
      $.Spinner.stop();

      //AIzaSyC8ZTauGtl8JGYAIo-GE-K-GrvbgufkwK8
      $('.content-wrapper').addClass('active')
    }, $.Spinner.timer)
  }
  function startAbout()
  {
    setTimeout(function()
    {
      $.Spinner.stop();
      $('.content-wrapper').addClass('active')
      animateMediaDrop($('#websoar'), 'fade')
    }, $.Spinner.timer)
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

  function underconstruction(view){
    $(`div[data-nav=${view}`).addClass('active');
    $('.content-wrapper').html(`<span class="construction">${view.toLowerCase()} is under construction</span>`).addClass('')
    setTimeout(function()
    {

      $.Spinner().stop();
      $('.content-wrapper').addClass('active')
    }, 2000);
  }
});
