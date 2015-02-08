var $ordertitles = $("span.orderindex");
var $completedbuttons = $("button.cancelbut");

var onCompletedSuccess = function (data, status) {
  // Remove order
  var findvar = "div#" + data.orderid;
  $(findvar).hide();
};

var onError = function (data, status) {
  console.log("status", status);
  console.log("error", data);
};

// increment order indices
$ordertitles.each(function (index) {
  $(this).html(Number($(this).html()) + 1);
});

// completed order

$completedbuttons.click(function (event) {
  event.preventDefault();
  orderid = $(this).attr('id'); //get order id to cancel
  $.post("completedOrder", {
      orderid: orderid
    })
    .done(onCompletedSuccess)
    .error(onError);
});
