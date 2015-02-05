var $orderprice = $(".orderprice");
var $orderbutton = $("button#orderbutton");

$("input#0").attr("disabled", true);
var onOrder = function(data, status) {
    // clear checkboxes
    $("input[type=checkbox]").prop('checked', false);
    // remove checkboxes & labels
    $("div.form-group").hide();
    //replace with confirmation
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

//decrement server quantities by one
$(orderbutton).on("click", function(event) {
    event.preventDefault();
    var sendprice = $orderprice.html(); // price of order
    var items = $("input:checked").serialize();
    console.log(items);
    $.post("placeOrder", {
            items: items,
            price: sendprice,
        })
        .done(onOrder)
        .error(onError);
});
//remove all boxes
//addmessage
