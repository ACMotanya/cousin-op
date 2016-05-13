$("#idForm").submit(function(e) {

    var url = "path/to/your/script.php"; // the script where you handle the form input.

    $.ajax({
           type: "GET",
           url: url,
           data: $("#idForm").serialize(), // serializes the form's elements.
           success: function(data)
           {
               alert(data); // show response from the php script.
           }
         });

    e.preventDefault(); // avoid to execute the actual submit of the form.
});

//breadcrumb var lines;
var flds;
var breadtitle;
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
        breadtitle = '<h1>' + flds[2] + '</h1>';
        breadtitle += '<span>Made With Swarovski Cystals</span>';
        breadtitle += '<ol class="breadcrumb">';
          breadtitle += '<li><a href="#">Home</a></li>';
          breadtitle += '<li>Shop</li>';
          breadtitle += '<li class="active">Sleek</li>';
        breadtitle += '</ol>';
      document.getElementById("breadcrumbtitle").innerHTML += breadtitle;
    }
  });

//return all items
var lines;
var flds;
var prod;
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
        prod = '<div class="product clearfix"><div class="product-image">';
        prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
        prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
        prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
    document.getElementById("shop").innerHTML += prod;
  }
});


// Search function not working.
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKSEARCH",
 query: ""},
 function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
     prod = '<div class="product clearfix"><div class="product-image">';
     prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
     prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
     prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
     document.getElementById("shop").innerHTML += prod;
  }
});


// return all SLEEK
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "LJ10000",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
     prod = '<div class="product clearfix"><div class="product-image">';
        prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
        prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
        prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
    document.getElementById("shop").innerHTML += prod;
  }
});


// return all enCharming
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "LJ10300",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
     prod = '<div class="product clearfix"><div class="product-image">';
        prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
        prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
        prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
    document.getElementById("shop").innerHTML += prod;
  }
});

// return all iDentify
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "LJ10500",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
     prod = '<div class="product clearfix"><div class="product-image">';
        prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
        prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
        prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
    document.getElementById("shop").innerHTML += prod;
  }
});

// return all RGLB
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "LJ10700",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
     prod = '<div class="product clearfix"><div class="product-image">';
        prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
        prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
        prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
    document.getElementById("shop").innerHTML += prod;
  }
});


// RETURN ALL BRACELETS
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "LJ10700",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
     prod = '<div class="product clearfix"><div class="product-image">';
        prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
        prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
        prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
    document.getElementById("shop").innerHTML += prod;
  }
});


// RETURN ALL BRACELETS
$.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
{request_id: "APISTKLST",
 level1: "LJ10700",
 level2: "",
 level3: "",
 level4: "",
 level5: ""},
function(response) {
  lines = response.split("\n");
  // lines[0] is header row
  // lines[1]+ are data lines
  for (i=1; i<lines.length - 1; i++) {
     flds = lines[i].split("|");
     prod = '<div class="product clearfix"><div class="product-image">';
        prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
        prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
        prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';
    document.getElementById("shop").innerHTML += prod;
  }
});
