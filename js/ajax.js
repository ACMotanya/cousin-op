var fields;
var breadtitle;
var collection;
var lines;
var flds;
var prod;
var type;

$(document).keypress(function(e) {
    if(e.which == 13) {
      $.get("http://192.168.123.17:8080/nlhtml/custom/netlink.php?",
      {request_id: "APISTKSEARCH",
       query: "bracelet"},
      function(response) {
        lines = response.split("\n");
        // lines[0] is header row
        // lines[1]+ are data lines
        fields = lines[1].split("|");

        for (i=1; i<lines.length - 1; i++) {
          flds = lines[i].split("|");
    //          prod = '<div class="product clearfix"><div class="product-image">';
    //          prod += '<a href="#"><img src="http://api.netlink.ninja/nlhtml/images/shop/' + flds[3] + '" alt="' + flds[1] + '"></a>';
    //          prod += '<div class="product-overlay"><a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a><a href="include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a></div></div>';
    //          prod += '<div class="product-desc center"><div class="product-title"><h3><a href="#">' + flds[1] + '</a></h3></div><div class="product-price">' + flds[4] + '</div><div class="product-rating"><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star3"></i><i class="icon-star-half-full"></i><i class="icon-star-empty"></i></div></div>';

              prod = '<div class="product clearfix pf-dress">';
                prod += '<div class="product-image">';
                  prod += '<a href="#"><img src="{{ site.baseurl }}/ljimages/' + flds[0].replace(/\s+/g,'') + '-lg.png" alt="' + flds[1] + '"></a>';
                  prod += '<a href="#"><img src="{{ site.baseurl }}/images/shop/dress/1-1.jpg" alt="Checked Short Dress"></a>';
                //  prod += 'div class="sale-flash">50% Off*</div>'
                  prod += '<div class="product-overlay">';
                    prod += '<a href="#" class="add-to-cart"><i class="icon-shopping-cart"></i><span> Add to Cart</span></a>';
                    prod += '<a href="{{ site.baseurl }}/include/ajax/shop-item.html" class="item-quick-view" data-lightbox="ajax"><i class="icon-zoom-in2"></i><span> Quick View</span></a>';
                  prod += '</div>';
                prod += '</div>';
              prod += '</div>';
          document.getElementById("results").innerHTML += prod;
        }
     });
    }
});
