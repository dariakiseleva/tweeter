/////Responsible for updating the character counter when the user types in the form



////----------CALLBACK FUNCTIONS

const updateCounter = function(event){

  //Read # chars from textarea and calculate remaining characters
  const chars = $(this).val().length; 
  const remChars = 140 - chars; 

  //Access the counter element and edit its value to remaining characters
  const counter = $(this).parent().find('div > .counter')
  counter.text(remChars);

}



////----------EXECUTE

$(document).ready(function() {

  $( "#tweet-text" )
  .on('input', updateCounter);

});


