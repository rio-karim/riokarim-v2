$(document).ready(() =>
{
  function pageController(view) {
    const body = $('.content-wrapper');
    switch (view){
      case 'HOME':
        body.load('../views/home.html');
        break;
      case 'SKILLS':
        body.load('../views/skills.html');
        break;
      case 'ABOUT':
        body.load('../views/about.html');
        break;
      case 'CONTACT':
        body.load('../views/contact.html');
        break;
      case 'WORK':
        body.load('../views/work.html.html');
        break;
    }
  }

});