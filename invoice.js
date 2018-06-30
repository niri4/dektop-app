
var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num,sd) {
if ((num = num.toString()).length > 9) return 'overflow';
n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
if (!n) return; var str = '';
str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + sd + ' ' + 'and'  : '';
return str;


}

function getQueryVariable(variable) {
var query = window.location.search.substring(1);
var vars = query.split("&");
for (var i=0;i<vars.length;i++) {
var pair = vars[i].split("=");
if (pair[0] == variable) {
  return pair[1];
}
}
//alert('Query Variable ' + variable + ' not found');
}
$(document).ready(function () {
  var param1var = getQueryVariable("id");
  add_params(param1var);
  //alert(param1var);

});

function add_params(isd) {
   //$('#owner_name').html();
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql("SELECT * FROM Transcation WHERE Id =" + isd + ";", [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       if (i== 0){
                         $('#owner_name').html(row.ownwer_name.toUpperCase());
                         $('#owner_names').html(row.ownwer_name.toUpperCase());
                         $('#bg-text').html(row.ownwer_name.toUpperCase());
                         $('#owner_gst').html(row.owmer_gstin);
                         if (row.ownwer_address1 == ""){
                           $('#owner_address').html(row.ownwer_address.toUpperCase());
                         }
                         else{
                           $('#owner_address').html(row.ownwer_address.toUpperCase() + " "+ row.ownwer_address1.toUpperCase());
                         }
                         $('#owner_place_and_state').html(row.owner_place.toUpperCase() + "," + row.owner_state.toUpperCase());
                         $('#biller_name').html(row.biller_name.toUpperCase());

                         if (row.ownwer_address1 == ""){
                            $('#biller_address').html(row.shipping_address.toUpperCase());
                         }
                         else{
                            $('#biller_address').html(row.shipping_address.toUpperCase() + " " + row.shipping_address1.toUpperCase());
                         }
                         $('#biller_state').html(row.shiping_state.toUpperCase());
                         $('#biller_place').html(":" + toTitleCase(row.shiping_state));
                         $('#biller_gstin').html("GSTIN" + " " + row.biller_gstin);

                         $('#transaction_id').html(":" + row.document_no);
                         $('#document_date').html(":"+ row.document_date);
                         $('#biller_states').html(":" + toTitleCase(row.shiping_place));
                         $('#transport_no').html(":" + row.transporter_id);
                         $('#vehicle_no').html(":" + row.vehicle_no);
                         productdetail(row);
                       }

                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler2);
}


function productdetail(row){
  var product_select = row.product_select.split(',');
  var product_description = row.product_description.split(',');
  var cgst = row.cgst.split(',');
  var igst = row.igst.split(',');
  var sgst = row.sgst.split(',');
  var cess = row.cess.split(',');
  var hsn = row.hsn.split(',');
  if (row.unit != null){
  var unit = row.unit.split(',');
  }
  var quantity = row.quantity.split(',');
  var taxable_value = row.taxable_value.split(',');
  var gst =[];
  var gst_type = [];

  var gst_amount = (parseFloat(row.cgst_amount) + parseFloat(row.igst_amount) + parseFloat(row.sgst_amount) + parseFloat(row.cess_amount));
  var total_amount = row.total_amount;
  var number = row.total_amount + ".0";
  var d = number.toString();
  var rup = d.split('.')[0];
  var paise = d.split('.')[1];
  var myString = inWords(paise,"Paise");
  var n = myString.split(" ");;
  var res = n[n.length - 1];
  if (res == "and")
  {
  myString = myString.substring(0, myString.lastIndexOf(" "));
  }
  var rupeestring = inWords(rup,"Rupees");
  var nrs = rupeestring.split(" ");;
  var resrs = nrs[nrs.length - 1];
  if ((resrs == "and" )&& (d.split('.')[1] == null))
  {
  rupeestring = rupeestring.substring(0, rupeestring.lastIndexOf(" "));
  }
  var inword  =  rupeestring + " " + myString  + " " + "Only";
  $("#grand_total").html(row.total_amount);
  $("#grand_total_rs").html(row.total_amount);
  $("#total_tax_val").html(row.total_taxable_value);
  $("#after_discount").html(row.total_taxable_value - row.total_discount);
  $("#discount_per").html(row.discount + "%");
  $("#discount_val").html("-" + row.total_discount);
  var total_quantity = quantity;
  $("#grand_total_unit").html("Grand Total" + " " + total_quantity.reduce(getSum) + " "+ unit[0]);
  $("#inword").html(toTitleCase(inword));
  $('#product_detail').html(' ');
  for (var i = 0; i < product_select.length; i++) {
    $('#product_detail').append("<tr>" + "\n" + "<td>" +( i + 1 )+ "</td>" + "\n" + "<td>" + product_select[i] + "</td>" +
        "\n"  + "<td>" + hsn[i] + "</td>" + "\n"  + "<td>" + quantity[i] + "</td>" + "\n"  + "<td>" + unit[i] + "</td>" +  "\n" + "<td>" + taxable_value[i] + "</td>" +  "\n"
        + "<td>" +( quantity[i] * taxable_value[i]) + "</td>" +  "\n" +  "</tr>");
    if (cgst[i] != "0" ){

        gst_type.push("CGST");

      gst.push(cgst[i]);
    }
    if (sgst[i] != "0" ){

        gst_type.push("SGST");

      gst.push(sgst[i]);
    }
    if (igst[i] != "0" ){

        gst_type.push("IGST");

      gst.push(igst[i]);
    }
    if (cess[i] != "0" ){

        gst_type.push("CESS");

      gst.push(cess[i]);
    }
  }

  $("#gst_type").html("ADD:" + " " + gst_type.join(','));
  $("#gst_per").html("@" + gst + "%");
  $("#gst_val").html(gst_amount);


}

function getSum(total, num) {
    return parseInt(total) + parseInt(num);
}

function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}


function nullHandler2() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Product(Id INTEGER NOT NULL PRIMARY KEY, product_name TEXT NOT NULL, product_price TEXT NOT NULL,product_code TEXT)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});
function nullHandler() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Product(Id INTEGER NOT NULL PRIMARY KEY, product_name TEXT NOT NULL, product_price TEXT NOT NULL,product_code TEXT)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});


function errorHandler(transaction, error) {
  //alert('Error: ' + error.message + ' code: ' + error.code);
   console.log('Error: ' + error.message + ' code: ' + error.code);
}
function successCallBack() {
   console.log("DEBUGGING: success");


}
