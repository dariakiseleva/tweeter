/////Responsible for updating the character counter when the user types in the form



////----------CALLBACK FUNCTIONS

const updateCounter = function(){

  //Read # chars from textarea and calculate remaining characters
  const chars = $(this).val().length; 
  const remChars = 140 - chars; 

  //Access the counter element and edit its value to remaining characters
  const counter = $(this).parent().find('div > .counter')
  counter.text(remChars);

  //Change counter color to red if over limit, otherwise return original color
  if (remChars < 0){
    counter.css('color', '#BB0000'); //red
  } else {
    counter.css('color', '#362C2C'); //original
  }

}



////----------EXECUTE

$(document).ready(function() {

  $( "#tweet-text" )
  .on('input', updateCounter);

});


