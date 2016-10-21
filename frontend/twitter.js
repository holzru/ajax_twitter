const FollowToggle = require('./follow_toggle.js');
const UserSearch = require("./user_search.js");
const TweetCompose = require("./tweet_compose.js");

$(() =>{

  $(`button.follow-toggle`).each((index, button) => {
    FollowToggle.setupFollowToggle($(button));
  });

  new TweetCompose($('form.tweet-compose'));

  new UserSearch($("nav.users-search"));

});
