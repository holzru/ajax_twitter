function TweetCompose ($el){

  this.$el = $el;

  this.listener();
}

TweetCompose.prototype.listener = function () {
  this.$el.on('submit', (event) => {
    this.submit(event);
  });

  this.$el.find('textarea').on('keyup', (event) => {
    let remaining = 140;
    remaining = 140 - this.$el.find('textarea').val().length;
    // console.log(this.$el.val());
    this.$el.find('.chars-left').text(`Chars remaining: ${remaining}`);
  });
};

TweetCompose.prototype.submit = function (event) {
  event.preventDefault();
  const $inputs = this.$el.find(":input");

  // let result = {};
  // $inputs.each( (index, input) => {
  //   result[$(input).attr("name")] = $(input).val();
  // });

  let params = $inputs.serializeJSON();
  $inputs.prop("disabled", true);

  let self = this;

  $.ajax({
    type: "POST",
    url: "/tweets/",
    dataType: 'json',
    data: params,
    success(resp){
      console.log(resp);
      console.log(JSON.stringify(resp));
      self.handleSuccess(resp);
    }
  });
  // ajax request
    // => handle success
      // => clear input
};

TweetCompose.prototype.handleSuccess = function (resp) {
  let selector = this.$el.data("tweets-ul");

  let linkToUser = `<a href="/users/${resp['user_id']}">${resp['user']['username']}</a>`;
  let body = `${resp['content']} -- ${linkToUser} -- ${resp['created_at']}`;
  let $newTweet = $(`<li>${body}</li>`);

  $(`${selector}`).prepend($newTweet);
  this.clearInput();
};
// insert tweet into the list of tweets



TweetCompose.prototype.clearInput = function () {
  let $inputs = this.$el.find(":input");
  this.$el.trigger("reset");
  $inputs.prop("disabled", false);
};
// re-enable form.


module.exports = TweetCompose;
