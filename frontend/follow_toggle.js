function FollowToggle ($button){
  this.$button = $button;
  this.userId = this.$button.data("user")["id"];
    // user id of user that is about to be followed
  this.followState = this.$button.data("user")["initial-follow-state"];
}

FollowToggle.setupFollowToggle = function($el){
  const newButton = new FollowToggle($el);
  $el.text(newButton.render());
  newButton.handleClick();
};


FollowToggle.prototype.render = function () {
  if (this.followState === "following" || this.followState === "unfollowing") {
    this.$button.prop("disabled", true);
  } else {
    this.$button.prop("disabled", false);
  }

  if (this.followState === "followed"){
    return "Unfollow!";
  } else {
    return "Follow!";
  }
};

FollowToggle.FOLLOW_STATES = ["followed", "unfollowing", "unfollowed", "following" ];

FollowToggle.prototype.switchFollow = function () {
  const currentStateIndex = FollowToggle.FOLLOW_STATES.findIndex((el) => {
    return el === this.followState;
  });
  const newIndex = (currentStateIndex + 1) % 4;
  this.followState = FollowToggle.FOLLOW_STATES[newIndex];
};

FollowToggle.prototype.handleClick = function () {
  this.$button.on('click', (event) =>{
    event.preventDefault();

    this.switchFollow();
    this.$button.text(this.render());
    if (this.followState === "following") {
      $.ajax({
        type: 'POST',
        url: `/users/${this.userId}/follow.json`,
        success: function(resp){
          this.switchFollow();
          this.$button.text(this.render());
        }.bind(this)
      });
    } else {
      $.ajax({
        type: 'DELETE',
        url: `/users/${this.userId}/follow.json`,
        success: function(resp){
          this.switchFollow();
          this.$button.text(this.render());
        }.bind(this)
      });
    }

  });
};

module.exports = FollowToggle;
