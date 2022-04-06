/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//---Helper constant data
const tweetData =  {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

//Converts creation time in ms to days ago from current time
const calculateDaysAgo = (msCreated) => {

  const msInDay = 1000 * 60 * 60 * 24;

  const msNow = Date.now();
  const msAgo = msNow - msCreated;
  const daysAgo = Math.floor(msAgo/msInDay);

  return daysAgo;
}

//Creates a tweet HTML element from data object with tweet info
const createTweetElement = (data) => {
  const daysAgo = calculateDaysAgo(data.created_at);
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
      <div class="days-ago">${daysAgo} ${daysAgo==1 ? "day" : "days"} ago</div>
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
  for (let tweet of tweets){
    $('#tweet-container').append(createTweetElement(tweet));
  }
}


const handleFormSubmission = () => {
  $('main > .new-tweet > form').submit((event) => {
    event.preventDefault();
  });
}

//-----Execute after loading DOM
$(()=> {
  renderTweets(data);
  handleFormSubmission();
});