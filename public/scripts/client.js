/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//Creates a tweet HTML element from data object with tweet info
const createTweetElement = (data) => {
  const timeAgo = timeago.format(data.created_at);
  const $tweet = $(`
    <article class="tweet">
    <header>
      <div>
        <img src=${data.user.avatars} class="usericon">
        <div class="username">${data.user.name}</div>
      </div>
      <div class="userhandle">${data.user.handle}</div>
    </header>
    <p>${data.content.text}</p>
    <footer>
      <div class="days-ago">${timeAgo}</div>
      <div class="tweet-actions">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
  `);

  return $tweet;
}


//Takes array of objects with info about tweets, calls createTweetElemenet and appends resulting HTML to the page
const renderTweets = function(tweets) {
  $('#tweet-container').empty();
  for (let tweet of tweets.reverse()){
    $('#tweet-container').append(createTweetElement(tweet));
  }
}

//Prevent the form from changing page on submission and send an AJAX post request with the data
const handleFormSubmission = () => {
  $('main > .new-tweet > form').submit((event) => {

    //Prevent form submission that refreshes page
    event.preventDefault();

    //Validate that tweet input is not empty or too long
    const userInput = $("#tweet-text").val();
    if (userInput.length==0) {
      return alert("Tweet can not be empty.");
    } else if (userInput.length > 140){
      return alert("Tweet can not exceed 140 characters");
    }

    //Post the tweet to server
    const submission = $('main > .new-tweet > form').serialize();
    $.ajax({url: '/tweets', method: 'POST', dataType: "xhr", data: submission});

    //Refresh tweets
    loadTweets();

  });
}

//Make AJAX request to the server to get tweets, then send them to render
const loadTweets = () => {
  $.ajax('/tweets', { method: 'GET' })
    .then((tweetsJSON) => {
      renderTweets(tweetsJSON);
    });
}

//-----Execute after loading DOM
$(()=> {
  loadTweets(); //Initial tweet loading
  handleFormSubmission(); 
});