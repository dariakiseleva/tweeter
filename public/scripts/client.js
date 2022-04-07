//Prevent Cross-Site Scripting via text content
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};


//Creates a tweet HTML element from data object with tweet info
const createTweetElement = (data) => {
  const timeAgo = timeago.format(data.created_at);

  const $tweet = $(`
    <article class="tweet">
    <header>
      <div>
        <img src=${escape(data.user.avatars)} class="usericon">
        <div class="username">${escape(data.user.name)}</div>
      </div>
      <div class="userhandle">${escape(data.user.handle)}</div>
    </header>
    <p>${escape(data.content.text)}</p>
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

//Takes re-renders all tweets in the container
const renderTweets = function(tweets) {
  $('#tweet-container').empty();
  for (let tweet of tweets.reverse()){
    $('#tweet-container').append(createTweetElement(tweet));
  }
}

const errorMessage = (command, errorText) => {
  if (command==="display") {
    $('#error-message').slideUp();
    const $errorHTML = `
    <div id="error-message">
    <i class="fa-solid fa-circle-exclamation"></i>
    <p>
      <b>Error: </b>${errorText}
    </p>
    </div>
  `
    $('#new-tweet').prepend($errorHTML);
    $('#new-tweet').find("#error-message").hide().slideDown();
  }

  if (command==="hide") {
    $('#error-message').slideUp();
  }

}


//Prevent the form from changing page on submission and send an AJAX post request with the data
const handleFormSubmission = () => {
  $('main > #new-tweet > form').submit((event) => {

    //Prevent form submission that refreshes page
    event.preventDefault();

    //Validate that tweet input is not empty or too long
    const userInput = $("#tweet-text").val();
    if (userInput.length==0) {
      const errorText = "tweet can not be empty."
      return errorMessage("display", errorText);
    } else if (userInput.length > 140){
      const errorText = "tweet can not exceed 140 characters."
      return errorMessage("display", errorText);
    }

    //Post the tweet to server
    const submission = $('main > #new-tweet > form').serialize();
    $.ajax({url: '/tweets', method: 'POST', dataType: "xhr", data: submission});

    //Hide error if it exists
    errorMessage("hide", null);

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