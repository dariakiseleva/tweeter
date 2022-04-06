/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


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



const calculateDaysAgo = (msCreated) => {

  const msInDay = 1000 * 60 * 60 * 24;

  const msNow = Date.now();
  const msAgo = msNow - msCreated;
  const daysAgo = Math.floor(msAgo/msInDay);

  return daysAgo;
}

const createTweetElement = (data) => {
  const daysAgo = calculateDaysAgo(data.created_at);
  const element = `
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
  `
  return element;
}

$(()=> {

  console.log(tweetData);
	const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  //console.log($tweet); // to see what it looks like
  $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});