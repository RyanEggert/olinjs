$(window).scroll(function() {
  if ($(window).scrollTop() >= 1) {
    $('nav').addClass('fixed-header');
  } else {
    $('nav').removeClass('fixed-header');
  }
});

var shownewtweet = function(data, status) {
  $('div.newcheep').after(data);
  $newcheepin.find('#in_cheep').val('');
};

var onError = function(data, status) {
  console.err(data);
};

$newcheepin = $('form#newcheep');

var currentuser = $('div.newcheep').attr("user");

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
