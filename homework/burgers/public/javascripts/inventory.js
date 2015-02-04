var $addnewf = $("#addnewitemform");
var $addbtn = $("#addnewbtn");
var $npricein = $("#npricein");
var $nnamein = $("#nnamein");
var $nquanin = $("#nquanin");
var counter = $(".badge")
var onSuccess = function(data, status) {
  console.log(data)
  var $newitemhtml = "<div class='form-group'><label class='col-md-4 control-label' for='appendedtext'>" + data.name+ "</label><div class='col-md-4' id='inventorylist'><div class='input-group'><input id='quantity' class='form-control' placeholder="+ data.quantity +" type='text'><span class='input-group-btn'><button class='btn btn-default' type='button'>Update Quantity</button></span><input id='appendedtext' class='form-control' placeholder=$"+ data.price + " type='text'><span class='input-group-btn'><button class='btn btn-default' type='button'>Update Price</button></span></div><p class='help-block'><button class='textbutton'>Out of Stock?</button></p></div></div>"
  $($addnewf).prepend($newitemhtml);
  $(counter).html(parseInt(counter.html()) + 1);
  // var img = "<img src='"+data+"'/>";
  // $("#result").html(img);
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$addbtn.click(function(event) {
  event.preventDefault();
  var newname = $nnamein.val()
  var newprice = $npricein.val()
  var newquan = $nquanin.val()
  $.post("newItem", {
    name: newname,
    price: newprice,
    quantity:newquan
  })
    .done(onSuccess)
    .error(onError);
});


