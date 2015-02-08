var $addnewf = $("#addnewitemform");
var $addbtn = $("#addnewbtn");
var $npricein = $("#npricein");
var $nnamein = $("#nnamein");
var $nquanin = $("#nquanin");
var counter = $(".badge");
var $updatebuttons = $("button.price, button.name, button.quantity");
var $outofstockbuttons = $("button.textbutton");

var outofstockcolor = function () {
  // Colors quantity inputs of out of stock items light red.
  $("input.quantity[placeholder=0]").css('background-color', '#FFADAD');
  // Check for items which are no longer out of stock
  $("input.quantity:not([placeholder=0])").css('background-color', '#FFF');
};
var onNewSuccess = function (data, status) {
  // add new item to list on page with HTML
  //could I have returned a server-filled-in handlebars partial?
  var $newitemhtml =
    "<div class='form-group'> <div class='col-md-3'></div> <div class='col-md-6' id='inventorylist'> <div class='input-group'> <input id='" +
    data.id + "'  class='form-control name' disabled placeholder='" + data.name +
    "'  type='text'> <span class='input-group-btn'><button class='btn btn-default name' disabled id='" +
    data.id + "'  type='button'>Update Name</button></span> <input id='" +
    data.id + "'  class='form-control price' disabled placeholder='$" + data.price +
    "'  type='text'> <span class='input-group-btn'><button class='btn btn-default price' disabled id='" +
    data.id + "'  type='button'>Update Price</button></span> <input id='" +
    data.id + "'  class='form-control quantity' disabled placeholder='" +
    data.quantity +
    "'  type='text'> <span class='input-group-btn'><button class='btn btn-default quantity' disabled id='" +
    data.id +
    "'  type='button'>Update Quantity</button></span> </div> <p class='help-block'><button id='" +
    data.id +
    "'  class='textbutton' disabled>Out of Stock?</button></p> </div> </div>";
  $($addnewf).prepend($newitemhtml);
  // increment indicator badge in top left corner
  $(counter).html(parseInt(counter.html()) + 1);
  // clear input boxes
  $(npricein).val("");
  $(nquanin).val("");
  $(nnamein).val("");
  // recolor box if out-of-stock
  outofstockcolor();
};
var onUpdateSuccess = function (data, status) {
  // After updating name or price or listing as out-of stock, run this fxn.
  var findvar = "input#" + data.item + ".form-control." + data.tochange;
  $(findvar).val('');
  if (data.tochange === ('price')) {
    $(findvar).attr('placeholder', '$' + data.newval); // Prices need prepended $-signs
  } else {
    $(findvar).attr('placeholder', data.newval); // Names and quantities don't need prepended characters
  }
  outofstockcolor();
};
var onOutofStock = function (data, status) {
  // After updating name or price or listing as out-of stock, run this fxn.
  var findvar = "input#" + data.item + ".form-control." + data.tochange;
  $(findvar).val('');
  if (data.tochange === 'name') {
    $(findvar).attr('placeholder', data.newval); // Names don't need prepended characters
  } else {
    $(findvar).attr('placeholder', '$' + data.newval); // Prices need prepended $-signs
  }
  outofstockcolor();
};
var onError = function (data, status) {
  console.log("status", status);
  console.log("error", data);
};
// Add new product
$addbtn.click(function (event) {
  event.preventDefault();
  var newname = $nnamein.val();
  var newprice = $npricein.val();
  var newquan = $nquanin.val();
  $.post("newItem", {
    name: newname,
    price: Number(newprice).toFixed(2), // Prices should have two decimal points
    quantity: Number(newquan).toFixed(0) // Quantities should be whole numbers
  }).done(onNewSuccess).error(onError);
});
// Update price or quantity
$("button.price, button.name, button.quantity").click(function (event) {
  event.preventDefault();
  itemid = $(this).attr('id'); //get item id to update price/quantity for
  var updateatr;
  if ($(this).hasClass("name")) { // figure out whether to update the name, price, or the quantity.
    updateatr = "name";
  } else if ($(this).hasClass("price")) {
    updateatr = "price";
  } else {
    updateatr = "quantity";
  }
  // jQuery data find format --> $("input#<itemid>.form-control.<updateatr>")
  var findvar = "input#" + itemid + ".form-control." + updateatr;
  var newdata = $(findvar).val();
  if (newdata.length !== 0) {
    $.post("updateItem", {
      item: itemid,
      tochange: updateatr,
      newval: newdata
    }).done(onUpdateSuccess).error(onError);
  }
});
//deal with out of stock buttons in a very similar manner to update buttons
$outofstockbuttons.click(function (event) {
  event.preventDefault();
  itemid = $(this).attr('id'); //get item id to update price/quantity for
  $.post("updateItem", {
    item: itemid,
    tochange: 'quantity',
    newval: 0
  }).done(onOutofStock).error(onError);
});

// on page load, color out of stock items
outofstockcolor();
