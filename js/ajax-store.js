var cartheader;
var cartitems;
//var country;
//var countrylines;
var employee;
var fields;
var filters = {};
var hideCC = true;
var lines;
var newNumberOfOrders;
var numberOfOrders;
var orderAmt;
var session_no;
var shippingAddresses = [];
var notbanned = [
  "1051A", "10614", "10615", "10616", "10617", "10619", "10620",
  "10627", "10628", "10629", "10630", "10633", "10636", "10621",
  "10622", "10624", "10625", "10639", "10642", "10643", "10644",
  "12002", "12012", "12016", "12009", "11999", "12017", "12011",
  "12019", "12014", "12003", "12007", "12006", "12008", "12001",
  "11996", "11998", "12005", "12010", "12013", "11997", "12018",
  "12015", "12000", "12004", "1010A", "10101", "10100", "10102",
  "10103", "10104"
  ];
var sortItems = [
  "119002NA", "119002BA", "12002", "12012", "12016", "12009", 
  "11999", "12017", "12011", "12019", "12014", "12003", "12007", 
  "12006", "12008", "12001", "11996", "11998", "12005", "12010", 
  "12013", "11997", "12018", "12015", "12000", "12004", "1010A", 
  "10101", "10100", "10102", "10103", "10104",
  "11954", "11955", "11956", "11958", "11942", "11943", "11944", 
  "11963", "11967", "11969", "11972", "11985", "11986", "11987", 
  "11978", "11981", "11983", "11984", "11988", "11989", "11990", 
  "11945", "11946", "11947", "11948", "11949", "11950", "11951", 
  "11952", "11991", "11992", "11993", "11994", "11995", "11953", 
  "11929", "11930", "11932", "11934", "11935", "11936", "11937",
  "11939", "11940", "11941", "10105", "10106", "10107", "10108",
  "10109", "10110", "10111", "10112", "10113", "10114", "1041A", 
  "1042A", "10388", "10389", "10390", "10391", "10392", "10393", 
  "10394", "10395", "10396", "10397", "10398", "10399", "10400", 
  "10416", "10415", "10417", "1051A", "10614", "10615", "10616", "10617", "10619", "10620",
  "10627", "10628", "10629", "10630", "10633", "10636", "10621",
  "10622", "10624", "10625", "10639", "10642", "10643", "10644", "10599A", "10584", "10585", "10586", 
  "10587", "10588", "10589", "10590", "10591", "10592", "10593", 
  "10594", "10595", "CD051", "11421", "11422", "11423", "11424", 
  "11425", "11426", "11433", "11434", "11435", "11445", "11446", 
  "11447", "11427", "11428", "11429", "11430", "11431", "11432", 
  "11436", "11438", "11437", "11439", "11440", "11441", "11442", 
  "11443", "11444", "11448", "11449", "11450", "11451", "11452", 
  "11453", "11454", "11455", "11456", "11386", "11389", "11392",
  "11395", "11398", "11401", "11404", "11407", "11410", "11413",
  "11416", "11419", "11385", "11387", "11388", "11390", "11391", 
  "11393", "11394", "11396", "11397", "11399", "11400", "11402",
  "11403", "11405", "11406", "11408", "11409", "11411", "11412", 
  "11414", "11415", "11417", "11418", "11420", "1311A", "13100", 
  "13101", "13102", "13103", "13104", "13107", "13108", "13126", 
  "13129", "13136", "13137", "13139", "11300B", "11349", "11350", 
  "11351", "11352", "11353", "11354", "11355", "11356", "11357", 
  "11358", "11359", "11360", "11361", "11362", "11363", "11364", 
  "11365", "11366", "11367", "11368", "11369", "11370", "11371", 
  "11372", "11373", "11374", "11375", "11376", "11377", "11378",
  "11379", "11380", "11381", "11382", "11383", "11384", "10700B",
  "10713", "10714", "10721", "10715", "10716", "10723", "10717", 
  "10718", "10725", "10719", "10720", "10727", "10722", "10729",
  "10730", "10724", "10731", "10732", "10726", "10733", "10734", 
  "10728", "10735", "10736", "10743", "10744", "10745", "10746", 
  "10747", "10748", "10737", "10738", "10739", "10740", "10741", 
  "10742", "11300C", "11313", "11314", "11315", "11316", "11317",
  "11318", "11319", "11320", "11321", "11322", "11323", "11324",
  "11325", "11326", "11327", "11328", "11329", "11330", "11331",
  "11332", "11333", "11334", "11335", "11336", "11301", "11302", 
  "11303", "11304", "11305", "11306", "11307", "11308", "11309", 
  "11310", "11311", "11312", "10700D", "10700C", "10749", "10750", 
  "10751", "10752", "10753", "10754", "10755", "10756", "10757",
  "10758", "10759", "10760", "10767", "10768", "10767", "10768",
  "10769", "10770", "10771", "10772", "10761", "10762", "10763",
  "10764", "10765", "10766", "10773", "10774", "10775", "10776",
  "10777", "10778", "10779", "10780", "10781", "10782", "10783", 
  "10784", "11300A", "11337", "11338", "11339", "11340", "11341", 
  "11342", "11343", "11344", "11345", "11346", "11347", "11348", 
  "10700A", "10707", "10712", "10710", "10703", "10704", "10711", 
  "10701", "10705", "10702", "10706", "10708", "10709", "12100A", 
  "CD121", "12101", "12102", "12103", "12104", "12105", "12106", 
  "12107", "12108", "12109", "12110", "12111", "12112", "12113", 
  "12114", "12115", "12116", "12117", "12118", "12119", "12120", 
  "12121", "12122", "12123", "12124", "12100B", "CD121A","PIL107",
  "CD107", "34737029", "EXT107G", "EXT107S", "12714", "12715", 
  "12713", "12712", "12718", "12719", "12717", "12716", "12722", 
  "12723", "12721", "12720", "12734", "12735", "12733", "12732",
  "12706", "12707", "12705", "12704", "12710", "12711", "12709", "12708",
  "12726", "12727", "12725", "12724", "12730", "12731", "12729", "12728",
  "11740", "11741", "10050", "10052", "11732", "11733", "10074", "10075",
  "10058", "10059", "10060", "10061", "10057", "10076", "10072", "10073", 
  "10001A", "10092", "10093", "10094", "10095", "10096", "10097", "10000A",
  "CD100", "10025", "10026", "10027", "10029", "10031", "10032",
  "10033", "10034", "10036", "10035", "10028", "10030", "10037",
  "10038", "10039", "10041", "10043", "10044", "10045", "10046",
  "10048", "10047", "10040", "10042", "10013", "10014", "10015",
  "10017", "10019", "10020", "10021", "10022", "10024", "10023",
  "10016", "10018", "10001", "10002", "10003", "10005", "10007",
  "10008", "10009", "10010", "10012", "10011", "10004", "10006",
  "10900A", "CD109", "10900B", "CD109A", "10929", "10969", "10978",
  "10917", "10941", "10942", "10943", "10930", "10939", "10947",
  "10944", "10945", "10946", "10954", "10932", "10934", "10935",
  "10936", "10948", "10951", "10952", "10954","10955", "10957", 
  "10959", "10970", "10937", "10938", "10940", "10960", "10965", 
  "10966", "10971", "10974", "10975", "10976", "10972", "10973",
  "10977", "10979", "10949", "10950", "12900A","CD104W","10300V2A", 
  "10401", "10405", "10407", 
  "10409", "10410", "10412", "10413", "10414",  "12900", "12901", 
  "12902", "12903", "12904", "12905", "12906", "12907", "10301A",
  "10375", "10376", "10377", "10378", "10379", "10380", "10381",
  "10382", "12125", "12127", "12128", "12129", "12132", "12133", 
  "12134", "12135", "12137", "12138", "12139", "12141", "12148", 
  "12145", "12146", "12147", "10300A", "CD103", "10336",
  "10335", "10337", "10334", "10338", "10340", "10339", "10350",
  "10345", "10346", "10347", "10333", "10341", "10342", "10348",
  "10343", "10349", "10344", "10301", "10302", "10303", "10304",
  "10305", "10306", "10307", "10308", "10309", "10310", "10311",
  "10314", "10315", "10312", "10313", "10316", "10317", "10318",
  "10319", "10320", "10322", "10323", "10321", "10324", "10325",
  "10326", "10327", "10328", "10329", "10330", "10331", "10332",
  "11100A", "CD111", "11105", "11126", "11106", "11107", "11108",
  "11135", "11136", "11125", "11127", "11137", "11130", "11109",
  "11110", "11138", "11129", "11140", "11139", "11128", "11131",
  "11122", "11102", "11134", "11124", "11104", "11103", "11123",
  "11133", "11101", "11121", "11132", "11141", "11142", "11143",
  "11144", "11145", "11146", "10500A", "CD105", "10501", "10502",
  "10503", "10504", "10517", "10518", "10519", "10520", "10505",
  "10506", "10507", "10508", "10523", "10524", "10525", "10522",
  "10509", "10510", "10511", "10512", "10526", "10527", "10528",
  "10521", "10533", "10534", "10535", "10536", "10513", "10514",
  "10515", "10516", "10529", "10530", "10531", "10532", "10537",
  "10538", "10539", "10540", "10544", "10542", "10541", "10543"
];
var stock_no;
var username;



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
     country: createcountry
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
         loc_no: 800
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

  // $("#content").hide();
  $(".page-section").hide();
  $("#login-form").on("submit", function(e) {
     var goHead;
     e.preventDefault();
     username = $('#login-form-username').val();
     password = $('#login-form-password').val();

     $.ajax({
      type: "GET",
      url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
      data: {request_id: "APICLOGIN",
             username: username,
             password: password,
             loc_no: 800},
      success: function(response) {
        if (response.replace(/\s+/g,'').length === 25) {
          goHead = "go";
          $.get("https://www.laurajanelle.com/phphelper/savecart/session.php?customer=" + username.toLowerCase() + "", function(answer){
            if (answer === "0") {
              $.get("https://www.laurajanelle.com/phphelper/savecart/session.php?customer=" + username.toLowerCase() + "&sessid=" + response + "");
              session_no = response.replace(/\s+/g,'');
              localStorage.setItem('session_no', session_no);
            } else if (answer.length === 25 ) {
              localStorage.setItem('session_no', answer);
            }
            localStorage.setItem('username', username);
          }).done(function() {
            windowHash("shop");
            redirect("store");
          });
        } else {
          alert("Login credentials are incorrect, try again.");
          goHead = "stop";
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
function addItemDetailView()
{
  var detailViewQty;
  if (document.getElementById(stock_no)) {
    detailViewQty = document.getElementById(stock_no).value;
  } else {
    detailViewQty = "1";
  }

  // Save color and type in the 
  if (!localStorage.getItem(stock_no) || localStorage.getItem(stock_no) === "undefined" || localStorage.getItem(stock_no) === null ) {
    localStorage.setItem(stock_no, detailString);
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
      if (cartheader.length >=3 ){
        cartHeaderFields = cartheader[1].split("|");
        document.getElementById("top-cart-trigger").innerHTML += '<span>' + cartHeaderFields[24].trim() + '</span>';

        if ( window.location.hash === "#cart" || window.location.hash === "#checkout") {
          $(".cart-product-name.subtotal").html( '<span class="amount">' + cartHeaderFields[19].trim() + '</span>' );
          $(".cart-product-name.total").html( '<span class="amount color lead"><strong>' + cartHeaderFields[22].trim() + '</strong></span>');
        }
      }
    },
    complete: function () {
      if (callback && typeof(callback) === "function") {
        callback();
      }
    }
  });
  return false;
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

        item = '<tr class="cart_item products"><td class="cart-product-remove"><a href="#cart" class="remove" onclick="removeItem(this.id); return false;" id="' + data[1].replace(/\s+/g,'') + '" title="Remove this item"><i class="icon-trash2"></i></a></td>';
        item += '<td class="cart-product-thumbnail"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="https://www.laurajanelle.com/ljjpgimages/' + data[2].replace(/\s+/g,'') + '-sm.jpg" alt="' + data[3] + '"></a></td>';
        item += '<td class="cart-product-name"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '">' + data[3] + '</a></td>';
        item += '<td class="cart-product-price"><span class="amount">$' + data[7].substring(0, data[7].length - 3) + '</span></td>';
        item += '<td class="cart-product-quantity"><div class="quantity clearfix">';
        item += '<input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant['+i+']" onclick="changeQuantity(this);">';
        item += '<input type="text" name="quant['+i+']" min="1" value="' + data[6].replace(/\s+/g,'') + '" class="qty form-control input-number" id="' + data[2].replace(/\s+/g,'') + '" />';
        item += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant['+i+']" onclick="changeQuantity(this);"></div></td>';
        item += '<td class="cart-product-subtotal"><span class="amount">$' + data[8].substring(0, data[8].length - 4) + '</span></td></tr>';
        html.push(item);
        $("#updateCartButton").show();
      } else if ( window.location.hash === "#checkout" ) {
        item1 =  '<tr class="cart_item"><td class="cart-product-thumbnail"><a href=#detail-view+' + data[2].replace(/\s+/g,'') + '"><img width="64" height="64" src="https://www.laurajanelle.com/ljjpgimages/' + data[2].replace(/\s+/g,'') + '-sm.jpg" alt="' + data[3] + '"></a></td>';
        item1 += '<td class="cart-product-name"><a href="#detail-view+' + data[2].replace(/\s+/g,'') + '">' + data[3] + '</a></td>';
        item1 += '<td class="cart-product-quantity"><div class="quantity clearfix">' + data[6].replace(/\s+/g,'') + '</div></td>';
        item1 += '<td class="cart-product-subtotal"><span class="amount">$' + data[8].substring(0, data[8].length - 4) + '</span></td></tr>';
        $("#checkout-cartItemTable").append(item1);
      }
    }
  } else {

    item = '<tr class="cart_item products"><td class="cart-product-remove"><h1> Cart is empty</h1></td></tr>';
    html.push(item);
  }
  $("#minicart").append(html2.join(''));
}


//////////////////////////////
// Get Detail View for Item //
//////////////////////////////
function detailView(callback, callback2) {
  jQuery("#images, #secondColumn, #addInfo, #thirdColumn").empty();

  var dets;
  var secondColumn;
  var detailString;
  var color;
  var type;
  var metal;
  var secondImage;
  var hash = window.location.hash.split("+");
  var stock_no = hash[1];
  var productRating = [];

  if (hash[3] !== "" && hash.length === 5) {
    detailString = window.location.hash;
    color = hash[2];
    type = hash[3];
    metal = hash[4];
    localStorage.setItem(stock_no, detailString);
  } else if (localStorage.getItem(stock_no) !== null && localStorage.getItem(stock_no) != "undefined" && localStorage.getItem(stock_no).length >= 15) { //  add back if undefined ever comes up again
    dets = localStorage.getItem(stock_no).split("+");
    color = dets[2];
    type = dets[3];
    metal = dets[4];
  }

  url = "../ljjpgimages-2/" + stock_no + "-2-sm.jpg";
  $.get(url)
    .done(function () {
      secondImage = '<div class="slide" data-thumb="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-sm.jpg"><a href="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-lg.jpg" data-lightbox="gallery-item"><span class="zoom ex1"><img src="https://www.laurajanelle.com/ljjpgimages-2/' + stock_no + '-2-md.jpg"></span></a></div>';
      populateDetailView(secondImage, color, type, metal, callback, callback2, stock_no);
    }).fail(function () {
      // not exists code
      console.log("hey guys, there isn't a second image.");
      noSecondImage = '';
      populateDetailView(noSecondImage, color, type, metal, callback, callback2, stock_no);
    });
}

/////////////////////////////////////////////////
// Subroutine to Populate Detail-View Page //
/////////////////////////////////////////////////
function populateDetailView(secondImage, color, type, metal, callback, callback2, stock_no) {
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: "APISTKDTL",
      stock_no: stock_no,
      session_no: session_no
    },
    success: function (response) {
      // lines[0] is header row
      // lines[1]+ are data lines
      lines = response.split("\n");
      fields = lines[1].split("|");

      secondColumn = '<div class="row"><div class="col-sm-6 nobottommargin"><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;">ITEM # <span class="sku">' + fields[0].replace(/\s+/g, '') + '</span></span></div><div id="mainRatingDiv" class="col-sm-6 nobottommargin"></div></div><div class="line"></div>';
      secondColumn += '<div class="row"><div class="product-price col-sm-4" style="font-size: 16px; font-weight: 400;"> <ins>COST:&nbsp;' + fields[4] + '</ins></div><div class="col-sm-4 hidden-xs" style="top: 0px; margin: 0px;">MIN: 1</div>';
      if (fields[3] != ".00") {
        secondColumn += '<div class="product-rating col-sm-4" style="top: 0px; margin: 0px;">MSRP:&nbsp;' + fields[3] + '</div>';
      }
      secondColumn += '</div><div class="clear"></div><div class="line"></div><form class="cart nobottommargin clearfix" method="post" enctype="multipart/form-data"><div class="quantity clearfix">';
      secondColumn += '<input type="button" value="-" class="minus btn-number" data-type="minus" data-field="quant[1]" onclick="changeQuantity(this)">';
      secondColumn += '<input type="text" name="quant[1]" step="1" min="1" name="quantity" value="1" title="Qty" size="4" class="qty form-control input-number" id="' + fields[0].replace(/\s+/g, '') + '" />';
      secondColumn += '<input type="button" value="+" class="plus btn-number" data-type="plus" data-field="quant[1]" onclick="changeQuantity(this)"></div>';
      secondColumn += '<button type="button" id="add-item" class="add-to-cart button-3d button button-small" onclick="stock_no=\'' + fields[0].trim() + '\'; addItemDetailView();">Add to cart</button><a id="addReviewButton" href="#" data-toggle="modal" data-target="#reviewFormModal" class="add-to-cart button button-3d button-mini hidden-xs" onclick="populateReviewModal(); return false;">Add Review</a></form><div class="clear"></div><div class="line"></div>';

      if (fields[8]) {
        if (fields[8].length !== 0) {
          secondColumn += '<p>' + fields[8] + '</p>';
        } else {
          secondColumn += '<p>' + fields[1] + '</p>';
        }
      }

      thirdColumn = '<a title="Brand Logo" class="hidden-xs"><img class="image_fade" src="../img/logos/' + fields[2] + '-logo.png" alt="Brand Logo"></a><div class="divider divider-center"><i class="icon-circle-blank"></i></div>';

      info = '<tr><td>Description</td><td>' + fields[1] + '</td></tr>';
      info += '<tr><td>Dimensions</td><td>' + fields[6] + '</td></tr>';
      info += '<tr><td>Color</td><td>' + whatColor(color) + '</td></tr>';
      info += '<tr><td>Type</td><td>' + whatType(type) + '</td></tr>';
      info += '<tr><td>Look</td><td>' + whatLook(fields[2]) + '</td></tr>';
      info += '<tr><td>Metal Color</td><td>' + whatMetal(metal) + '</td></tr>';

      /* Fill in the pictures for the product */
      var pics = '<div class="fslider" data-pagi="false" data-arrows="false" data-thumbs="true"><div class="flexslider"><div class="slider-wrap" data-lightbox="gallery">';
      pics += '<div class="slide" data-thumb="https://www.laurajanelle.com/ljjpgimages/' + fields[0] + '-sm.jpg"><a href="https://www.laurajanelle.com/ljjpgimages/' + fields[0] + '-lg.jpg" title="' + fields[1] + '" data-lightbox="gallery-item"><span class="zoom ex1"><img src="https://www.laurajanelle.com/ljjpgimages/' + fields[0] + '-md.jpg" alt="' + fields[1] + '"></span></a></div>';
      pics += secondImage;
      pics += '</div></div></div>';
      if (fields[7]) {
        if (fields[7].trim().length === 3) {
          pics += '<div class="sale-flash">NEW!</div>';
        }
      }

      $("#images").html(pics);
      $("#secondColumn").html(secondColumn);
      $("#thirdColumn").prepend(thirdColumn);
      $("#addInfo").html(info);
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



///////////////////////////////////
  // Populate the Question Area //
///////////////////////////////////
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
<<<<<<< HEAD
  qLines += '<button type="submit" id="question-submit" name="question-submit" class="button button-small button-3d nomargin" value="submit" style="float: right;"onclick="$(\'#fakeSubQuestion\').click();">Send Email</button></form></div></div>';
=======
  qLines += '<button type="submit" id="question-submit" name="question-submit" class="button button-small button-3d nomargin" value="submit" onclick="$(\'#fakeSubQuestion\').click();" style="float: right;">Send Email</button></form></div></div>';
>>>>>>> master

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
      custrLines = '<p class="reviewSection lead topmargin-sm">No reviews have been submitted for this item.</>';
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
function updateCart()
{
  $("#updateCartButton").hide();
  var shoppingCart = {};
  var table = $("table tbody#cartItemTable");

  // loop thru cart and flatten the items that are repeated
  table.find('tr.products').each(function () {
    var line_no     = $(this).find('td:first-child a').attr('id');
    var stockNumber = $(this).find('td:nth-child(5) div input:nth-child(2)').attr('id');
    var qty         = parseInt($(this).find('td:nth-child(5) div input:nth-child(2)').val());

    if (!shoppingCart.hasOwnProperty(stockNumber)) {
      shoppingCart[stockNumber] = [qty, line_no];
      removeItemGeneric(session_no, line_no);
    } else {
      shoppingCart[stockNumber][0] += qty;
      removeItemGeneric(session_no, shoppingCart[stockNumber][1]);
      removeItemGeneric(session_no, line_no);
    }
  });
  $.each( shoppingCart, function( key, value ) {
    addItemGeneric(session_no, key, value[0]);
  });
  shopPage();
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
        $( "#success" ).click();
        $("#successMessage").empty();
       	var message =  '<h4 style="font-family: Lato;">The order # is: ' + newOrder + '</h4>';
            message += '<p>This is a confirmation that your order has been successfully received and is currently under process. You will receive an email soon with a copy of your invoice, which also includes the details of your order.</p>';
            message += '<p class="nobottommargin">Laura Janelle values your business and is continuously looking for ways to better satisfy their customers. Please do share with us if there is a way we can serve you better.</p>';

        document.getElementById("successMessage").innerHTML += message;

        windowHash("orders");
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
  if (typeof(session_no) === "undefined" || session_no.length !== 25) {
    pathArray = window.location.pathname.split( '/' );
    pathArray[pathArray.length - 2] = "retailerlogin";
    window.location.pathname = pathArray.join('/');
    alert("Please log in first.");
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



/////////////////////////////////////
  // SUBROUTINE TO FIND COLOR //
/////////////////////////////////////
function whatColor(colorCode)
{
  switch (colorCode) {
    case "1": color = "Silver";
      break;
    case "2": color = "Gold";
      break;
    case "3": color = "Black";
      break;
    case "4": color = "Blue";
      break;   
    case "5": color = "Brown";
      break;   
    case "6": color = "Clear";
      break;    
    case "7": color = "Green";
      break;    
    case "8": color = "Grey";
      break;   
    case "9": color = "Opal";
      break;
    case "10": color = "Orange";
      break;
    case "11": color = "Pink";
      break;
    case "12": color = "Purple";
      break;
    case "13": color = "Rainbow";
      break;
    case "14": color = "Red";
      break;
    case "15": color = "Tan";
      break;
    case "16": color = "Teal";
      break;
    case "17": color = "Turquoise";
      break;
    case "18": color = "White";
      break;
    case "19": color = "Yellow";
      break;
    case "20": color = "Mulitcolored";
      break;
    default:
    color = "N/A";
  }
  return color;
}



/////////////////////////////////////
   // SUBROUTINE TO FIND TYPE //
/////////////////////////////////////
function whatType(typeCode)
{
  switch (typeCode) {
    case "100": type = "Necklace";
    break;
    case "200": type = "Bracelet";
    break;
    case "300": type = "Earrings";
    break;
    case "400": type = "Lanyard";
    break;
    case "500": type = "Snap";
    break;
    case "600": type = "Tassel";
    break;
    case "700": type = "Set";
    break;
    case "800": type = "Program";
    break;
    case "850": type = "Display";
    break;
    case "900": type = "Oil";
    break;
    case "950": type = "Accessory";
    break;
    case "1000": type = "Scarf";
    break;
    case "1100": type = "Pendant";
    break;
    case "1200": type = "Purse";
    break;
    case "1300": type = "Wristlet";
    break;
    case "1400": type = "Brooch";
    break;
    case "1500": type = "Ring";
    break;
    case "1600": type = "Versatile";
    break;
    default:
    type = "N/A";
  }
  return type;
}



/////////////////////////////////////
   // SUBROUTINE TO FIND LOOK //
/////////////////////////////////////
function whatLook(lookCode)
{
  switch (lookCode) {
    case "SLK": look = "SLEEK";
    break;
    case "ENC": look = "enCHARMing";
    break;
    case "GLB": look = "RGLB";
    break;
    case "IDT": look = "iDentify";
    break;
    case "ZEN": look = "AURA";
    break;
    case "SRK": look = "Salt Rock";
    break;
    case "MAN": look = "MANTRA";
    break;
    case "TRS": look = "Natural Treasures";
    break;
    case "TEM": look = "TEAM SPIRIT!";
    break;
    default:
    look = "N/A";
  }
  return look;
}



/////////////////////////////////////
 // SUBROUTINE TO FIND METAL TYPE //
/////////////////////////////////////
function whatMetal(metalCode)
{
  switch (metalCode) {
    case "10": metal = "Gold";
    break;
    case "20": metal = "Silver";
    break;
    case "30": metal = "Antique Gold";
    break;
    case "40": metal = "Gunmetal";
    break;
    default:
    metal = "N/A";
  }
  return metal;
}



/////////////////////////
// Search API Function //
/////////////////////////
function search()
{
  var oldhash;
  
  if(event.keyCode == 13) {
    event.preventDefault();
    if ( window.location.hash != "#search" ) {
      oldhash = window.location.hash;
    }
    var searchTerm = $('#searchvalue').val();
    $.ajax({
      type: "GET",
      url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
      data: {
        request_id: "APISTKSEARCH",
        query: searchTerm,
        loc_no: 800},
      success: function(response) {
        $('#searchDiv').empty();
        
        windowHash("search");
        itemRender("searchDiv", response);
        $("#searchDiv").prepend('<button style="display: block; bottommargin-sm" type="button" class="button button-3d button-mini button-rounded button-black" onclick="$(\'#searchDiv\').empty(); windowHash(\''+oldhash+'\');">Close Search</button>');
      },
      complete: function(){
        SEMICOLON.initialize.lightbox();
      }
    });
  }
}


//////////////////////////
// Filter Function      //
//////////////////////////
function filterFunction2(a,b,c,d,e,f,g,h)
{
  // Delete after October PLease!!!!
  $('#breast-cancer-banner').remove();
  $.ajax({
    type: "GET",
    url: "https://netlink.laurajanelle.com:444/nlhtml/custom/netlink.php?",
    data: {
      request_id: a,
      level1: b,
      level2: c,
      level3: d,
      level4: e,
      level5: f,
      session_no: g,
      loc_no: h
    },
    success: function(response) {
      $('#shopItems').empty();
      itemRender("shopItems", response);
    },
    complete: function(){
      SEMICOLON.initialize.lightbox();
    }
  });
}

function itemRender(div,response)
{
  lines = response.split("\n");
  lines.shift();
  if ( lines.length <= 1) {
    document.getElementById(div).innerHTML += '<h1>There are no results</h1>';
  } else {
    html = [];
    linesPlus = [];
    for (i=0; i<lines.length - 1; i++) {
      linesPlus.push(lines[i].split("|"));
    }

    linesPlus.sort( function( a, b ) {
      retVal=0;
      if (sortItems.indexOf(a[0].trim()) != sortItems.indexOf( b[0].trim() )) retVal= sortItems.indexOf( a[0].trim() ) > sortItems.indexOf( b[0].trim() )?1:-1;
      return retVal;
    });
    for (i=0; i<linesPlus.length; i++) {
      flds = linesPlus[i];

      // blocking out new items for encharming
      // if ( banned.indexOf(flds[0].trim()) != -1 ) { continue; } 

      stringOfDetails = flds[0].trim() + '+' + flds[8].trim() + '+' + flds[9].trim() + '+' + flds[10].trim();
<<<<<<< HEAD
      prod =  '<div class="product clearfix ' + flds[2].trim() +" "+ flds[0].trim() +" "+ flds[8].trim() +" "+ flds[9].trim() +" "+ flds[10].trim() + 1 +'"><div class="product-image"><a href="#detail-view+' + stringOfDetails + '"><img class="shopimg" src="https://www.laurajanelle.com/ljimages/' + flds[0].trim()  + '-sm.png" alt="' + flds[1] + '"></a>';
=======
      prod =  '<div class="product clearfix ' + flds[2].trim() +" "+ flds[8].trim() +" "+ flds[9].trim() +" "+ flds[10].trim() + 1 +'"><div class="product-image"><a href="#detail-view+' + stringOfDetails + '"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/' + flds[0].trim()  + '-sm.jpg" alt="' + flds[1] + '"></a>';
>>>>>>> master
      if (flds[7].trim().length === 3) {
        prod += '<div class="sale-flash">NEW!</div>';
      }
      prod += '<div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item ' + flds[0].trim() + ' has been added to your cart!" onclick="stock_no=\'' + flds[0].trim() + '\'; detailString=\'#detail-view+' + stringOfDetails + '\'; addItemDetailView(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
      prod += '<a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'' + flds[0].trim() + '\'; quickView(this.id);" id="' + stringOfDetails + '"><i class="icon-zoom-in2"></i><span id="' + stringOfDetails + '">Quick View</span></a></div></div>';
      prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+' + stringOfDetails + '">' + flds[1] +'</a></h3></div><div class="product-price">cost &nbsp;<ins>$' + flds[4].trim() + '</ins></div></div></div>';

      html.push(prod);
    }
    document.getElementById(div).innerHTML += html.join('');
  }
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

      jQuery( "#secondColumn").prepend('<div><a href="#shop" title="Brand Logo" class="hidden-xs"><img class="image_fade" src="../img/logos/'+ fields[2] +'-logo.png" alt="Brand Logo"></a></div><div><span itemprop="productID" class="sku_wrapper" style="font-size: 24px; font-weight: 600;">ITEM # <span class="sku">' + stock_no + '</span></span></div><div class="line"></div><div class="product-price col_half" style="font-size: 16px; font-weight: 400;"><ins>COST:&nbsp;' + fields[4] + '</ins></div>');
      jQuery( ".minus" ).after( '<input type="text" name="quant[1]" step="1" min="1" name="quantity" value="1" title="Qty" size="4" class="qty form-control input-number" id="' + stock_no + '" />' );
      if (fields[8].length !== 0)  {
         secondColumnQuick = '<p>' + fields[8] + '</p>';
      } else {
         secondColumnQuick = '<p>' + fields[1] + '</p>';
      }
      $("#quickViewForm").append('<button type="button" id="add-item" class="add-to-cart button nomargin" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>The item(s) have been added to your cart!" onclick="detailString=\'#detail-view+' + clicked_id + '\'; addItemDetailView(); SEMICOLON.widget.notifications(this); shopPage(); return false;">Add to cart</button>');
      $("#description").append(secondColumnQuick);
    }
  });
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
        if( jQuery(this).find('.product-price').find('ins').length > 0 ) {
          price = jQuery(this).find('.product-price ins').text();
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
  cartHeader(minimumTotal); // cartHeader(); cartHeader(minimumTotal);

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
      break;
    case '#cart' :
      window.scrollTo(0, 0);
      $('#cart').show();
      shopPage();
      break;
    case '#checkout' :
      window.scrollTo(0, 0);
      $('#checkout').show();
      checkoutPage();
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
      break;
    case '#detail-view' :
      $('#detail-view').show();
      window.scrollTo(0, 0);
      detailView(getQuestions, getReviews);
      $('#questionField').keypress(function(e){
        if(e.which == 13 && ($('#questionField').val() !== "")) {//Enter key pressed
          $('#questionModal').click();//Trigger search button click event
          populateQuestionModal();
        }
      });
      break;
    case '#faq' :
      window.scrollTo(0, 0);
      $('#faq').show();
      break;

    case '#search' :
      window.scrollTo(0, 0);
      $('#search').show();
      break;
    default :
      window.scrollTo(0, 0);
      $('#shop').show();
      shopPage();
  }
}

function ljPink()
{
  $('#breast-cancer-banner').remove();
  $('#shopItems').empty();

  $('#shopItems').before('<img id="breast-cancer-banner" src="../img/lj-pink-banner.jpg">');
  breastprod =  '<div class="product clearfix GLB 11 800 1"><div class="product-image"><a href="#detail-view+1238AST+11+800+"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/1238AST-sm.jpg" alt="RGLB BRACELET BC ASSORTMENT"></a><div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item 1238AST has been added to your cart!" onclick="stock_no=\'1238AST\'; detailString=\'#detail-view+1238AST+11+800+\'; addItemDetailView(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'1238AST\'; quickView(this.id);" id="1238AST+11+800+"><i class="icon-zoom-in2"></i><span id="1238AST+11+800+">Quick View</span></a></div></div><div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+1238AST+11+800+">RGLB BRACELET BREAST CANCER ASSORTMENT</a></h3></div><div class="product-price">cost &nbsp;<ins>$225.75</ins></div></div></div>';
  breastprod += '<div class="product clearfix MAN 11 1000 1"><div class="product-image"><a href="#detail-view+12330+11+1000+"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/12330-sm.jpg" alt="MANTRA SCARF"></a><div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item 12330 has been added to your cart!" onclick="stock_no=\'12330\'; detailString=\'#detail-view+12330+11+1000+\'; addItemDetailView(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'12330\'; quickView(this.id);" id="12330+11+1000+"><i class="icon-zoom-in2"></i><span id="12330+11+1000+">Quick View</span></a></div></div><div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+12330+11+1000+">MANTRA BREAST CANCER AWARENESS SCARF</a></h3></div><div class="product-price">cost &nbsp;<ins>$8.75</ins></div></div></div>';
  breastprod += '<div class="product clearfix GLB 800 1"><div class="product-image"><a href="#detail-view+12100B++800+"><img class="shopimg" src="https://www.laurajanelle.com/ljjpgimages/12100B-sm.jpg" alt="AWARENESS BRACELET ASSORTMENT"></a><div class="product-overlay"><a href="#shop" class="add-to-cart" data-notify-position="top-right" data-notify-type="info" data-notify-msg="<i class=icon-info-sign></i>Item 12100B has been added to your cart!" onclick="stock_no=\'12100B\'; detailString=\'#detail-view+12100B++800+\'; addItemDetailView(); shopPage(); SEMICOLON.widget.notifications(this); return false;"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\'12100B\'; quickView(this.id);" id="12100B++800+"><i class="icon-zoom-in2"></i><span id="12100B++800+">Quick View</span></a></div></div><div class="product-desc center"><div class="product-title"><h3><a href="#detail-view+12100B++800+">KNOT BRACELET BREAST CANCER AWARENESS ASSORTMENT</a></h3></div><div class="product-price">cost &nbsp;<ins>$232.00</ins></div></div></div>';
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


function showSidePanel()
{
  $('.mfp-close').click();
  setTimeout(function(){ $('a.side-panel-trigger').click(); }, 250);
}


function showLook(look)
{
  $("#shop").empty();

  programs = {
    "sleek":  { 
      "items": ["10092", '117BES', "10029", "10038", "10044", "10042", "10019", "10004"],
      "description": [],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "SLK-logo.png"
    },
    "rglb":{ 
      "items": ["11300B", "11359", "10739", "11318", "11310", "10707", "12117", "11380"],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "GLB-logo.png"
    },
    "SRK":{ 
      "items": ["10900A", "10917", "10941", "10939", "10934", "10936", "10951", "10965"],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "SRK-logo.png"
    },
    "mantra":{ 
      "items": ["10301A", "10375", "10377", "10378", "10379", "10380", "10381", "10382"],
      "description": [],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "MAN-logo.png"
    },
    "encharming":{ 
      "items": ["1042A", "10389", "10399", "10336", "10340", "10339", "10334", "10328"],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "ENC-logo.png"
    },
    "aura":{ 
      "items": ["11100A", "11105", "11126", "11108", "11127", "11109", "11131", "11142"],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "ZEN-logo.png"
    },
    "identify":{ 
      "items": ["10588", "10500A", "10501", "10519", "10505", "10525", "10516", "10599A"],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "IDT-logo.png"
    },
    "treasures":{ 
      "items": ["11958", "11942", "11954", "11953", "11956", "11951", "11986", "11934"],
      "blurb": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa repellendus adipisci laborum placeat delectus labore cupiditate deserunt minus numquam consequatur esse, hic at earum illo animi eaque et, dolorem quo qui eos? Quam rerum possimus maxime veniam aut ratione eveniet aliquid cumque aspernatur ipsum libero quaerat, nam. Ad, sunt, error!",
      "logo":  "TRS-logo.png"
    }
  };
  
  var programBlurb  = '<div class="center showLooksButton"><button type="button" class="button button-black t300" style="width: 80%;" onclick="$(\'#shop\').fadeOut(\'slow\'); $(\'#theLooks\').fadeIn(\'slow\');">See All Looks</button></div><div class="line"></div>';
      programBlurb += '<div class="col_half center '+ look +'"><img src="../img/logos/'+ programs[look].logo +'" /></div><div class="col_half col_last center '+ look +'"><p>'+ programs[look].blurb +'</p></div>';

  programs[look].items.forEach( function (element) {
    programPreview =  '<div class="product clearfix "><div class="product-image"><a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\''+ element +'\'; peekView();"><img class="fadeInUp animated" src="https://www.laurajanelle.com/ljjpgimages/'+ element +'-sm.jpg"></a><div class="product-overlay showcase">';
    programPreview += '<a href="../shop-item.html" class="item-quick-view" data-lightbox="ajax" onclick="stock_no=\''+ element +'\'; peekView();"><i class="icon-zoom-in2"></i><span>Quick View</span></a></div></div></div>';
    $("#shop").append(programPreview);
  });

  $("#shop").prepend(programBlurb);
  $(".sleek, .rglb, .SRK, .mantra, .encharming, .aura, .identify, #theLooks").fadeOut("slow");
  $("."+look+", #shop").fadeIn("slow", function() {
    // Animation complete
    SEMICOLON.initialize.lightbox();
  });

  
}