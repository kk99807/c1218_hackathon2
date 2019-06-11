$(document).ready(initApp);

let app = null;

function initApp() {
  app = new App();

  let width = $( window ).width();

  if(width > 419){
    $('body').removeClass();
    $('body').addClass('desktop');
  } else {
    $('body').removeClass();
    $('body').addClass('mobile')
  }
}

