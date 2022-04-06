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



const createTweetElement = (data) => {
  console.log(data.user.avatars);
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
      <div class="days-ago">${data.created_at} days ago</div>
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
  console.log($tweet); // to see what it looks like
  $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});