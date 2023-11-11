/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const renderTweets = function () {
  // loops through tweets
  $.get("http://localhost:8080/tweets").done(function (response) {
    const tweets = response;
    for (tweet of tweets) {
      let $tweet = createTweetElement(tweet);
      $("section.new-tweet").after($tweet);
    }
  });
};

const createTweetElement = (tweet) => {
  return `<article>
          <div class="header">
            <div>
              <img src="/images/profile-hex.png" />
              <span>${tweet.user.name}</span>
            </div>
            <div>
              <span>${tweet.user.handle}</span>
            </div>
          </div>
          <output>${tweet.content.text}</output>
          <hr />
          <footer>
            <div>${timeago.format(tweet.created_at)}</div>
            <div>
              <a href="#"><i class="fa-solid fa-flag"></i></a>
              <a href="#"><i class="fas fa-retweet"></i></a>
              <a href="#"><i class="fa-solid fa-heart"></i></a>
            </div>
          </footer>
        </article>`;
};

const handleSubmit = () => {
  $("#form-tweet").on("submit", function (e) {
    e.preventDefault();
    var text = $("#tweet-text").val();

    if (text === "" || text === null) {
      alert("Please enter a tweet");
      return;
    }

    if (text.length > 140) {
      $(".error").show();
      $(".message").text("Too long. Plz rspct our limit of 140 chars.");
      return;
    }
    $.post({
      url: "http://localhost:8080/tweets",
      data: $(this).serialize(),
    })
      .done(function () {
        $("#tweet-text").val("");
        $(".counter").val("140");
        renderTweets();
      })
      .fail(function (error) {
        alert(`ERROR: ${error}`);
      });
  });
};

$(document).ready(function () {
  $(".error").hide();
  renderTweets();
  handleSubmit();

  $("#nav-right").click(function () {
    $(".new-tweet").toggle();
    $("#tweet-text").focus();
  });

  $(window).on("scroll", function () {
    if ($(window).scrollTop() === 0) {
      $("#button-fix").hide();
      $("nav").show();
      $("header").show();
    } else {
      $("#button-fix").show();
      $("nav").hide();
      $("header").hide();
    }
  });

  $("#button-fix").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $("nav").show();
    $("header").show();
    $(".new-tweet").show();
    $("#tweet-text").focus();
  });
});
