var $addnewf = $("#addnewitemform");
var $addbtn = $("#addnewbtn");
var $npricein = $("#npricein");
var $nnamein = $("#nnamein");
var $nquanin = $("#nquanin");
var counter = $(".badge");

var $updatebuttons = $("button.price, button.quantity");
var $outofstockbuttons = $("button.textbutton");


var onNewSuccess = function(data, status) {
  // add new item to list on page with HTML
  var $newitemhtml = "<div class='form-group'><label class='col-md-4 control-label' for='appendedtext'>" + data.name + " </label><div class='col-md-4' id='inventorylist'><div class='input-group'> <input id=" + data.id + "  class='form-control quantity' placeholder=" + data.quantity + "  type='text'> <span class='input-group-btn'><button class='btn btn-default quantity' id=" + data.id + " disabled type='button'>Update Quantity</button></span> <input id=" + data.id + "  class='form-control price' placeholder=$" + data.price + "  type='text'> <span class='input-group-btn'><button class='btn btn-default price' id=" + data.id + " disabled type='button'>Update Price</button></span> </div> <p class='help-block'><button id=" + data.id + " disabled class='textbutton'>Out of Stock?</button></p> </div> </div>";
  $($addnewf).prepend($newitemhtml);
  // increment indicator badge in top left corner
  $(counter).html(parseInt(counter.html()) + 1);
  $(npricein).val("");
  $(nquanin).val("");
  $(nnamein).val("");
};

var onUpdateSuccess = function(data, status) {
  // Set default value of box
  var findvar = "input#" + data.item + ".form-control." + data.tochange;
  $(findvar).val('');
  if (data.tochange === 'quantity') {
    $(findvar).attr('placeholder', data.newval);
  } else{
    $(findvar).attr('placeholder', '$'+ data.newval);
  }

 };

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

// Add new product
$addbtn.click(function(event) {
  event.preventDefault();
  var newname = $nnamein.val();
  var newprice = $npricein.val();
  var newquan = $nquanin.val();
  $.post("newItem", {
      name: newname,
      price: newprice,
      quantity: newquan
    })
    .done(onNewSuccess)
    .error(onError);
});

// Update price or quantity
$updatebuttons.click(function(event) {
  event.preventDefault();
  itemid = $(this).attr('id'); //get item id to update price/quantity for
  var updateatr;
  if ($(this).hasClass("quantity")) { // figure out whether to update the price or the quantity.
    updateatr = "quantity";
  } else {
    updateatr = "price";
  }

  // jQuery data find format --> $("input#<itemid>.form-control.<updateatr>")
  var findvar = "input#" + itemid + ".form-control." + updateatr;
  var newdata = $(findvar).val();
  console.log(newdata);
  if (newdata.length !== 0) {
    $.post("updateItem", {
        item: itemid,
        tochange: updateatr,
        newval: newdata
      })
      .done(onUpdateSuccess)
      .error(onError);
  }

});

//deal with out of stock buttons in a very similar manner to update buttons
$outofstockbuttons.click(function(event) {
  event.preventDefault();
  itemid = $(this).attr('id'); //get item id to update price/quantity for
    $.post("updateItem", {
        item: itemid,
        tochange: 'quantity',
        newval: 0
      })
      .done(onUpdateSuccess)
      .error(onError);
});
