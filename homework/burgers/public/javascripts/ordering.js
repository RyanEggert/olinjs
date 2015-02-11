var $orderprice = $(".orderprice");
var $orderbutton = $("button#orderbutton");

var onOrder = function(data, status) {
  // clear checkboxes
  $("input[type=checkbox]").prop('checked', false);
  // remove checkboxes & labels
  $("div.form-group").hide();
  //replace with confirmation message
  $("div.ordermain").html("<h2><a href='/order'>Order Confirmed!</a><\h2>");
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

// sum and update the order price when checkbox is (un)checked
$("input[type=checkbox]").on("click", function(event) {
  $orderprice.html(function() {
    var cusum = 0;
    $("input:checked").each(function(index) {
      cusum += Number($(this).val());
    });
    return cusum.toFixed(2);
  });

});

// send items and price to server
$orderbutton.on("click", function(event) {
  event.preventDefault();
  var sendprice = $orderprice.html(); // price of order
  var items = $("input:checked").serialize();
  $.post("placeOrder", {
      items: items,
      price: sendprice, // We do not currently use the price on the server. Maybe in the future. Could be used for validation?
    })
    .done(onOrder)
    .error(onError);
});

$("input.quant0").attr("disabled", true); // disable boxes of out-of-stock ingredients
