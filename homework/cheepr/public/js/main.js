$(window).scroll(function() {
  if ($(window).scrollTop() >= 1) {
    $('nav').addClass('fixed-header');
  } else {
    $('nav').removeClass('fixed-header');
  }
});

var shownewtweet = function(data, status) {};
$newcheepin = $('form#newcheep');

var currentuser = $('div.newcheep').attr("user");

if (currentuser === "") {
  $newcheepin.hide();
}

$newcheepin.submit(function(event) {
  event.preventDefault();
  cheep = $newcheepin.find('#in_cheep').val();
  $.post('/cheep/new/', {
    'username':currentuser,
    'words':cheep
  }).done(shownewtweet).error(onError);
});
