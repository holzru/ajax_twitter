const FollowToggle = require('./follow_toggle.js');

function UserSearch ($el){
  this.$el = $el;
  this.$input = $el.find('input');

  this.listener();
}


UserSearch.prototype.listener = function (){
  this.$input.on('keyup', () => this.handleInput() );
};

UserSearch.prototype.handleInput = function (event) {
  let query = this.$input.val();
  let self = this;

  $.ajax({
    type: 'GET',
    dataType: 'json',
    data: {
      query: `${query}`
    },
    url: '/users/search',
    success(resp) {
      console.log(resp);
      self.renderResults(resp);
    }
  });
};

UserSearch.prototype.renderResults = function (resp) {
  const $usersList = this.$el.find('.users');
  $usersList.empty();

  resp.forEach( (user) => {
    let $userObject = this.createLiUser(user);
    $usersList.append($userObject);
  });
};

UserSearch.prototype.createLiUser = function (user) {
  let followStatus = user['followed'] ? "followed" : "unfollowed";

  console.log('user: '+ user);

  let body = `<a href="/users/${user['id']}">${user['username']}</a>`;
  body += `<button type="button" name="button" class="follow-toggle"
          data-user='{"id": ${user['id']},
          "initial-follow-state": "${followStatus}"}'></button>`;
  let $userObject = $(`<li>${body}</li>`);

  FollowToggle.setupFollowToggle($userObject.find('button'));
  return $userObject;
};

module.exports = UserSearch;
