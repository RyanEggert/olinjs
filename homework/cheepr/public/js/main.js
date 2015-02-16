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


//Event Callback Funtions
var shownewtweet = function(data, status) {
  $('div.newcheep').after(data);
  $newcheepin.find('#in_cheep').val('');
};

var hideoldtweet = function(data, status) {
  $('div.cheep#'+String(data._id)).hide(1000);
};


var onError = function(data, status) {
  console.error(data);
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

$deletebuttons.click(function(event) {
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
});

// User Functions

// hide delete buttons
var yourdeletebuttons = function(username) {
  var searchstring = "button.delete:not([user=" + username +"])";
  $(searchstring).hide();
};

yourdeletebuttons(currentuser);
