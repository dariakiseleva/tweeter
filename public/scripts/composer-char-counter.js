//Responsible for character counter

////----------CALLBACK FUNCTIONS

const testCallback = function(event){
  const chars = $(this).val().length;
  const remChars = 140 - chars;
  console.log(remChars);
}



////----------EXECUTE

$(document).ready(function() {

  $( "#tweet-text" )
  .on('input', testCallback);

});


