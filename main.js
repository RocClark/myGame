console.log('hi there');

$( document ).ready(function() {
  console.log('hi there on dom ready');
  $('.gameboard').on('click', '.gamePlace',function() {
    $(this).css('background-color', 'pink');
  });
  //clear
  
    $('body').on('click', '.btnClear', function(){
      console.log('hi ready');

      location.reload();
    });
  
});

