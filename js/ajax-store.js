var cartheader;
var cartitems;
var colors = [];
//var country;
//var countrylines;
var employee;
var fields;
var filters = {};
var functiontype = [];
var hideCC = true;
var lines;
var metalcolors = [];
var newNumberOfOrders;
var numberOfOrders;
var orderAmt;
var session_no;
var shippingAddresses = [];
var stock_no;
var UpdatedShoppingCart = {};
var username;
var specials_subtotal_array;
var specials_subtotal;
var real_total;



/////////////////////////////////////////
        // create new customer //
/////////////////////////////////////////
function createCustomer()
{
  var createcompanyname = $("#create-companyname").val();
  var createcontactname = $("#create-contactname").val();
  var createaddress     = $("#create-address").val();
  var createaddress2    = $("#create-address2").val();
  var createaddress3    = $("#create-address3").val();
  var createcity        = $("#create-city").val();
  var createstate       = $("#create-state").val();
  var createzipcode     = $("#create-zipcode").val();
  var createcountry     = $("#create-country").val();
  var createemail       = $("#create-email").val();
  var createphone       = $("#create-phone").val();
  var createfax         = $("#create-fax").val();

  $.ajax({
   type: "GET",
   url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APINEWCUST",
     cust_name: createcompanyname,
     address1: createaddress,
     address2: createaddress2,
     address3: createaddress3,
     city: createcity,
     state: createstate,
     zip: createzipcode,
     contact_name: createcontactname,
     phone: createphone,
     email: createemail,
     fax: createfax,
     country: createcountry,
     loc_no: 800
   },
   success: function(response) {
     if (response.length <= 10) {
       alert("An errror occured, try again.");
     } else {
       var newCustomerNumber = response;
       $("#newCustomer").hide();
       $("#newUser").show();
       document.getElementById("create-user-number").value = newCustomerNumber.trim();
       document.getElementById("create-user-email").value = createemail.trim();
       document.getElementById("create-user-contactname").value = createcompanyname.trim();
     }
   }
 });
}



/////////////////////////////////////////
//////////// Create New User ////////////
/////////////////////////////////////////
function createUser()
{
  var newUserName     = $("#create-user-name").val();
  var userPassword    = $("#create-user-password").val();
  var userNumber      = $("#create-user-number").val();
  var userEmail       = $("#create-user-email").val();
  var userContactName = $("#create-user-contactname").val();

  $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICHECKUSER&session_no=2UD24M4BDN2D4RDAWABU9D254&username="+ newUserName.toUpperCase() +"", function( data ) {
    if ( data.length > 4 ) {
      alert("Pick a different username.");
    } else {
      $.ajax({
       type: "GET",
       url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
       data: {
         request_id: "APINEWUSER",
         new_username: newUserName,
         new_password: userPassword,
         cust_no: userNumber,
         contact_name: userContactName,
         email: userEmail,
         loc_no: 800,
         price_level: 1, 
         terms_code: "H",
         cust_type: "LJ"
       },
       success: function(response) {
         if ( response === response.toUpperCase() ) {
           alert("Laura Janelle user has been created. Double check SouthWare and make sure everything was entered correctly.");
           $.get("https://netlink.laurajanelle.com:444/mailer/logincred.php?username="+ newUserName +"&email="+ userEmail +"&password="+ userPassword +"&name="+userContactName+"");
         } else {
           alert("User not created, try again.");
         }
       }
     });
   }
  });
}



////////////////////////////////////////
/// LOGIN INTO THE STORE AND VERIFY  ///
////////////////////////////////////////
function login()
{
  if ( localStorage.getItem('session_no') && typeof(localStorage.getItem('session_no')) === "string" && localStorage.getItem('session_no').length === 25 ) {   
    windowHash("shop");
    redirect("store");
  }

  var password;
  var $loading = $('#loadingDiv').hide();

  $(document).ajaxStart(function () {
    $loading.show();
  }).ajaxStop(function () {
    $loading.hide();
  });

  $(".page-section").hide();
  $("#login-form").on("submit", function(e) {

     e.preventDefault();
     username = $('#login-form-username').val();
     password = $('#login-form-password').val();

     $.ajax({
      type: "GET",
      url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
      data: {request_id: "APICLOGIN",
             username: username,
             password: password,
             loc_no: "800"},
      success: function(response) {
        if (response.replace(/\s+/g,'').length === 25) {
          $.get("https://www.laurajanelle.com/phphelper/savecart/session.php?customer=" + username.toLowerCase() + "", function(answer){
            if (answer === "0") {
              $.get("https://www.laurajanelle.com/phphelper/savecart/session.php?customer=" + username.toLowerCase() + "&sessid=" + response + "");
              session_no = response.replace(/\s+/g,'');
              localStorage.setItem('session_no', session_no);
            } else {
              localStorage.setItem('session_no', answer);
            }
            localStorage.setItem('username', username);
          }).done(function() {
            
            windowHash("shop");
            redirect("store");
            
          });
        } else {
          alert("Login credentials are incorrect, try again.");
        }
        
      }
    });
  });
}



///////////////////////////////////////
/// FIND IF THEY ARE A NEW CUSTOMER ///
///////////////////////////////////////
function newCustomerSession()
{
  if (!localStorage.getItem('newCustomer')) {
    $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APIHISTLST&session_no=" + session_no + "", function( data ) {
      invoiceLines = data.split("\n");
      if (invoiceLines.length >= 3) {
        localStorage.setItem('newCustomer', "false");
      } else {
        $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APIORDLST&session_no=" + session_no + "", function( ordData ) {
          openOrderLines = ordData.split("\n");
          if ( openOrderLines.length <= 2) {
            localStorage.setItem('newCustomer', "true");
          } else {
            localStorage.setItem('newCustomer', "false");
          }
        });
      }
    });
  }

  username = localStorage.getItem('username').toUpperCase();

  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIACCTINFO",
      user: username},
    success: function(response) {

      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
     
      for (i=0; i<lines.length - 1; i++) {
        details = lines[i].split("|");
        localStorage.setItem('cust_no', details[1]);
        localStorage.setItem('cust_name', details[2]);
        localStorage.setItem('email_addr', details[3]);
      }
    }
  });
}



////////////////////////////////////////
/// SUBROUTINE- Add item to the cart ///
////////////////////////////////////////
function addItemGeneric(session_no, stock_no, qty)
{
  $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICARTADD&session_no="+ session_no +"&stock_no="+ stock_no +"&qty="+qty+"");
}


//////////////////////////////////////////////
// Add item to the cart for the detail page //
//////////////////////////////////////////////
function addItemDetailView2()
{
  var detailViewQty;
  var realid = stock_no+"-dtview";
  console.log(realid);
  if (document.getElementById(realid)) {
    detailViewQty = document.getElementById(realid).value;
  } else {
    detailViewQty = "1";
  }

  addItemGeneric(session_no, stock_no, detailViewQty);
  if ( window.location.hash !== "#shop" ) {
    windowHash("cart");
  }
  return false;
}



/////////////////////////////////////////
// SUBROUTINE - REMOVE ITEMS FROM CART //
/////////////////////////////////////////
function removeItemGeneric(session_no, line_no)
{
  $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICARTREM&session_no="+ session_no +"&line_no="+ line_no +"");

}
//////////////////////////////////
  // REMOVE ITEMS FROM CART //
//////////////////////////////////
function removeItem(clicked_id)
{
  line_no = clicked_id;
  removeItemGeneric(session_no, line_no);
  shopPage();
  return false;
}



///////////////////////
// 10% off Coupon //
///////////////////////
$('#coupon1, #coupon2').keypress(function(e){
  if(e.which == 13 ) {
    e.preventDefault();
    couponCode();
  }
});

function couponCode()
{
  if (localStorage.getItem('couponUsed') !== "true") {
    if ($('#coupon1').val().toUpperCase() === "SPRINGFLING2018" || $('#coupon2').val().toUpperCase() === "SPRINGFLING2018" ) {
      localStorage.setItem('couponUsed', "true");
      addItemGeneric(session_no, "SPRINGFLING2018", "1");
      shopPage();
    }
  } else {
    return false;
  }
}

function calculateDiscount()
{
  var discount_amt;
  real_total = parseFloat(real_total);
  var fake_total =  real_total - specials_subtotal;
  console.log(fake_total.toFixed(2) + " fake total");
  discount_amt = 0 - (fake_total * 0.1);
  discount_amt = discount_amt.toFixed(2);
  console.log( discount_amt + " full total");
  $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICARTUPD&session_no=" + session_no + "&misc_code1=CO&misc_amt1=" + discount_amt + "");
}
//////////////////////////////
// Get back the cart header //
//////////////////////////////
function cartHeader(callback)
{
  jQuery.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTH",
      session_no: session_no
    },
    success: function(response) {
      cartheader = response.split("\n");
      console.log(response);
      if (cartheader.length >=3 ){
        cartHeaderFields = cartheader[1].split("|");
        document.getElementById("top-cart-trigger").innerHTML += '<span>' + cartHeaderFields[24].trim() + '</span>';

        if ( window.location.hash === "#cart" || window.location.hash === "#checkout") {
          $(".cart-product-name.subtotal").html( '<span class="amount">' + cartHeaderFields[19].trim() + '</span>' );
          $(".cart-product-name.total").html( '<span class="amount color lead"><strong>' + cartHeaderFields[22].trim() + '</strong></span>');
        }
        if (localStorage.getItem('couponUsed') === "true") {
          real_total = cartHeaderFields[19].trim();
          calculateDiscount();
        } else if (localStorage.getItem('couponUsed') === "false" || !localStorage.getItem('couponUsed')) {
          $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICARTUPD&session_no=" + session_no + "&misc_code1=&misc_amt1=0.00");
        }
      }
    },
    complete: function () {
      if (callback && typeof(callback) === "function") {
        callback();
      }
      cartList();
    }
  });
}



////////////////////
// Get Line items //
////////////////////
function cartList()
{
  jQuery.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTL",
      session_no: session_no
    },
    success: function(response) {
      cartitems = response.split("\n");

      jQuery("#minicart").empty();
      html2 = [];
      html = [];

      if ( window.location.hash === "#cart") {
        $(".cart_item.products").empty();
        cartHelper();
        $("#cartItemTable").prepend(html.join(''));
        $("#updateCartButton").show();

      } else if ( window.location.hash === "#checkout" ){
        jQuery("#checkout-cartItemTable").empty();
        cartHelper();
      } else {
        cartHelper();
      }
    }, 
    complete: function() {
      
    }
  });
  return false;
}

/////////////////////////////////////////////
// SUBROUTINE - CONSTRUCTING THE CART LIST //
/////////////////////////////////////////////
function cartHelper()
{
  if ( cartitems.length > 2 ) {
    for (i=1; i<cartitems.length - 1; i++) {
      data = cartitems[i].split("|");
      miniitem = '<div class="top-cart-item clearfix"><div class="top-cart-item-image"><a href="#"><img src="https://www.laurajanelle.com/ljjpgimages/' + data[2].replace(/\s+/g,'') + '-sm.jpg" alt="' + data[3] + '" /></a></div>';
      miniitem += '<div class="top-cart-item-desc"><a href="#">' + data[3] + '</a><span class="top-cart-item-price">$' + data[7].substring(0, data[7].length - 3) + '</span><span class="top-cart-item-quantity">x ' + data[6].replace(/\s+/g,'') + '</span></div></div>';
      html2.push(miniitem);

      if ( window.location.hash === "#cart" ) {
        if  (min2.indexOf(data[2].replace(/\s+/g,'')) != -1 ) {
          item = '<tr class="cart_item products"><td class="cart-product-remove"><a href="#cart" class="remove" onclick="removeItem(this.id); return false;" id="' + data[1].replace(/\s+/g,'') + '" title="Remove this item"><i class="icon-trash2"></i></a></td>';
          item += '<td class="cart-product-thumbnail"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="https://www.laurajanelle.com/ljjpgimages/' + data[2].replace(/\s+/g,'') + '-sm.jpg" alt="' + data[3] + '"></a></td>';
          item += '<td class="cart-product-name"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '">' + data[3] + '</a></td>';
          item += '<td class="cart-product-price"><span class="amount">$' + data[7].substring(0, data[7].length - 3) + '</span></td>';
          item += '<td class="cart-product-quantity"><div class="quantity clearfix">';
          item += '<input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant['+i+']" onclick="changeQuantity2(this);">';
          item += '<input type="text" name="quant['+i+']" min="2" value="' + data[6].replace(/\s+/g,'') + '" class="qty form-control input-number" id="' + data[2].replace(/\s+/g,'') + '" />';
          item += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant['+i+']" onclick="changeQuantity2(this);"></div></td>';
          item += '<td class="cart-product-subtotal"><span class="amount">$' + data[8].substring(0, data[8].length - 4) + '</span></td></tr>';
        } else {
          item = '<tr class="cart_item products"><td class="cart-product-remove"><a href="#cart" class="remove" onclick="removeItem(this.id); return false;" id="' + data[1].replace(/\s+/g,'') + '" title="Remove this item"><i class="icon-trash2"></i></a></td>';
          item += '<td class="cart-product-thumbnail"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="https://www.laurajanelle.com/ljjpgimages/' + data[2].replace(/\s+/g,'') + '-sm.jpg" alt="' + data[3] + '"></a></td>';
          item += '<td class="cart-product-name"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '">' + data[3] + '</a></td>';
          item += '<td class="cart-product-price"><span class="amount">$' + data[7].substring(0, data[7].length - 3) + '</span></td>';
          item += '<td class="cart-product-quantity"><div class="quantity clearfix">';
          item += '<input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant['+i+']" onclick="changeQuantity(this);">';
          item += '<input type="text" name="quant['+i+']" min="1" value="' + data[6].replace(/\s+/g,'') + '" class="qty form-control input-number" id="' + data[2].replace(/\s+/g,'') + '" />';
          item += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant['+i+']" onclick="changeQuantity(this);"></div></td>';
          item += '<td class="cart-product-subtotal"><span class="amount">$' + data[8].substring(0, data[8].length - 4) + '</span></td></tr>';
        }
        html.push(item);
        $("#updateCartButton").show();
      } else if ( window.location.hash === "#checkout" ) {
        item1 =  '<tr class="cart_item"><td class="cart-product-thumbnail"><a href=#detail-view+' + data[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="https://www.laurajanelle.com/ljjpgimages/' + data[2].replace(/\s+/g,'') + '-sm.jpg" alt="' + data[3] + '"></a></td>';
        item1 += '<td class="cart-product-name"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '">' + data[3] + '</a></td>';
        item1 += '<td class="cart-product-quantity"><div class="quantity clearfix">' + data[6].replace(/\s+/g,'') + '</div></td>';
        item1 += '<td class="cart-product-subtotal"><span class="amount">$' + data[8].substring(0, data[8].length - 4) + '</span></td></tr>';
        $("#checkout-cartItemTable").append(item1);
      }
      
      if (localStorage.getItem('couponUsed') === "true") {
        specials_subtotal_array = [];
        specials_subtotal = 0;
        if (special_item_numbers.indexOf(data[2].replace(/\s+/g,'')) !== -1){
        // var specialItem = data[2].replace(/\s+/g,'');
        // fake_subtotal_array[specialItem] = parseFloat(data[8].substring(0, data[8].length - 4).trim());
        specials_subtotal_array.push(parseFloat(data[8].substring(0, data[8].length - 4).trim()));
        specials_subtotal = specials_subtotal_array.reduce(getSum);
        }
      }
      if (data[2].replace(/\s+/g,'') === "SPRINGFLING2018" && (localStorage.getItem('couponUsed') !== "true" || !localStorage.getItem('couponUsed'))){
        $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICARTREM&session_no="+ session_no +"&line_no=" + data[1].replace(/\s+/g,'') + "");
      }
    }
  } else {
    item = '<tr class="cart_item products"><td class="cart-product-remove"><h1> Cart is empty</h1></td></tr>';
    html.push(item);
  }
  $("#minicart").append(html2.join(''));
}


function getSum(total, num) {
  return total + num;
}


/////////////////////////
// Search API Function //
/////////////////////////
function search(event)
{
  var oldhash;
  
  if(event.keyCode == 13) {
    event.preventDefault();
    if ( window.location.hash != "#search" ) {
      oldhash = window.location.hash;
    }
    var searchTerm = $('#searchvalue').val().split(' ').join('+');
    $.ajax({
      type: "GET",
      url: "https://netlink.laurajanelle.com:444/nlhelpers/laurajanelle-api/search.php?",
      data: {
        data: searchTerm
      },
      success: function(response) {
        $('#searchDiv').empty();
        
        windowHash("search");
        itemRender2("searchDiv", response);
        $("#searchDiv").prepend('<button style="display: block;" type="button" class="button button-3d button-mini button-rounded button-black" onclick="$(\'#searchDiv\').empty(); windowHash(\''+oldhash+'\');">Close Search</button>');
      },
      complete: function(){
        SEMICOLON.initialize.lightbox();
      }
    });
  }
}



//////////////////////////
//    Filter Function   //
//////////////////////////

function filterFunction(look)
{
  $.get("https://netlink.laurajanelle.com:444/nlhelpers/prima-api/productlist/lj/programs/look/"+ look + "/", function (response) {
    $("#shopItems, div[data-group='color'], div[data-group='type'], div[data-group='metal']").empty();
    itemRender2("shopItems", response);
  });
  SEMICOLON.initialize.lightbox();
}
function filterFunction3(a)
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhelpers/laurajanelle-api/functions.php?",
    data: {
      data: a,
      locaton: "800"
    },
    success: function(response) {
      $("#shopItems, div[data-group='color'], div[data-group='type'], div[data-group='metal']").empty();
      itemRender2("shopItems", response);
    },
    complete: function(){
      SEMICOLON.initialize.lightbox();
    }
  });
}
function filterFunction4()
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhelpers/prima-api/productlist/lj/onsale/",
    success: function(response) {
      $("#shopItems, div[data-group='color'], div[data-group='type'], div[data-group='metal']").empty();
      itemRender2("shopItems", response);
    },
    complete: function(){
      SEMICOLON.initialize.lightbox();
    }
  });
}
function filterFunction5()
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhelpers/prima-api/productlist/lj/",
    success: function(response) {
      $("#shopItems, div[data-group='color'], div[data-group='type'], div[data-group='metal']").empty();
      itemRender2("shopItems", response);
    },
    complete: function(){
      SEMICOLON.initialize.lightbox();
    }
  });
}
function filterFunction6()
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhelpers/prima-api/productlist/lj/featured/",
    success: function(response) {
      $("#shopItems, div[data-group='color'], div[data-group='type'], div[data-group='metal']").empty();
      itemRender2("shopItems", response);
    },
    complete: function(){
      SEMICOLON.initialize.lightbox();
    }
  });
}
function itemRender2(div,response)
{
  lines = response;
  console.log(lines);
  functiontype = [];
  colors = [];
  metalcolors = [];
  if ( Object.keys(lines) == "items" ) {
    document.getElementById(div).innerHTML += '<h1>There are no results</h1>';
  } else {
    html = [];
    result = [];
     /*
    for(var i in lines) result.push([i, lines [i]]);
    
    result.sort( function( a, b ) {
      retVal=0;
      if (sortItems2.indexOf(a[0][0].trim()) != sortItems2.indexOf( b[0][0].trim() )) retVal= sortItems2.indexOf( a[0][0].trim() ) > sortItems2.indexOf( b[0][0].trim() )?1:-1;
      return retVal;
    });
    
    Object.keys(lines).sort( function( a, b ) {
      retVal=0;
      if (sortItems2.indexOf(a) != sortItems2.indexOf( b)) retVal= sortItems2.indexOf( a ) > sortItems2.indexOf( b )?1:-1;
      return retVal;
    });
    */
    Object.keys(lines).forEach(function(k){
      // blocking out items
     // if ( banned.indexOf(lines[k].itemnum) === -1 ) {
      if ( lines[k].onsale === 'Y' && lines[k].onhand <= 0.000 ) {
        console.log("hidden");
      } else {

       // stringOfDetails = lines[k].itemnum;
        prod =  '<div class="product clearfix ' + lines[k].color.toLowerCase() +"omg "+ lines[k].func.toLowerCase() +" "+ lines[k].metalcolor.toLowerCase() +'"><div class="product-image"><a href="#detail-view+' + lines[k].itemnum + '"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/' + lines[k].itemnum + '-sm.jpg" alt="' + lines[k].shortdescription + '"></a>';
        if (lines[k].featured === 'Y') {
          prod += '<div class="sale-flash">NEW!</div>';
        }
        
        if (lines[k].onsale === 'Y') {
          prod += '<div class="sale-flash" style="background-color: #cc0000">SPECIAL!</div>';
        }
        if ( localStorage.getItem('browsing') != "looky-loo" ) {
          prod += '<div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + lines[k].itemnum + ' has been added to your cart!" onclick="stock_no=\'' + lines[k].itemnum + '\'; addItemDetailView2(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
          prod += '<a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'' + lines[k].itemnum + '\'; quickView(\'' + lines[k].itemnum + '\');"><i class="icon-zoom-in2"></i><span>Quick View</span></a></div>';
        }
          prod += '</div><div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+' + lines[k].itemnum + '">';
        if ( lines[k].shortdescription.length === 0 ) {
          prod +=  lines[k].itemnum +'</a></h3></div>';
        } else {
          prod +=  lines[k].shortdescription +'</a></h3></div>';
        }
        //prod += '<div class="product-price"> cost &nbsp;$' + lines[k].price + '</div></div></div>';
        if ( localStorage.getItem('browsing') != "looky-loo" ) {
          if ( lines[k].onsale === "Y") {
            prod += '<div class="product-price">cost &nbsp;<span class="cross" style="color:gray">' + specPrice[lines[k].itemnum] + '</span> <ins style="font-size: 17px; line-height: 1px;">&nbsp; $' + lines[k].price + '</ins></div>';
          } else  {
            prod += '<div class="product-price"> cost &nbsp;$' + lines[k].price + '</div>';
          }
        }
        prod += '</div></div>';
        
        html.unshift(prod);
        listOfAttributes(functiontype, lines[k].func.toLowerCase());
        listOfAttributes(metalcolors, lines[k].metalcolor.toLowerCase());
        listOfAttributes(colors, lines[k].color.toLowerCase());
      }
   // }
    } );
    document.getElementById(div).innerHTML += html.join('');
    fillTypeField();
  } 
}


function listOfAttributes(attr, field)
{
  if ( attr.indexOf(field) == -1 ) {
    attr.push(field);
  }
}
function fillTypeField() 
{
  counter = 0;
  functiontype.forEach(function (element) {
    if ( element !== "" ) {
      $("div[data-group='type']").append('<div><input id="checkbox-'+ counter +'" class="checkbox-style" type="checkbox" value=".' + element + '" ><label for="checkbox-'+ counter +'" class="checkbox-style-1-label">' + element + '</label></div>');
      counter++;
    }
  });
  metalcolors.forEach(function (element) {
    if ( element !== "" ) {
      $("div[data-group='metal']").append('<div><input id="checkbox-'+ counter +'" class="checkbox-style" type="checkbox" value=".' + element + '"><label for="checkbox-'+ counter +'"  class="checkbox-style-1-label">' + element + '</label></div>');
      counter++;
    }
  });
  colors.forEach(function (element) {
    if ( element !== "" ) {
      $("div[data-group='color']").append('<div><input id="checkbox-'+ counter +'" class="checkbox-style" type="checkbox" value=".' + element + 'omg"><label for="checkbox-'+ counter +'" class="checkbox-style-1-label">' + element + '</label></div>');
      counter++;
    }
  });
}



/////////////////////////////////////////////
// Get Information for the Item Quick View //
/////////////////////////////////////////////
function quickView(clicked_id)
{
  var secondColumnQuick;
  jQuery.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {request_id: "APISTKDTL", stock_no: stock_no, session_no: session_no},
    success: function(response) {
      lines  = response.split("\n");
      fields = lines[1].split("|");

      var prodtype = fields[1].split(/(\s+)/);
					prodtype = prodtype[2];

			document.getElementById("quickViewimages").innerHTML = '<div class="slide" style="display: block;"><a href="#shop"><img src="https://www.laurajanelle.com/ljjpgimages/' + stock_no + '-md.jpg" alt="' + fields[1] + '"></a></div>';
     //brand logo
     // jQuery( "#secondColumn").prepend('<div><a href="#shop" title="Brand Logo" class="hidden-xs"><img class="image_fade" src="https://www.laurajanelle.com/img/logos/'+ fields[2] +'-logo.png" alt="Brand Logo"></a></div><div><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;"><br><br>ITEM # <span class="sku">' + stock_no + '</span></span></div><div class="line"></div><div class="product-price col_half" style="font-size: 16px; font-weight: 400;">COST:&nbsp;' + fields[4] + '</div>');
      jQuery( "#secondColumn").prepend('<div><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;"><br><br>ITEM # <span class="sku">' + stock_no + '</span></span></div><div class="line"></div><div class="product-price col_half" style="font-size: 16px; font-weight: 400;">COST:&nbsp;' + fields[4] + '</div>');
      
      jQuery( ".minus" ).after( '<input type="text" name="quant[1]" step="1" min="1" name="quantity" value="1" title="Qty" size="4" class="qty form-control input-number" id="' + stock_no + '" />' );
      if (fields[8].length !== 0)  {
         secondColumnQuick = '<p>' + fields[8] + '</p>';
      } else {
         secondColumnQuick = '<p>' + fields[1] + '</p>';
      }
      $("#quickViewForm").append('<button type="button" id="add-item" class="add-to-cart button nomargin" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>The item(s) have been added to your cart!" onclick="addItemDetailView(); SEMICOLON.widget.notifications(this); shopPage(); return false;">Add to cart</button>');
      $("#description").append(secondColumnQuick);
    }
  });
}



//////////////////////////////
// Get Detail View for Item //
//////////////////////////////
function detailView2(callback, callback2) {
  jQuery("#images, #addInfo, #cost-field, #msrp-field, #item-description").empty();
  var formData;
  var secondImage;
  var hash = window.location.hash.split("+");
  var stock_no = hash[1];
  var productRating = [];
  url = "../ljjpgimages-2/" + stock_no + "-2-sm.jpg";
  $.get(url)
  .done(function () {
    secondImage = '<div class="slide" data-thumb="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-sm.jpg"><a href="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-lg.jpg" data-lightbox="gallery-item"><span class="zoom ex1"><img src="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-md.jpg"></span></a></div>';
    populateDetailView2(secondImage, callback, callback2, stock_no);
  }).fail(function () {
    // not exists code
    console.log("hey guys, there isn't a second image.");
    noSecondImage = '';
    populateDetailView2(noSecondImage, callback, callback2, stock_no);
  });
}

function populateDetailView2(secondImage, callback, callback2, stock_no) {
   var relateColor;
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhelpers/laurajanelle-api/detail-views.php?",
    data: {
      data: stock_no,
      location: 800
    },
    success: function (response) {
     
      Object.keys(response).forEach(function(k){
        $(".sku").text(response[k].itemnum);
        
        if ( localStorage.getItem('browsing') != "looky-loo" ) {
          if ( response[k].onsale === "Y" ) {
            $("#cost-field").html('COST:&nbsp; <span id="old-whole" class="cross"></span><ins style="font-size: 18px;">&nbsp;&nbsp;$' + response[k].price + '</ins>');
            
            $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APISTKDTL&stock_no=" + stock_no + "", function( saleData ) {
              
              lines  = saleData.split("\n");
              fields = lines[1].split("|");
            
              $('#old-whole').html(fields[2]);
              if (fields[8] && fields[8].length !== 0) {
                $("#item-description").html('<p>' + fields[8] + '</p>');
              }
            });
          } else {
            $("#cost-field").html('COST:&nbsp;$' + response[k].price);
          }

          if ( min2.indexOf(response[k].itemnum) != -1 ) {
            $(".min-1").empty();
            $(".min-1").text("Packs of 2!").css("color", "#cc0000");
          }

          if (min2.indexOf(response[k].itemnum) != -1 ) {
            formData =  '<div class="quantity clearfix"><input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant[1]" onclick="changeQuantity2(this)">';
            formData += '<input type="text" name="quant[1]" step="2" min="2" name="quantity" value="2" title="Qty" size="4" class="qty form-control input-number" id="' + response[k].itemnum + '-dtview" />';
            formData += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant[1]" onclick="changeQuantity2(this)"></div>';
            formData += '<button type="button" id="add-item" class="add-to-cart button-3d button button-small" onclick="stock_no=\'' + response[k].itemnum + '\'; addItemDetailView2();">Add to cart</button>';
            formData += '<a id="addReviewButton" href="#" data-toggle="modal" data-target="#reviewFormModal" class="add-to-cart button button-3d button-mini hidden-xs" onclick="populateReviewModal(); return false;">Add Review</a>';
          } else {
            formData =  '<div class="quantity clearfix"><input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant[1]" onclick="changeQuantity(this)">';
            formData += '<input type="text" name="quant[1]" step="1" min="1" name="quantity" value="1" title="Qty" size="4" class="qty form-control input-number" id="' + response[k].itemnum + '-dtview" />';
            formData += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant[1]" onclick="changeQuantity(this)"></div>';
            formData += '<button type="button" id="add-item" class="add-to-cart button-3d button button-small" onclick="stock_no=\'' + response[k].itemnum + '\'; addItemDetailView2();">Add to cart</button>';
            formData += '<a id="addReviewButton" href="#" data-toggle="modal" data-target="#reviewFormModal" class="add-to-cart button button-3d button-mini hidden-xs" onclick="populateReviewModal(); return false;">Add Review</a>';
          }
          $("#add-qty-form").html(formData);
        } else {
          $("#add-qty-form").html('<h2 style="font-family: Lato;">Log in to see pricing.</h2>');
        }

        if (response[k].msrp === ".00" || response[k].msrp === "0.00") {
          $("#msrp-field").hide();
          
        } else {
          $("#msrp-field").html('MSRP:&nbsp;$' + response[k].msrp);
          $("#msrp-field").show();
         
        }
      
        if (response[k].longdescription.length !== 0) {
          $("#item-description").html( '<p>' + response[k].longdescription + '</p>');
        } 

        
        $(".image_fade").attr({src: 'https://www.laurajanelle.com/img/logos/' + response[k].look.toUpperCase() + '-logo.png'});


        info2 = '<li><i class="icon-caret-right"></i>' + response[k].shortdescription + '</li>';

        if ( response[k].dimensions !== "" ) {
         info2 += '<li><i class="icon-caret-right"></i>The dimensions for this product are ' + response[k].dimensions + '</li>';
        }
        if ( response[k].color !== "" ) {
         info2 += '<li><i class="icon-caret-right"></i>' + response[k].color + ' is the color group.</li>';
        }
        if ( response[k].func !== "" ) {
          info2 += '<li><i class="icon-caret-right"></i>This item is categorized under ' + response[k].func.toLowerCase() + '</li>';
        }
        if ( response[k].look !== "" ) {
          info2 += '<li><i class="icon-caret-right"></i>' + response[k].look + ' is the collection it belongs to.</li>';
        }
        if ( response[k].metalcolor !== "" ) {
          info2 += '<li><i class="icon-caret-right"></i>The metal color is ' + response[k].metalcolor.toLowerCase() + '</li>';
        }
        if ( response[k].material !== "" ) {
          info2 += '<li><i class="icon-caret-right"></i>Some material(s) used to make this are ' + response[k].material.toLowerCase() + '</li>';
        }
        /* Fill in the pictures for the product */
        var pics = '<div class="fslider" data-pagi="false" data-arrows="false" data-thumbs="true"><div class="flexslider"><div class="slider-wrap" data-lightbox="gallery">';
        pics += '<div class="slide" data-thumb="https://www.laurajanelle.com/ljjpgimages/' + response[k].itemnum + '-sm.jpg"><a href="https://www.laurajanelle.com/ljjpgimages/' + response[k].itemnum + '-lg.jpg" title="' + response[k].shortdescription + '" data-lightbox="gallery-item"><span class="zoom ex1"><img src="https://www.laurajanelle.com/ljjpgimages/' + response[k].itemnum + '-md.jpg" alt="' + response[k].shortdescription + '"></span></a></div>';
        pics += secondImage;
        pics += '</div></div></div>';
        
        if (response[k].onsale === "Y") {
          pics += '<div class="sale-flash" style="background-color: #cc0000">SPECIAL!</div>';
        }
        if (response[k].featured === 'Y') {
          pics += '<div class="sale-flash">NEW!</div>';
        }
        
        $("#images").html(pics);
        
        $("#attribute-list").html(info2);
        relateColor = response[k].color;
      });

      relatedItems(relateColor);
      $("#oc-product").empty();
    },
    complete: function () {
      $('.ex1 img').wrap('<span style="display:inline-block"></span>').css('display', 'block').parent().zoom();
      setTimeout(function () {
        SEMICOLON.widget.loadFlexSlider();
      }, 500);

      if (callback && typeof (callback) === "function") {
        callback(stock_no);
      }
      if (callback2 && typeof (callback2) === "function") {
        callback2(stock_no);
      }
    }
  });
}



//////////////////////////////
  // Related Items //
//////////////////////////////
function relatedItems(color)
{
  var relate;
  $.get("https://netlink.laurajanelle.com:444/nlhelpers/laurajanelle-api/related.php?color="+ color +"&location=800", function ( items ) {

    Object.keys(items).forEach(function(i){
      relate =  '<div class="product clearfix"><div class="product-image"><a href="#detail-view+' + items[i].itemnum + '"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/' + items[i].itemnum + '-sm.jpg" alt="'+ items[i].shortdescription +'"></a>';
            
      if (items[i].onsale === "Y") {
        relate += '<div class="sale-flash" style="background-color: #cc0000">SPECIAL!</div>';
      }
      if (items[i].featured === 'Y') {
        relate += '<div class="sale-flash">NEW!</div>';
      }
    //  relate += '<div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + items[i].itemnum + ' has been added to your cart!" onclick="stock_no=\'' + items[i].itemnum + '\'; addItemDetailView2(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
    //  relate += '<a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'' + items[i].itemnum + '\'; quickView(\'' + items[i].itemnum + '\');"><i class="icon-zoom-in2"></i><span>Quick View</span></a></div></div>';
      relate += '<div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+' + items[i].itemnum + '">'+ items[i].shortdescription +'</a></h3></div>';

      if ( localStorage.getItem('browsing') != "looky-loo" ) {
        if ( items[i].onsale === "Y") {
          relate += '<div class="product-price">cost &nbsp;<span class="cross" style="color:gray">' + specPrice[items[i].itemnum] + '</span> <ins style="font-size: 17px; line-height: 1px;">&nbsp; $' + items[i].price + '</ins></div>';
        } else  {
          relate += '<div class="product-price divcenter"> cost &nbsp;$' + items[i].price + '</div>';
        }
      }

      relate += '</div></div>';

      $("#oc-product").append(relate);
    });
    owl = $("#oc-product");
    $('#oc-product').trigger('destroy.owl.carousel');
    owl.owlCarousel({
      items: 4,
      autoPlay: 1000,
      class: 'oc-item'
    });
  });
}




//////////////////////////////
  // Populate the Question //
//////////////////////////////
function populateQuestionModal()
{
  var cust_name = localStorage.getItem("cust_name").trim();
  var cust_no = localStorage.getItem("cust_no").trim();
  var email_addr = localStorage.getItem("email_addr").trim();
  var question = $('#questionField').val();
  var hash = window.location.hash.split("+");
  var stock_no = hash[1];
  var qLines;

  $("#myModalBody").empty();
 
  qLines =  '<p>Your question will be posted and answered between 24 and 72 hours.</p>';                
  qLines += '<p>The answer will be posted on the site and you will get a notification by email.</p><div id="q-contact" class="widget quick-contact-widget clearfix"><div class="quick-contact-form-result"></div>';
  qLines += '<form id="question-form" name="question-form" target="dummyframe" action="https://netlink.laurajanelle.com:444/nlhelpers/mailer/questionSubmitEmail.php" method="GET" class="quick-contact-form nobottommargin"><div class="form-process"></div>';
  qLines += '<input type="hidden" name="item" value="'+ stock_no +'" /><input type="hidden" name="customer" value="'+ cust_name +'" />';
  qLines += '<input type="hidden" name="customer_no" value="'+ cust_no +'" /><input type="hidden" name="loc_no" value="800" /><input type="hidden" name="email" value="'+ email_addr +'" />';                        
  qLines += '<input type="text" class="required sm-form-control input-block-level" id="questionEditField" name="question" value="'+ question +'" readonly="readonly" />';                         
  qLines += '<a class="button button-small button-dark button-rounded" onclick="$(\'#questionEditField\').removeAttr(\'readonly\');"></i>EDIT</a> | <a href="" class="button button-small button-dark button-rounded" data-dismiss="modal"></i>DELETE</a>';
  qLines += '<input type="text" class="hidden" id="quick-contact-form-botcheck" name="quick-contact-form-botcheck" value="" />';
  qLines += '<button type="submit" id="question-submit" name="question-submit" class="button button-small button-3d nomargin" value="submit" onclick="$(\'#fakeSubQuestion\').click();" style="float: right;">Send Email</button></form></div></div>';

  $("#myModalBody").html(qLines);
  $('#questionField').val("");
}

function getQuestions(stock_no) 
{ 
  jQuery(".questionSection").remove();
  questionhtml = [];
  $.get("https://netlink.laurajanelle.com:444/nlhelpers/mailer/questionSubmitEmail.php?item="+ stock_no +"&question&customer&customer_no&loc_no&email", function ( questdata ) {
    qdata = questdata.split("\n");
    if (qdata.length < 2) {
      custqLines =  '<p class="questionSection lead topmargin-sm">No questions have been submitted for this item.</>';
      $("#questionWidget").after(custqLines);
    } else {
      for (i=0; i<qdata.length - 1; i++) {
        datalines = qdata[i].split("|");
        datePre  = Date(datalines[3]).split(" ");
        datePost = datePre[1] + " "+ datePre[2].replace(/^[0]+/g,"")+ ", "+ datePre[3];
        custqLines =  '<div class="questionSection panel panel-default"><div class="panel-body"><strong>Q:&nbsp;</strong> '+ datalines[0] +'</div>';
        custqLines += '<div class="panel-footer"><strong>A:&nbsp;</strong> '+ datalines[1] +'<br><span class="label label-default"> By '+ datalines[5] +' on '+ datePost +'</span></div></div>';
        
        if (datalines[6] === "1") {
          questionhtml.unshift(custqLines);
        } else {
          questionhtml.push(custqLines);
        }   
      }
      $("#questionWidget").after(questionhtml.join(''));
    }
  });
}



//////////////////////////////
  // Populate the Review //
//////////////////////////////
function populateReviewModal()
{
  var cust_name = localStorage.getItem("cust_name").trim();
  var cust_no = localStorage.getItem("cust_no").trim();
  var email_addr = localStorage.getItem("email_addr").trim();
  var hash = window.location.hash.split("+");
  var stock_no = hash[1];
  var rLines;

  $("#reviewModalBody").empty();

  rLines  = '<form class="nobottommargin" id="template-reviewform" target="dummyframe" name="template-reviewform" action="https://netlink.laurajanelle.com:444/nlhelpers/mailer/review.php" method="GET"><div class="bottommargin-sm">';
  rLines += '<div class="white-section"><label>Rating:</label><input id="cust-rating" name="rating" class="rating-loading" data-size="sm"></div></div><div class="clear"></div>';
  rLines += '<div class="col_full"><label for="template-reviewform-comment">Comment <small>*</small></label><input type="hidden" name="custname" value="'+ cust_name +'" />';
  rLines += '<textarea class="required form-control" id="template-reviewform-comment" name="comment" rows="6" cols="30"></textarea></div><input type="hidden" name="custnum" value="'+ cust_no +'" />';
  rLines += '<input type="hidden" name="email" value="'+ email_addr +'" /><input type="hidden" name="item" value="'+ stock_no +'" /><input type="hidden" name="source" value="LJ website" /><div class="col_full nobottommargin">';
  rLines += '<button class="button button-3d nomargin" type="submit" id="template-reviewform-submit" name="template-reviewform-submit" value="submit" onclick="$(\'#fakeRevQuestion\').click();">Submit Review</button></div></form>';

  $("#reviewModalBody").html(rLines);
  
  $('#cust-rating').rating({
      step: 1,
      starCaptions: {1: 'Not for me', 2: 'I\’d probably re-gift it', 3: 'It\'s okay', 4: 'I really like it', 5: 'I love it'},
      starCaptionClasses: {1: 'text-danger', 2: 'text-warning', 3: 'text-info', 4: 'text-primary', 5: 'text-success'}, 
      showClear: false, 
      showCaption: true
  });
}

function getReviews(stock_no)
{
  productRating = [];

  $("#listOfReviews").empty();
  $("#number-of-reviews").empty();
  var reviewhtml = [];
  $.get("https://netlink.laurajanelle.com:444/nlhelpers/mailer/review.php?comment=&custname=&custnum=&rating=&item="+ stock_no +"&email=&source=", function ( reviewdata ) {
    rdata = reviewdata.split("\n");
    if (rdata.length < 2) {
      custrLines = '<p class="reviewSection lead topmargin-sm">No reviews have been submitted for this item.</p>';
      $("#listOfReviews").prepend(custrLines);
      $("#mainRatingDiv").html('<a href="#" onclick="$(\'#addReviewButton\').click(); return false;">Be the first to review this item</a>');
    } else {
      $("#mainRatingDiv").html('<div class="white-section different-stars"><input id="mainRating" type="number" class="rating" max="5" value="" data-size="xs" disabled></div>');
      for (i=0; i<rdata.length - 1; i++) {
        rdatalines    = rdata[i].split("|");
        dateAddedPre  = Date(rdatalines[0]).split(" ");
        dateAddedPost = dateAddedPre[1] + " "+ dateAddedPre[2].replace(/^[0]+/g,"")+ ", "+ dateAddedPre[3];
        dateAppPre    = Date(rdatalines[1]).split(" ");
        dateAppPost   = dateAppPre[1] + " "+ dateAppPre[2].replace(/^[0]+/g,"")+ ", "+ dateAppPre[3];

        custrLines  = '<li class="comment even thread-even depth-1" id="li-comment-'+ i +'"><div id="comment-'+ i +'" class="comment-wrap clearfix"><div class="comment-content clearfix"><div class="comment-author">'+ rdatalines[3] +'<span>';
        custrLines += '<a>'+ dateAddedPost +'</a></span></div><div class="white-section different-stars"><input id="rating-'+ i +'" value="'+ rdatalines[6] +'" class="rating-loading" data-size="xs" readonly></div>';
        custrLines += '<p class="notopmargin">'+ rdatalines[2] +'</p></div><div class="clear"></div></div></li>';

        if (rdatalines[4].length>3) {
          custrLines += '<li class="comment odd thread-odd depth-2" id="li-comment-'+ i +'"><div id="comment-'+ i +'" class="comment-wrap clearfix"><div class="comment-meta"><div class="comment-author vcard"><span class="comment-avatar clearfix">';
          custrLines += '<img alt="reply arrow" src="../img/reply.png" height="60" width="60" /></span></div></div><div class="comment-content clearfix"><div class="comment-author">'+ rdatalines[5] +'<span><a>'+ dateAppPost +'</a>';
          custrLines += '</span></div><p>'+ rdatalines[4] +'</p></div><div class="clear"></div></div></li>';
        }
         custrLines += '<hr>';
        if (rdatalines[8] === "1") {
          reviewhtml.unshift(custrLines);
        } else {
          reviewhtml.push(custrLines);
        }

        productRating.push(rdatalines[6]);
      }

      $("#listOfReviews").html(reviewhtml.join(''));
      for (i=0; i<rdata.length - 1; i++) {
        $('#rating-'+i+'').rating({ showClear: false, showCaption: false });
      }

      $('#mainRating').val(getAvg(productRating));
      $('#mainRating').rating('refresh', {showClear: false, showCaption: false});
    }
    $("#number-of-reviews").html("Reviews ("+ (rdata.length - 1) +")");
  });
}

 
function getAvg(elmt)
{
  var sum = 0;
  for( var i = 0; i < elmt.length; i++ ){
      sum += parseInt( elmt[i], 10 ); //don't forget to add the base
  }
  var avg = sum/elmt.length;
  return avg.toFixed(2);
}


/////////////////////////////////
// Get Country Codes and Stuff //
/////////////////////////////////
function countryCode()
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICOUNTRY",
      session_no: session_no
    },
    success: function(response) {
      country = response.split("\n");
      $("#countries").empty();
      for (i=1; i<country.length - 1; i++) {
        countrylines = country[i].split("|");
        document.getElementById("countries").innerHTML += '<option value="' + countrylines[0].replace(/\s+/g,'') + '">' + countrylines[1].replace(/\s+/g,'') + '</option>';
      }
    }
  });
}



////////////////////////\\
// Update Cart Function \\
//\\\\\\\\\\\\\\\\\\\\\\\\

function updateCart2(callback) 
{
  //$("#updateCartButton").hide();
  UpdatedShoppingCart = {};
  newItems = {};
  var table = $("table tbody#cartItemTable");
  // loop thru cart and flatten the items that are repeated
  table.find('tr.products').each(function () {
    var line_no     = $(this).find('td:first-child a').attr('id');
    var stockNumber = $(this).find('td:nth-child(5) div input:nth-child(2)').attr('id');
    var qty         = parseInt($(this).find('td:nth-child(5) div input:nth-child(2)').val());

    if (!newItems.hasOwnProperty(stockNumber)) {
      newItems[stockNumber] = [parseInt(qty), line_no];
    } else {
      newItems[stockNumber][0] += parseInt(qty);
    }
    UpdatedShoppingCart[line_no] = [parseInt(qty), stockNumber];
  });
  loopCart();
  addItemsBack(shopPage);
  if (callback && typeof (callback) === "function") {
    callback();
  }
}

function addItemsBack(callback) {
  $.each(newItems, function (key, value) { 
    $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICARTADD&session_no=" + session_no + "&stock_no=" + key + "&qty=" + value[0] + "");
  });

  if (callback && typeof (callback) === "function") {
    callback();
  }
}

function loopCart(callback) 
{
  $.each(UpdatedShoppingCart, function (key, value) {
      removeItemGeneric(session_no, key);
  });

  if (callback && typeof (callback) === "function") {
    callback();
  }
}


/////////////////////////
// Credit Card Process //
/////////////////////////
function creditCard(n)
{
  var neworder;
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIORDLST",
      session_no: session_no
    },
    success: function(response) {
      openlines = response.split("\n");
      if (n === 1 ) {
        numberOfOrders = openlines.length;
      }
      newNumberOfOrders = openlines.length;

      if (numberOfOrders != newNumberOfOrders) {
        //windowHash("orders");
        $( "#success" ).click();
        //$("#successMessage").empty();
        hideCC = true;
        orders = [];
        for (i=1; i< openlines.length - 1; i++) {
          fields = openlines[i].split("|");
          orders.push(fields);
        }
       
        orders = orders.sort(function(a, b) {
          return a[1] > b[1] ? -1 : 1;
        });
        newOrder = orders[0][0];
        /*
       	var message =  '<h4 style="font-family: Lato;">The order # is: ' + newOrder + '</h4>';
            message += '<p>This is a confirmation that your order has been successfully received and is currently under process. You will receive an email soon with a copy of your invoice, which also includes the details of your order.</p>';
            message += '<p class="nobottommargin">Laura Janelle values your business and is continuously looking for ways to better satisfy their customers. Please do share with us if there is a way we can serve you better.</p>';

        document.getElementById("successMessage").innerHTML += message;
        */
        
        return $.get("https://netlink.laurajanelle.com:444/mailer/order_confirmation.php?session_no=" + session_no + "&order_no="+ newOrder + "");
      } else {
        return setTimeout(function(){ creditCard(n+1); }, 3000);
      }
    }
  });
}


/////////////////////////////////////////
// Saving Addresses from Checkout Page //
/////////////////////////////////////////
function saveAddresses()
{
  var shippingformcompanyname = $("#shipping-form-companyname").val();
  var shippingformaddress     = $("#shipping-form-address").val();
  var shippingformaddress2    = $("#shipping-form-address2").val();
  var shippingformaddress3    = $("#shipping-form-address3").val();
  var shippingformcity        = $("#shipping-form-city").val();
  var shippingformstate       = $("#shipping-form-state").val();
  var shippingformzipcode     = $("#shipping-form-zipcode").val();
  var shippingformcountry     = $("#shipping-form-country").val();
  var email_addr              = $("#billing-form-email").val();
  var phone                   = $("#billing-form-phone").val();
  var ponumber                = $("#shipping-form-ponumber").val();
  var text1 = "";
  var text2 = "";
  var text3 = "";
  var text4 = "";
  var text5 = "";
  var notesArray = [];
  if($("#shipping-form-message").val()) {
    notesArray = $("#shipping-form-message").val().match(/.{1,30}/g);
    if (notesArray[0] && typeof(notesArray[0]) === "string") {
       text1 = notesArray[0];
    }
    if (notesArray[1] && typeof(notesArray[1]) === "string") {
      text2 = notesArray[1];
    }
    if (notesArray[2] && typeof(notesArray[2]) === "string") {
      text3 = notesArray[2];
    }
    if (notesArray[3] && typeof(notesArray[3]) === "string") {
      text4 = notesArray[3];
    }
    if (notesArray[4] && typeof(notesArray[4]) === "string") {
      text5 = notesArray[4];
    }
  }

  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APICARTUPD",
      session_no: session_no,
      shipname: shippingformcompanyname,
      shipadd1: shippingformaddress,
      shipadd2: shippingformaddress2,
      shipadd3: shippingformaddress3,
      shipcity: shippingformcity,
      shipstate: shippingformstate,
      shipzip: shippingformzipcode,
      shipcountry: shippingformcountry,
      phone: phone,
      email_addr: email_addr,
      po_no: ponumber,
      text1: text1,
      text2: text2,
      text3: text3,
      text4: text4,
      text5: text5
    }
  });
}

function saveAddressProfile()
{
  var shippingformcompanyname = $("#shipping-form-companyname-profile").val();
  var shippingformaddress     = $("#shipping-form-address-profile").val();
  var shippingformaddress2    = $("#shipping-form-address2-profile").val();
  var shippingformaddress3    = $("#shipping-form-address3-profile").val();
  var shippingformcity        = $("#shipping-form-city-profile").val();
  var shippingformstate       = $("#shipping-form-state-profile").val();
  var shippingformzipcode     = $("#shipping-form-zipcode-profile").val();
  var shippingformcountry     = $("#shipping-form-country-profile").val();
  var email_addr              = $("#billing-form-email-profile").val();
  var phone                   = $("#billing-form-phone-profile").val();
  var cust_no                 = $("#cust_no").html().trim();
  var shippingformcontactname = $("#shipping-form-contactname-profile").val();

  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APINEWSHIP",
      cust_no: cust_no,
      ship_to_name: shippingformcompanyname,
      address1: shippingformaddress,
      address2: shippingformaddress2,
      address3: shippingformaddress3,
      city: shippingformcity,
      state: shippingformstate,
      zip: shippingformzipcode,
      country: shippingformcountry,
      contact_name: shippingformcontactname,
      phone: phone,
      email: email_addr
    }
  });
  $("#addressSaveMessage").show();
  $("#shipping-form-profile").empty();
}




/////////////////////////////////////////////
// ORDER/INVOICE API Function - APIHISTLST //
/////////////////////////////////////////////
function orderHistory()
{
  var fldsArray = { "data": []},
      lines,
      fldsArray_json, 
      flds;
  $.ajax({
   type: "GET",
   url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APIHISTLST",
     session_no: session_no
   },
   success: function(response) {
     lines = response.split("\n");
     // lines[0] is header row
     // lines[1]+ are data lines
     // $('#tableBody').empty();
     for (i=1; i<lines.length - 1; i++) {
       flds = lines[i].split("|");
       flds.splice(5, 1);
       flds.splice(5, 1);
       flds.splice(9, 1);
       flds.splice(7, 1);
       flds.splice(7, 1);
       flds.splice(7, 1);

       fldsArray.data.push(flds);
     }
     fldsArray = JSON.stringify(fldsArray);
     fldsArray_json = $.parseJSON(fldsArray);
   },
   complete: function(){
     table = $('#datatable2').DataTable();
     table.clear();
     table.rows.add( fldsArray_json.data ).draw();

     table5 = $('#datatable5').DataTable();
     table5.clear();
     table5.rows.add( fldsArray_json.data ).draw();
   }
 });
}



/////////////////////////////////////////
// OPEN ORDER API Function - APIORDLST //
/////////////////////////////////////////
function openOrders()
{
  var openlines,
      openfldsArray = { "data": []},
      openfldsArray_json,
      fields;
  $.ajax({
   type: "GET",
   url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
   data: {
     request_id: "APIORDLST",
     session_no: session_no
   },
   success: function(response) {
     openlines = response.split("\n");
     // lines[0] is header row
     // lines[1]+ are data lines

     for (i=1; i < openlines.length - 1; i++) {
       fields = openlines[i].split("|");
       fields.splice(3, 1);
       fields.splice(6, 1);
       fields.splice(6, 1);
       fields.splice(6, 1);
       openfldsArray.data.push(fields);
    }
     openfldsArray = JSON.stringify(openfldsArray);
     openfldsArray_json = $.parseJSON(openfldsArray);
   },
   complete: function(){
     table1 = $('#datatable1').DataTable();
     table1.clear();
     table1.rows.add( openfldsArray_json.data ).draw();
   }
 });
}



/////////////////////////////////////////////
    // GET ORDER HEADER AND LINE ITEMS //
/////////////////////////////////////////////
function searchOrders(orderSearchNumber)
{
  $("#orders-details-title, #orders-details-table, #orders-line-item-title, #orders-line-item-table").show();

  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIORDH",
      session_no: session_no,
      order_no: orderSearchNumber},
    success: function(response) {
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      $('#orders-orderDetails').empty();
      html = [];
      if ( lines.length <= 2 ) {
        document.getElementById("orders-orderDetails").innerHTML += '<tr><td><h1>There are no results</h1></td><td></td></tr>';
      } else {
        for (i=1; i<lines.length - 1; i++) {
          details = lines[i].split("|");
          line =  '<tr><td>Order Number</td><td>'+details[0]+'</td></tr>';
          line += '<tr><td>Order Date</td><td>'+details[1]+'</td></tr>';
          line += '<tr><td>Shipping Date</td><td>'+details[2]+'</td></tr>';
          line += '<tr><td>Customer Number</td><td>'+details[3]+'</td></tr>';
          line += '<tr><td>PO Number</td><td>'+details[4]+'</td></tr>';
          line += '<tr><td>Tax Amount</td><td>$'+details[5]+'</td></tr>';
          line += '<tr><td>Order Total</td><td>$'+details[6]+'</td></tr>';
          line += '<tr><td>Discount Amount</td><td>$'+details[7]+'</td></tr>';
          line += '<tr><td>Bill-to Name</td><td>'+details[8]+'</td></tr>';
          line += '<tr><td>Bill-to Address</td><td>'+details[9]+' '+details[10]+' '+details[11]+' '+details[12]+', '+details[13]+' '+details[14]+'</td></tr>';
          line += '<tr><td>Ship-to Name</td><td>'+details[15]+'</td></tr>';
          line += '<tr><td>Ship-to Address</td><td>'+details[16]+' '+details[17]+' '+details[18]+' '+details[19]+', '+details[20]+' '+details[21]+'</td></tr>';
          line += '<tr><td>Notes</td><td>'+details[22]+' '+details[23]+' '+details[24]+' '+details[25]+' '+details[26]+'</td></tr>';
          line += '<tr><td>Email Address</td><td>'+details[27]+'</td></tr>';
          line += '<tr><td>Total Payments</td><td>'+details[28]+'</td></tr>';
          line += '<tr><td>Number of Lines</td><td>'+details[29]+'</td></tr>';
          line += '<tr><td>Total Order Qty</td><td>'+details[30]+'</td></tr>';
          line += '<tr><td>Total Weight</td><td>'+details[31]+'</td></tr>';
          line += '<tr><td>Shipping Method</td><td>'+details[32]+'</td></tr>';
          line += '<tr><td>Total Other Charges</td><td>$'+details[33]+'</td></tr>';
          line += '<tr><td>Total Freight</td><td>$'+details[34]+'</td></tr>';
          html.push(line);
          document.getElementById("orders-orderDetails").innerHTML += html.join('');
        }
      }
    }
  });
  var openfldsArray = { "data": []};
  fields = "";
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIORDL",
      session_no: session_no,
      order_no: orderSearchNumber},
    success: function(response) {

      openlines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      for (i=1; i< openlines.length - 1; i++) {
        fields = openlines[i].split("|");
        fields.splice(0, 1);
        fields.splice(3, 1);
        fields.splice(3, 1);
        fields.splice(6, 1);
        openfldsArray.data.push(fields);
      }
      openfldsArray = JSON.stringify(openfldsArray);
      openfldsArray_json = $.parseJSON(openfldsArray);
    },
    complete: function(){
      if (fields === "" ) {
        $("#datatable3").hide();
      } else {
        $("#datatable3").show();
        table3 = $('#datatable3').DataTable();
        table3.clear();
        table3.rows.add( openfldsArray_json.data ).draw();
      }
    }
  });
}



/////////////////////////////////////////////
   // GET INVOICE HEADER AND LINE ITEMS //
/////////////////////////////////////////////
function searchInvoices(invoiceSearchNumber)
{
  $("#details-title, #details-table, #line-item-title, #line-item-table").show();

  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIHISTH",
      session_no: session_no,
      inv_no: invoiceSearchNumber},
    success: function(response) {
      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      $('#invoiceDetails').empty();
      // html = [];
      if ( lines.length <= 2) {
        document.getElementById("invoiceDetails").innerHTML += '<tr><td><h1>There are no results</h1></td><td></td></tr>';
      } else {
        for (i=1; i<lines.length - 1; i++) {
          details = lines[i].split("|");
          line = '<tr><td>Order Number</td><td>'+details[0]+'</td></tr>';
          line += '<tr><td>Invoice Number</td><td>'+details[1]+'</td></tr>';
          line += '<tr><td>Order Date</td><td>'+details[2]+'</td></tr>';
          line += '<tr><td>Shipping Date</td><td>'+details[3]+'</td></tr>';
          line += '<tr><td>Customer Number</td><td>'+details[4]+'</td></tr>';
          line += '<tr><td>PO Number</td><td>'+details[5]+'</td></tr>';
          line += '<tr><td>Tax Amount</td><td>$'+details[8]+'</td></tr>';
          line += '<tr><td>Order Total</td><td>$'+details[9]+'</td></tr>';
          line += '<tr><td>Discount Amount</td><td>$'+details[10]+'</td></tr>';
          line += '<tr><td>Bill-to Name</td><td>'+details[11]+'</td></tr>';
          line += '<tr><td>Bill-to Address</td><td>'+details[12]+' '+details[13]+' '+details[14]+' '+details[15]+', '+details[16]+' '+details[17]+'</td></tr>';
          line += '<tr><td>Ship-to Name</td><td>'+details[18]+'</td></tr>';
          line += '<tr><td>Ship-to Address</td><td>'+details[19]+' '+details[20]+' '+details[21]+'S '+details[22]+', '+details[23]+' '+details[24]+'</td></tr>';
          line += '<tr><td>Notes</td><td>'+details[25]+' '+details[26]+' '+details[27]+' '+details[28]+' '+details[29]+'</td></tr>';
          line += '<tr><td>Email Address</td><td>'+details[30]+'</td></tr>';
          line += '<tr><td>Total Payments</td><td>$'+details[31]+'</td></tr>';
          line += '<tr><td>Number of Lines</td><td>'+details[32]+'</td></tr>';
          line += '<tr><td>Total Order Qty</td><td>'+details[33]+'</td></tr>';
          line += '<tr><td>Total Weight</td><td>'+details[34]+'</td></tr>';
          line += '<tr><td>Shipping Method</td><td>'+details[35]+'</td></tr>';
          line += '<tr><td>Total Other Charges</td><td>$'+details[36]+'</td></tr>';
          line += '<tr><td>Total Freight</td><td>$'+details[37]+'</td></tr>';

          document.getElementById("invoiceDetails").innerHTML += line;
        }
      }
    }
  });
  var openfldsArray = { "data": []};
  fields = "";
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIHISTL",
      session_no: session_no,
      inv_no: invoiceSearchNumber},
    success: function(response) {

      openlines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      // $('#tableBody').empty();
      for (i=1; i< openlines.length - 1; i++) {
        fields = openlines[i].split("|");
        fields.splice(0, 1);
        fields.splice(2, 1);
        fields.splice(4, 1);
        fields.splice(4, 1);
        fields.splice(8, 1);

        openfldsArray.data.push(fields);
      }
      openfldsArray = JSON.stringify(openfldsArray);
      openfldsArray_json = $.parseJSON(openfldsArray);
    },
    complete: function(){
      if (fields === "" ) {
        table4 = $('#datatable4').DataTable();
        table4.clear();
      } else {
        $("#datatable4").show();
        table4 = $('#datatable4').DataTable();
        table4.clear();
        table4.rows.add( openfldsArray_json.data ).draw();
      }
    }
  });
}



/////////////////////////////////////////////
         // GET ACCOUNT DETAILS //
/////////////////////////////////////////////
function accountDetails()
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIACCTINFO",
      user: username},
    success: function(response) {

      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      $('#accountDetails').empty();
      for (i=0; i<lines.length - 1; i++) {
        details = lines[i].split("|");
        line =  '<tr><td>Username</td><td>'+details[0]+'</td></tr>';
        line += '<tr><td>Customer Number</td><td id="cust_no">'+details[1]+'</td></tr>';
        line += '<tr><td>Customer Name</td><td id="cust_name">'+details[2]+'</td></tr>';
        line += '<tr><td>Email Address</td><td id="email_addr">'+details[3]+'</td></tr>';
        line += '<tr><td>Phone Number</td><td>'+details[4]+'</td></tr>';
        line += '<tr><td>Default Ship Via Code</td><td>'+details[5]+'</td></tr>';
        line += '<tr><td>Terms Code</td><td>'+details[6]+'</td></tr>';
        line += '<tr><td>Current Session Number</td><td>'+session_no+'</td></tr>';
        document.getElementById("accountDetails").innerHTML += line;
      }
    }
  });
}



/////////////////////////////////////////////
     // PULL SAVED BILL TO ADDRESSES //
/////////////////////////////////////////////
function billToAddress()
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APIBIILLST",
      session_no: session_no
    },
    success: function(response) {

      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      // $('#tableBody').empty();
      for (i=1; i<lines.length - 1; i++) {
        flds = lines[i].split("|");
      }
    }
 });
}

/////////////////////////////////////////////
    // PULL SAVED SHIP TO ADDRESSES //
/////////////////////////////////////////////
function shipToAddress()
{
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APISHIPLST",
      session_no: session_no
    },
    success: function(response) {

      lines = response.split("\n");
      // lines[0] is header row
      // lines[1]+ are data lines
      for (i=1; i<lines.length - 1; i++) {
        flds = lines[i].split("|");
        shippingAddresses.push([flds[1],flds[2],flds[3],flds[4],flds[5],flds[6],flds[7]]);
        document.getElementById("shipping-address").innerHTML += '<option value="'+i+'">' + flds[1] + ', ' + flds[2] + '</option>';
      }
      $("#shipping-address").prepend('<option selected="selected">Select Address</option>');
    }
 });
}




///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
//////////////////////// HELPER FUNCTIONS / SUBROUTINES ///////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////
          // redirect with hash add ins  //
/////////////////////////////////////////////////////
function redirect(pathname)
{
  pathArray = window.location.pathname.split( '/' );
  pathArray[pathArray.length - 2] = pathname;
  window.location.pathname = pathArray.join('/');
}

function windowHash(name)
{
  window.location.hash = name;
  return false;
}


/////////////////////////////////////////////////////
// Get Session Number and Authorize Access to Page //
/////////////////////////////////////////////////////
function sessionNumber()
{
  session_no = localStorage.getItem('session_no');
  if (session_no == null || typeof(session_no) === "undefined" || session_no.length !== 25) {
     pathArray = window.location.pathname.split( '/' );
     pathArray[pathArray.length - 2] = "retailerlogin";
     window.location.pathname = pathArray.join('/');
     alert("Please log in first.");
   // localStorage.setItem('browsing', "looky-loo");
  }
}


function displayAddress(index) {
  var ind = index - 1;
  document.getElementById("shipping-form-companyname").value = shippingAddresses[ind][0].trim();
  document.getElementById("shipping-form-address").value = shippingAddresses[ind][1].trim();
  document.getElementById("shipping-form-address2").value = shippingAddresses[ind][2].trim();
  document.getElementById("shipping-form-address3").value = shippingAddresses[ind][3].trim();
  document.getElementById("shipping-form-city").value = shippingAddresses[ind][4].trim();
  document.getElementById("shipping-form-state").value = shippingAddresses[ind][5].trim();
  document.getElementById("shipping-form-zipcode").value = shippingAddresses[ind][6].trim();
}


function logoff()
{
  localStorage.removeItem('session_no');
  localStorage.removeItem('newCustomer');
  localStorage.removeItem('username');
  localStorage.removeItem('couponUsed');
  redirect("");
}


////////////////////////////////////////
// Fill in Items for person to review //
////////////////////////////////////////
function reviewOrder()
{
  $('#posts').empty();
  /// the testing URL  http://localhost:4000/review/#open+8801212+800015865
  var reviewHash     = window.location.hash.split("+");
  var customerNumber = reviewHash[1];
  var invoiceNumber  = reviewHash[2];
  var orderItems     = [];
  var reviewedItems;
  var email_addr;
  var cust_name;

 // https://netlink.laurajanelle.com:444/test/rest-api/customer-exists/?customer=101
  $.get("https://netlink.laurajanelle.com:444/nlhelpers/api-customer-exists/?customer="+ customerNumber + "", function (information) {
    custInfo = $.parseJSON(information);
    email_addr = custInfo.customer.emailaddress;
    cust_name = custInfo.customer.customername;
  });
 
  $.get("https://netlink.laurajanelle.com:444/nlhelpers/mailer/review.php?comment=&custname=&&rating=&item=&email=&source=&custnum="+ customerNumber +"", function( data ) {
    reviewedItems = data;
  });

  $.get("https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?&request_id=APIHISTL&session_no=E9DZRD9OM9GRZZEOTGLOED411&inv_no="+ invoiceNumber + 0 +"", function( response ) {
    lines = response.split("\n");
    for (i=1; i < lines.length - 1; i++) {
      fields = lines[i].split("|");
      orderItems.push(fields[4].trim()); 
    }
    
    orderItems = orderItems.filter(function(val) {
      return reviewedItems.indexOf(val) == -1;
    });
    
    orderItems.forEach(function(element) {
      console.log(element);

      reviewHTML =  '<div class="entry clearfix"><div class="entry-image"><a href="https://www.laurajanelle.com/ljjpgimages/10584-lg.jpg" data-lightbox="image"><img class="image_fade" src="https://www.laurajanelle.com/ljjpgimages/10584-sm.jpg" alt="Image of item"></a>';
      reviewHTML += '</div><div class="entry-c"><form class="nobottommargin" id="template-reviewform" name="template-reviewform" action="#" method="post"><div class="col_full col_last"><div class="white-section"><label>Rating:</label><input id="cust-rating" name="rating" class="rating" data-size="sm">';
      reviewHTML += '</div></div><div class="clear"></div><div class="col_three_fifth"><label for="template-reviewform-comment">Comment <small>*</small></label><textarea class="required form-control" id="template-reviewform-comment" name="template-reviewform-comment" rows="6" cols="30">';
      reviewHTML += '</textarea></div><div class="col_full nobottommargin"><button class="button button-3d nomargin" type="submit" id="template-reviewform-submit" name="template-reviewform-submit" value="submit">Submit Review</button></div></form></div></div>';
      $('#posts').append(reviewHTML);
    });
  });
}

////////////////////////////////
// Find Minimum for the order //
////////////////////////////////
function employeeDiscount()
{
  username = localStorage.getItem("username");
  usernameSplit = username.split("");
  employee = usernameSplit.slice(0,3).join("");
}

function minimumTotal()
{ 
  newCustomer = localStorage.getItem('newCustomer');
  orderAmt = cartHeaderFields[22].trim();
  orderAmtFloat = parseFloat(orderAmt.replace(/,/g,''));

  if ( (newCustomer === "false" && orderAmtFloat < 100 || newCustomer === "true" && orderAmtFloat < 200) && employee !== "CCA") {
    $("#myButton").hide();
    if (newCustomer === "true") {
      document.getElementById("minimumTotalWarning").innerHTML += '<h2>You need spend $' + parseFloat((200 - orderAmtFloat)).toFixed(2) + ' more to reach the minimum order requirement of $200 for new customers.</h2>';
    }
    if (newCustomer === "false") {
      document.getElementById("minimumTotalWarning").innerHTML += '<h2>You need spend $' + parseFloat((100 - orderAmtFloat)).toFixed(2) + ' more to reach the minimum order requirement of $100.</h2>';
    }
  } else {
    if ( hideCC === true) {
      $("#myButton").show();
    }
  }
}



//////////////////////////////////////
// Functionality of + and - Buttons //
//////////////////////////////////////
function changeQuantity(element)
{
  var fieldName = jQuery(element).attr('data-field');
  var type      = jQuery(element).attr('data-type');
  var input     = jQuery("input[name='"+fieldName+"']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if(type == 'minus') {
      var minValue = parseInt(input.attr('min'));
      if(!minValue) minValue = 1;
      if(currentVal > minValue) {
        input.val(currentVal - 1).change();
      }
      if(parseInt(input.val()) == minValue) {
        jQuery(element).attr('disabled', true);
      }
    } else if(type == 'plus') {
      var maxValue = parseInt(input.attr('max'));
      if(!maxValue) maxValue = 9999999999999;
      if(currentVal < maxValue) {
        input.val(currentVal + 1).change();
      }
      if(parseInt(input.val()) == maxValue) {
        jQuery(element).attr('disabled', true);
      }
    }
  } else {
    input.val(0);
  }

  jQuery('.input-number').focusin(function(){
    jQuery(element).data('oldValue', jQuery(element).val());
  });
  jQuery('.input-number').change(function() {
    var minValue = parseInt(input.attr('min'));
    var maxValue = parseInt(input.attr('max'));
    if(!minValue) minValue = 1;
    if(!maxValue) maxValue = 9999999999999;
    var valueCurrent = parseInt(input.val());
  });
  return false;
}
function changeQuantity2(element)
{
  var fieldName = jQuery(element).attr('data-field');
  var type      = jQuery(element).attr('data-type');
  var input     = jQuery("input[name='"+fieldName+"']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if(type == 'minus') {
      var minValue = parseInt(input.attr('min'));
      if(!minValue) minValue = 2;
      if(currentVal > minValue) {
        input.val(currentVal - 2).change();
      }
      if(parseInt(input.val()) == minValue) {
        jQuery(element).attr('disabled', true);
      }
    } else if(type == 'plus') {
      var maxValue = parseInt(input.attr('max'));
      if(!maxValue) maxValue = 100000000;
      if(currentVal < maxValue) {
        input.val(currentVal + 2).change();
      }
      if(parseInt(input.val()) == maxValue) {
        jQuery(element).attr('disabled', true);
      }
    }
  } else {
    input.val(0);
  }

  jQuery('.input-number').focusin(function(){
    jQuery(element).data('oldValue', jQuery(element).val());
  });
  jQuery('.input-number').change(function() {
    var minValue = parseInt(input.attr('min'));
    var maxValue = parseInt(input.attr('max'));
    if(!minValue) minValue = 2;
    if(!maxValue) maxValue = 9999999999999;
    var valueCurrent = parseInt(input.val());
  });
  return false;
}


//////////////////////////////////////////////
  // Filter the Products on the Shop Page //
//////////////////////////////////////////////

var $container = $('#shopItems');

$container.isotope();

function priceFilter() {
  var priceRangefrom = ( isNaN(parseFloat($("#min").val())) ? 1 : parseFloat($("#min").val()) );
  var priceRangeto   = ( isNaN(parseFloat($("#max").val())) ? 9999 : parseFloat($("#max").val()) );
  $('.ui-group').trigger( 'change');
  $container.isotope({
    transitionDuration: '0.65s',
    filter: function() {

      if( jQuery(this).is(':visible')) {
        if( jQuery(this).find('.product-price').length > 0 ) {
          price = jQuery(this).find('.product-price').text();
        } else {
          price = jQuery(this).find('.product-price').text();
        }
        priceNum = price.split("$");
        return ( priceRangefrom <= priceNum[1] && priceRangeto >= priceNum[1] );
      }
    }
  });
}

// do stuff when checkbox change
$('.filterbutton').on( 'change', function( event ) {
  $container.isotope('destroy');
  var checkbox = event.target;

  var $checkbox = $( checkbox );
  var group = $checkbox.parents('.filterbutton').attr('data-group');
  // create array for filter group, if not there yet
  var filterGroup = filters[ group ];
  if ( !filterGroup ) {
    filterGroup = filters[ group ] = [];
  }
  // add/remove filter
  if ( checkbox.checked ) {
    // add filter
    filterGroup.push( checkbox.value );
  } else {
    // remove filter
    var index = filterGroup.indexOf( checkbox.value );
    filterGroup.splice( index, 1 );
  }
  
  var comboFilter = getComboFilter();
  console.log(comboFilter);
  $container.isotope({ filter: comboFilter });
});


function getComboFilter() {
  var combo = [];
  for ( var prop in filters ) {
    var group = filters[ prop ];
    if ( !group.length ) {
      // no filters in group, carry on
      continue;
    }
    // add first group
    if ( !combo.length ) {
      combo = group.slice(0);
      continue;
    }
    // add additional groups
    var nextCombo = [];
    // split group into combo: [ A, B ] & [ 1, 2 ] => [ A1, A2, B1, B2 ]
    for ( var i=0; i < combo.length; i++ ) {
      for ( var j=0; j < group.length; j++ ) {
        var itemForCombo = combo[i] + group[j];
        nextCombo.push( itemForCombo );
      }
    }
    combo = nextCombo;
  }
  var comboFilter = combo.join(', ');

  return comboFilter;
}


/////////////////////////////////////////////
//  Hash loads Ajax. Make this go faster.. //
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////


function shopPage()
{
  cartHeader();
  cartList();
}

function checkoutPage()
{
  employeeDiscount();
  session_no = localStorage.getItem('session_no');
  cartList();
  cartHeader(); // cartHeader(); cartHeader(minimumTotal);

  $('#shipping-form-companyname').focus();
  if (hideCC === true ) {
    shippingAddresses = [];
    $("#creditcard").hide();
    $("#minimumTotalWarning, #shipping-address").empty();
    shipToAddress();
  }
  document.getElementById("creditcard").src="https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?request_id=APICC&session_no=" + session_no + "";

  $("#myButton").click(function() {
    var hasErrors = $('#shipping-form').validator('validate').has('.has-error').length;
    if (hasErrors) {
      alert('Shipping address form has errors.');
    } else {
      hideCC = false;
      saveAddresses();
      creditCard(1);
      $( "#creditcard" ).slideDown( "slow" );
      $("#myButton").hide();
    }
  });
}


/////////////////////////////////////////////
/////////////////////////////////////////////

function whichPage()
{
  var hashy = window.location.hash.split("+");
  var locale = hashy[0];
  $('#content div div section').hide();
  switch (locale) {
    case '#shop' :
      $('#shop').show();
      $('#page-title').hide();
      $('#fill-page-title').text('SHOP');
      break;
    case '#cart' :
      window.scrollTo(0, 0);
      $('#cart').show();
      shopPage();
      if (localStorage.getItem('couponUsed') === "true") {
        $('.couponDiv').hide();
      } else {
        $('.coupondDiv').show();
      }
      $('#page-title').show();
      $('#fill-page-title').text('CART');
      break;
    case '#checkout' :
      window.scrollTo(0, 0);
      $('#checkout').show();
      checkoutPage();
      $('#page-title').show();
      $('#fill-page-title').text('CHECKOUT');
      break;
    case '#profile' :
      window.scrollTo(0, 0);
      $('#profile').show();
      username = localStorage.getItem('username').toUpperCase();
      accountDetails();
      $("#myButtonProfile").click(function() {
        var hasErrors = $('#shipping-form-profile').validator('validate').has('.has-error').length;
        if (hasErrors) {
          alert('Shipping address form has errors.');
        } else {
          saveAddressProfile();
          $("#shipping-form-profile").find("input[type=text], textarea, input[type=number], input[type=email]").val("");
        }
      });
      $('#page-title').show();
      $('#fill-page-title').text('MY ACCOUNT');
      break;
    case '#invoices' :
      window.scrollTo(0, 0);
      $('#invoices').show();
      $("#details-title, #details-table, #line-item-title, #line-item-table").hide();

      orderHistory();
      $('#searchForInvoices').click(function(){
        var invoiceSearchNumber = $('#invoiceNumber').val();
        searchInvoices(invoiceSearchNumber);
      });
      $('#invoiceNumber').keypress(function(e){
        if(e.which == 13){//Enter key pressed
          $('#searchForInvoices').click();//Trigger search button click event
        }
      });
      $('#page-title').show();
      $('#fill-page-title').text('INVOICES');
      break;
    case '#orders' :
      window.scrollTo(0, 0);
      $('#orders').show();
      $("#orders-details-title, #orders-details-table, #orders-line-item-title, #orders-line-item-table").hide();
      openOrders();
      orderHistory();
      $('#searchForOrders').click(function(){
        var orderSearchNumber = $('#orderNumber').val();
        searchOrders(orderSearchNumber);
      });
      $('#orderNumber').keypress(function(e){
        if(e.which == 13){//Enter key pressed
          $('#searchForOrders').click();//Trigger search button click event
        }
      });
      $('#page-title').show();
      $('#fill-page-title').text('ORDERS');
      break;
    case '#detail-view' :
      $('#detail-view').show();
      window.scrollTo(0, 0);
      detailView2(getQuestions, getReviews);
      $('#questionField').keypress(function(e){
        if(e.which == 13 && ($('#questionField').val() !== "")) {//Enter key pressed
          $('#questionModal').click();//Trigger search button click event
          populateQuestionModal();
        }
      });
      $('#page-title').hide();
      break;
    case '#faq' :
      window.scrollTo(0, 0);
      $('#faq').show();
      $('#page-title').show();
      $('#fill-page-title').text('FAQ');
      break;

    case '#search' :
      window.scrollTo(0, 0);
      $('#search').show();
      $('#page-title').show();
      $('#fill-page-title').text('SEARCH');
      break;

    default :
      window.scrollTo(0, 0);
      $('#page-title').show();
      $('#shop').show();
      shopPage();
  }
}

function ljPink()
{
  $('#breast-cancer-banner').remove();
  $('#shopItems').empty();

  $('#shopItems').before('<img id="breast-cancer-banner" src="../img/lj-pink-banner.jpg">');
  breastprod =  '<div class="product clearfix GLB 11 800 1"><div class="product-image"><a href="#detail-view+1238AST+11+800+"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/1238AST-sm.jpg" alt="RGLB BRACELET BC ASSORTMENT"></a><div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item 1238AST has been added to your cart!" onclick="stock_no=\'1238AST\';  addItemDetailView2(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'1238AST\'; quickView(this.id);" id="1238AST+11+800+"><i class="icon-zoom-in2"></i><span id="1238AST+11+800+">Quick View</span></a></div></div><div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+1238AST+11+800+">RGLB BRACELET BREAST CANCER ASSORTMENT</a></h3></div><div class="product-price">cost &nbsp;$225.75</div></div></div>';
  breastprod += '<div class="product clearfix MAN 11 1000 1"><div class="product-image"><a href="#detail-view+12330+11+1000+"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/12330-sm.jpg" alt="MANTRA SCARF"></a><div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item 12330 has been added to your cart!" onclick="stock_no=\'12330\'; addItemDetailView2(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'12330\'; quickView(this.id);" id="12330+11+1000+"><i class="icon-zoom-in2"></i><span id="12330+11+1000+">Quick View</span></a></div></div><div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+12330+11+1000+">MANTRA BREAST CANCER AWARENESS SCARF</a></h3></div><div class="product-price">cost &nbsp;$8.75</div></div></div>';
  breastprod += '<div class="product clearfix GLB 800 1"><div class="product-image"><a href="#detail-view+12100B++800+"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/12100B-sm.jpg" alt="AWARENESS BRACELET ASSORTMENT"></a><div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item 12100B has been added to your cart!" onclick="stock_no=\'12100B\'; addItemDetailView2(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'12100B\'; quickView(this.id);" id="12100B++800+"><i class="icon-zoom-in2"></i><span id="12100B++800+">Quick View</span></a></div></div><div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+12100B++800+">KNOT BRACELET BREAST CANCER AWARENESS ASSORTMENT</a></h3></div><div class="product-price">cost &nbsp;$232.00</div></div></div>';
  $('#shopItems').html(breastprod);

}


/////////////////////////////////////////////
          // NON-STORE FUNCTIONS.. //
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////
/////////////////////////////////////////////

function peekView(clicked_id)
{
  var secondColumnQuick;
  jQuery.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {request_id: "APISTKDTL", stock_no: stock_no, session_no: session_no},
    success: function(response) {
      lines  = response.split("\n");
      fields = lines[1].split("|");

      var prodtype = fields[1].split(/(\s+)/);
					prodtype = prodtype[2];

			document.getElementById("quickViewimages").innerHTML = '<div class="slide" style="display: block;"><a href="#shop"><img src="https://www.laurajanelle.com/ljjpgimages/' + stock_no + '-md.jpg" alt="' + fields[1] + '"></a></div>';

      jQuery( "#secondColumn").prepend('<div><a href="#shop" title="Brand Logo" class="hidden-xs"><img class="image_fade" src="../img/logos/'+ fields[2] +'-logo.png" alt="Brand Logo"></a></div><div><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;">ITEM # <span class="sku">' + stock_no + '</span></span></div>');
      secondColumnQuick = '<a href="#" class="button button-black t300" onclick="showSidePanel();">login to see pricing</a><div class="line"></div>';
      if (fields[8].length !== 0)  {
         secondColumnQuick += '<p>' + fields[8] + '</p>';
      } else {
         secondColumnQuick += '<p>' + fields[1] + '</p>';
      }
    
      $("#description").append(secondColumnQuick);
      $("#quickViewForm").remove();
    }
  });
}



var min2 = [
"10401",
"10405",
"10407",
"10409",
"10410",
"10412",
"10413",
"10414",
"10375",
"10376",
"10377",
"10378",
"10379",
"10380",
"10381",
"10382",
"12330",
"10408",
"12356",
"12355",
"12354",
"18041BKS",
"18041BKL",
"18041LBSS",
"18041LBSL",
"18041LGHS",
"18041LGHL",
"18041LTPS",
"18041LTPL",
"18043LBLP",
"18043LGRY",
"18043LTRQ",
"18043LBLK",
"18043LIVY",
"18044LBLK",
"18044LPNK",
"18044LBLU"
];

specPrice = {
"10001":" $8.00 ",
"10002":" $10.00 ",
"10003":" $9.00 ",
"10005":" $15.00 ",
"10009":" $5.00 ",
"10013":" $8.00 ",
"10014":" $10.00 ",
"10015":" $9.00 ",
"10017":" $15.00 ",
"10021":" $5.00 ",
"10025":" $8.00 ",
"10026":" $10.00 ",
"10027":" $9.00 ",
"10029":" $15.00 ",
"10033":" $5.00 ",
"10037":" $8.00 ",
"10038":" $10.00 ",
"10039":" $9.00 ",
"10041":" $15.00 ",
"10045":" $5.00 ",
"10092":" $8.75 ",
"10093":" $8.75 ",
"10094":" $8.75 ",
"10095":" $8.75 ",
"10096":" $8.75 ",
"10097":" $8.75 ",
"10301":" $3.25 ",
"10302":" $3.25 ",
"10303":" $3.25 ",
"10304":" $3.25 ",
"10305":" $3.25 ",
"10306":" $3.25 ",
"10307":" $3.25 ",
"10308":" $3.25 ",
"10309":" $3.25 ",
"10310":" $3.25 ",
"10311":" $3.25 ",
"10312":" $3.25 ",
"10313":" $3.25 ",
"10314":" $3.25 ",
"10315":" $3.25 ",
"10316":" $3.25 ",
"10317":" $3.25 ",
"10318":" $3.25 ",
"10319":" $3.25 ",
"10320":" $3.25 ",
"10321":" $3.25 ",
"10322":" $3.25 ",
"10323":" $3.25 ",
"10324":" $3.25 ",
"10325":" $3.25 ",
"10326":" $3.25 ",
"10327":" $3.25 ",
"10328":" $3.25 ",
"10329":" $3.25 ",
"10330":" $3.25 ",
"10331":" $3.25 ",
"10332":" $3.25 ",
"10335":" $4.00 ",
"10341":" $4.00 ",
"10342":" $4.00 ",
"10344":" $4.00 ",
"10347":" $4.00 ",
"10350":" $4.00 ",
"10659":" $6.25 ",
"10660":" $6.25 ",
"10661":" $6.25 ",
"10662":" $6.25 ",
"10663":" $6.25 ",
"10664":" $6.25 ",
"10665":" $6.25 ",
"10666":" $6.25 ",
"10667":" $6.25 ",
"10668":" $6.25 ",
"10669":" $6.25 ",
"10670":" $6.25 ",
"10671":" $6.25 ",
"10672":" $6.25 ",
"10673":" $6.25 ",
"10674":" $6.25 ",
"10675":" $6.25 ",
"10676":" $6.25 ",
"10677":" $6.25 ",
"10678":" $6.25 ",
"10679":" $4.50 ",
"10680":" $4.50 ",
"10681":" $4.50 ",
"10682":" $4.50 ",
"10683":" $4.50 ",
"10684":" $4.50 ",
"10701":" $8.25 ",
"10702":" $8.25 ",
"10703":" $8.25 ",
"10704":" $8.25 ",
"10705":" $8.25 ",
"10706":" $8.25 ",
"10707":" $8.25 ",
"10708":" $8.25 ",
"10709":" $8.25 ",
"10710":" $8.25 ",
"10711":" $8.25 ",
"10712":" $8.25 ",
"10774":" $6.75 ",
"10775":" $6.75 ",
"10776":" $6.75 ",
"10777":" $6.75 ",
"10778":" $6.75 ",
"10779":" $6.75 ",
"10780":" $6.75 ",
"10781":" $6.75 ",
"10782":" $6.75 ",
"10783":" $6.75 ",
"10784":" $6.75 ",
"11101":" $3.00 ",
"11102":" $3.00 ",
"11103":" $3.50 ",
"11104":" $3.00 ",
"11105":" $11.00 ",
"11106":" $15.00 ",
"11107":" $7.50 ",
"11108":" $7.50 ",
"11109":" $7.50 ",
"11110":" $7.50 ",
"11121":" $3.00 ",
"11122":" $3.00 ",
"11123":" $3.50 ",
"11124":" $2.50 ",
"11125":" $15.00 ",
"11126":" $8.50 ",
"11127":" $12.50 ",
"11128":" $7.50 ",
"11129":" $7.50 ",
"11130":" $7.50 ",
"11131":" $5.00 ",
"11132":" $3.50 ",
"11133":" $3.00 ",
"11134":" $3.00 ",
"11135":" $12.50 ",
"11136":" $8.50 ",
"11137":" $10.00 ",
"11138":" $8.00 ",
"11139":" $7.50 ",
"11140":" $7.50 ",
"11301":" $7.50 ",
"11302":" $7.50 ",
"11303":" $7.50 ",
"11304":" $7.50 ",
"11305":" $7.50 ",
"11306":" $7.50 ",
"11307":" $7.50 ",
"11308":" $7.50 ",
"11309":" $7.50 ",
"11310":" $7.50 ",
"11311":" $7.50 ",
"11312":" $7.50 ",
"11337":" $9.00 ",
"11338":" $9.00 ",
"11339":" $9.00 ",
"11340":" $9.00 ",
"11341":" $9.00 ",
"11342":" $9.00 ",
"11343":" $9.00 ",
"11344":" $9.00 ",
"11345":" $9.00 ",
"11346":" $9.00 ",
"11347":" $9.00 ",
"11348":" $9.00 ",
"11349":" $7.50 ",
"11350":" $7.50 ",
"11351":" $7.50 ",
"11352":" $7.50 ",
"11353":" $7.50 ",
"11354":" $7.50 ",
"11355":" $7.50 ",
"11356":" $7.50 ",
"11357":" $7.50 ",
"11358":" $7.50 ",
"11359":" $7.50 ",
"11360":" $7.50 ",
"11361":" $7.50 ",
"11362":" $7.50 ",
"11363":" $7.50 ",
"11364":" $7.50 ",
"11365":" $7.50 ",
"11366":" $7.50 ",
"11367":" $7.50 ",
"11368":" $7.50 ",
"11369":" $7.50 ",
"11370":" $7.50 ",
"11371":" $7.50 ",
"11372":" $7.50 ",
"11373":" $7.50 ",
"11374":" $7.50 ",
"11375":" $7.50 ",
"11377":" $7.50 ",
"11378":" $7.50 ",
"11379":" $7.50 ",
"11380":" $7.50 ",
"11381":" $7.50 ",
"11384":" $7.50 ",
"12101":" $2.00 ",
"12102":" $2.00 ",
"12103":" $2.00 ",
"12104":" $2.00 ",
"12105":" $2.00 ",
"12106":" $2.00 ",
"12107":" $2.00 ",
"12108":" $2.00 ",
"12109":" $2.00 ",
"12110":" $2.00 ",
"12111":" $2.00 ",
"12112":" $2.00 ",
"12113":" $2.00 ",
"12114":" $2.00 ",
"12115":" $2.00 ",
"12116":" $2.00 ",
"12117":" $2.00 ",
"12118":" $2.00 ",
"12119":" $2.00 ",
"12120":" $2.00 ",
"12121":" $2.00 ",
"12122":" $2.00 ",
"12123":" $2.00 ",
"12124":" $2.00 ",
"13100":" $7.50 ",
"13101":" $7.50 ",
"13102":" $7.50 ",
"13103":" $7.50 ",
"13104":" $7.50 ",
"13107":" $7.50 ",
"13108":" $7.50 ",
"13126":" $7.50 ",
"13129":" $7.50 ",
"13136":" $7.50 ",
"13137":" $7.50 ",
"13139":" $7.50 ",
"12100A":" $232.00 ",
"12100B":" $232.00 ",
"1501AB":" $13.00 ",
"1501AIG":" $13.00 ",
"1501AIS":" $13.00 ",
"1501DM":" $13.00 ",
"1501PW":" $13.00 ",
"1501SF":" $13.00 ",
"1505AB":" $14.50 ",
"1505AIG":" $14.50 ",
"1505AIS":" $14.50 ",
"1505DM":" $14.50 ",
"1505LP":" $14.50 ",
"1505PW":" $14.50 ",
"1505SF":" $14.50 ",
"1506AIG":" $12.00 ",
"1506AIS":" $12.00 ",
"1506DM":" $12.00 ",
"1506PW":" $12.00 ",
"1506SF":" $12.00 ",
"1507EG":" $8.00 ",
"1507NB":" $8.00 ",
"1507WF":" $8.00 ",
"1507WP":" $8.00 ",
"1508GR":" $10.00 ",
"1508PS":" $10.00 ",
"1509AL":" $12.50 ",
"1509FM":" $12.50 ",
"1509FY":" $12.50 ",
"1509GR":" $12.50 ",
"1509MH":" $12.50 ",
"1509PS":" $12.50 ",
"1510AL":" $12.00 ",
"1510FM":" $12.00 ",
"1510FY":" $12.00 ",
"1510GR":" $12.00 ",
"1510MH":" $12.00 ",
"1510PS":" $12.00 ",
"1511FM":" $14.00 ",
"1511GR":" $14.00 ",
"1511PS":" $14.00 ",
"1512FM":" $14.50 ",
"1512FY":" $14.50 ",
"1512GR":" $14.50 ",
"1512MH":" $14.50 ",
"1512PS":" $14.50 ",
"1513GR":" $16.00 ",
"1513MH":" $16.00 ",
"1514FM":" $16.00 ",
"1514GR":" $16.00 ",
"1514MH":" $16.00 ",
"1601EG":" $12.00 ",
"1601NB":" $12.00 ",
"1601WF":" $12.00 ",
"1601WP":" $12.00 ",
"1602EG":" $14.50 ",
"1602WF":" $14.50 ",
"1602WP":" $14.50 ",
"1604EG":" $15.50 ",
"1604NB":" $15.50 ",
"1604WF":" $15.50 ",
"1604WP":" $15.50 ",
"1605EG":" $15.00 ",
"1605NB":" $15.00 ",
"1605WF":" $15.00 ",
"1605WP":" $15.00 ",
"1611EG":" $12.50 ",
"1611NB":" $12.50 ",
"1611WF":" $12.50 ",
"1611WP":" $12.50 ",
"1614EG":" $16.00 ",
"1614NB":" $16.00 ",
"1614WF":" $16.00 ",
"1614WP":" $16.00 ",
"1615EC":" $13.00 ",
"1615PM":" $13.00 ",
"1615RS":" $13.00 ",
"1615SL":" $13.00 ",
"1615VY":" $13.00 ",
"1618EC":" $15.00 ",
"1618PM":" $15.00 ",
"1618RS":" $15.00 ",
"1618SL":" $15.00 ",
"1619EC":" $22.00 ",
"1619PM":" $22.00 ",
"1619RS":" $22.00 ",
"1619SL":" $22.00 ",
"1620EC":" $9.00 ",
"1620PM":" $9.00 ",
"1620RS":" $9.00 ",
"1620SL":" $9.00 ",
"1621EC":" $11.00 ",
"1621PM":" $11.00 ",
"1621RS":" $11.00 ",
"1621SL":" $11.00 ",
"1622EC":" $15.00 ",
"1622PM":" $15.00 ",
"1622RS":" $15.00 ",
"1622SL":" $15.00 ",
"1624EC":" $12.50 ",
"1624RS":" $12.50 ",
"1625EC":" $12.00 ",
"1625PM":" $12.00 ",
"1625RS":" $12.00 ",
"1625SL":" $12.00 ",
"1627G":" $15.00 ",
"1627S":" $15.00 ",
"1701MG":" $10.00 ",
"1701MS":" $10.00 ",
"1702MG":" $7.50 ",
"1702MS":" $7.50 ",
"1703AL":" $14.00 ",
"1703PB":" $14.00 ",
"1703PR":" $14.00 ",
"1703SB":" $14.00 ",
"1708AL":" $14.00 ",
"1708PB":" $14.00 ",
"1708PR":" $14.00 ",
"1708SB":" $14.00 ",
"1709AL":" $14.00 ",
"1709PB":" $14.00 ",
"1709PR":" $14.00 ",
"1709SB":" $14.00 ",
"1710AL":" $15.00 ",
"1710PB":" $15.00 ",
"1710PR":" $15.00 ",
"1710SB":" $15.00 ",
"1711AL":" $18.00 ",
"1711PB":" $18.00 ",
"1711PR":" $18.00 ",
"1711SB":" $18.00 ",
"1712AL":" $15.00 ",
"1712PB":" $15.00 ",
"1712PR":" $15.00 ",
"1712SB":" $15.00 ",
"1714AL":" $30.00 ",
"1714PB":" $30.00 ",
"1714PR":" $30.00 ",
"1714SB":" $30.00 ",
"1715AL":" $19.00 ",
"1715PB":" $19.00 ",
"1715PR":" $19.00 ",
"1715SB":" $19.00 ",
"1717AL":" $10.00 ",
"1717PB":" $10.00 ",
"1717PR":" $10.00 ",
"1717SB":" $10.00 ",
"CD103":"$55.00",
"CD100":"$55.00",
"CD105":"$55.00",
"CD111":"$55.00",
"EXT107G":"$1.50",
"EXT107S":"$1.50",
};

special_item_numbers = Object.keys(specPrice);


document.addEventListener('DOMContentLoaded',function() {
  document.getElementsByClassName('sku_wrapper').onchange=prodDetails;
},false);

function prodDetails() {
  jQuery('span.sku_wrapper').on('DOMSubtreeModified',function(){
    var item = jQuery(".sku_wrapper").text();
    item = item.slice(5);
    item = item.substr(0, item.indexOf('-'));
  jQuery.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhelpers/laurajanelle-api/prod-details.php?",
    data: {
      data: item,
      location: 800
    },
    success: function (response) {
      console.log(response);
      jQuery("#single-product-custom-details").empty();
      Object.keys(response).forEach(function(k){

        details =  '<div class="product-detail-list"><strong class="text-uppercase">Materials:</strong> ' + response[k].materialdesc + '</div>';
        details += '<div class="product-detail-list"><strong class="text-uppercase">Features:</strong> ' + response[k].featuredesc + '</div>';
        details += '<div class="product-detail-list"><strong class="text-uppercase">Details:</strong> ' + response[k].detaildesc + '</div>';
        
        jQuery("#single-product-custom-details").html(details);
      });
      }
    });
  });
}


jQuery("ol.flex-control-nav").after('<img src="https://img.youtube.com/vi/ffUDdog0zOs/default.jpg" draggable="false">');

jQuery( "ol.flex-control-nav:last-child" ).on("click", function () {
  jQuery('span.sku_wrapper').hide();
});