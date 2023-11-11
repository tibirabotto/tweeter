$(document).ready(function () {
  $("#tweet-text").on("keydown", function () {
    let inputString = $("#tweet-text").val();
    let lenString = inputString.length;
    let char = 140 - lenString;
    $(".counter").val(char);
    if (char < 0) {
      $(".counter").css("color", "red");
    } else {
      $(".counter").css("color", "#545149");
      $(".error").hide();
      $(".message").text("");
    }
  });
});
