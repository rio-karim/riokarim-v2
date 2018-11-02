$(document).ready(function()
{

  pageController('HOME');
  handleNav();
  function pageController(view) {
    $('.content-wrapper').removeClass('active');
    clearNav()
    loadingScreen().start();
    switch (view){
      case 'HOME':
        initHome(view);
        break;
      case 'SKILLS':
        underconstruction(view);
        break;
      case 'ABOUT':
        underconstruction(view);
        break;
      case 'CONTACT':
        underconstruction(view);
        break;
      case 'WORK':
        underconstruction(view);
        break;

    }
  }

  function handleNav()
  {
    const navList = $('.sidebar-nav .sidebar-nav__item');
    navList.each(function()
    {
      let self = $(this);
      self.click(function()
      {
        pageController(self.attr('data-nav'))
      })
    })

    const burgerMenu = $('.sidebar-burger-menu');
    const sideNav = $('.sidebar-nav');
    burgerMenu.click(function()
    {
      burgerMenu.toggleClass('active');
      sideNav.toggleClass('active');
    })
  }

  const navMenu = $('.menu');
  navMenu.click(function()
  {
    navMenu.toggleClass('active');
  });

  function loadingScreen()
  {
    const loader = $('.loader-container');
    let options = {};
    options.start = function(){
      loader.addClass('active');
    };
    options.stop = function(){
      if (loader.hasClass('active'))
        loader.removeClass('active')
    }
    return options
  }

  function clearNav(){
    $(".sidebar-nav__item").each(function()
    {
      if ($(this).hasClass('active'))
        $(this).removeClass('active')
    })
  }

  function initHome(view)
  {
    $(`div[data-nav=${view}`).addClass('active');
    let body = $('.content-wrapper');
    Promise.resolve(body.load('../views/home.html')).then(function()
    {
      setTimeout(function()
      {
        loadingScreen().stop();
        $('.content-wrapper').addClass('active')
        $('.col-logo').show({effect: 'drop', easing: "swing", duration: 1500 })
      }, 2000)
  })
  }

  function underconstruction(view){
    $('.content-wrapper');
    $(`div[data-nav=${view}`).addClass('active');
    $('.content-wrapper').html(`<span class="construction">${view.toLowerCase()} is under construction</span>`).addClass('')
    setTimeout(function()
    {

      $('.content-wrapper').addClass('active')
      loadingScreen().stop();
    }, 2000);
  }
});