$(window).scroll(function() {
  if ($(window).scrollTop() >= 1) {
    $('nav').addClass('fixed-header');
  } else {
    $('nav').removeClass('fixed-header');
  }
});

//Variables
var $deletebuttons = $("button.delete");
$newcheepin = $('form#newcheep');
var currentuser = $('div.newcheep').attr("user");
if (currentuser === "") {currentuser = "None";}
console.log(currentuser);
//Event Callback Funtions
var shownewtweet = function(data, status) {
  $('div.newcheep').after(data);
  $newcheepin.find('#in_cheep').val('');
  yourdeletebuttons(currentuser);
};

var hideoldtweet = function(data, status) {
  $('div.cheep#'+String(data._id)).hide(1000);
};


var onError = function(data, status) {
  console.error(data);
};


var deletehandler = function(event) {
  event.preventDefault();
  orderid = $(this).attr('id'); //get order id to cancel
  $.ajax("/cheep/delete/", {
      type: "DELETE",
      data: {
        orderid: orderid
      }
    })
    .done(hideoldtweet)
    .error(onError);
};

var highlightcheeps = function(event) {
  event.preventDefault();
  // unhighlight other users
  $("div#users div").css('background-color', 'transparent');
  // highlight clicked user
  $(this).css('background-color', 'yellow');
  // unhighlight all cheeps
  $("div.cheep").css('background-color', 'rgb(130, 150, 200)');
  $("div.cheep[user="+$(this).attr('user')+"]").css('background-color', 'yellow');
};

// Page Functions
if (currentuser === "") {
  $newcheepin.hide();
}

$newcheepin.submit(function(event) {
  event.preventDefault();
  cheep = $newcheepin.find('#in_cheep').val();
  $.post('/cheep/new/', {
    'username': currentuser,
    'words': cheep
  }).done(shownewtweet).error(onError);
});

$("div#feed").on("click", "button.delete", deletehandler);

$("div#users").on("click", "div.usernamedisp", highlightcheeps);

// User Functions

// hide delete buttons
var yourdeletebuttons = function(username) {
  var searchstring = "button.delete:not([user=" + username +"])";
  $(searchstring).hide();
};

// hide cheep entry
var canyoucheep = function(username) {
  if (currentuser === "None") {
    $("div.newcheep").remove();
  }
};


yourdeletebuttons(currentuser);
canyoucheep(currentuser);
