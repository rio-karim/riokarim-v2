$(document).ready(() =>
{

  Promise.resolve($('.content-wrapper').load('../views/home.html')).then( () =>
  {
    setTimeout(() =>
    {
      $(".col-logo").show({ effect: "drop", duration: 2000 })
    }, 500)

  })
});