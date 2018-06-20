//This is for Listing values present in the database
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
  //alert('Error: ' + error.message + ' code: ' + error.code);
   console.log('Error: ' + error.message + ' code: ' + error.code);
}

$(document.body).on('click', '.change1', function()
{
  a = $("#selection :input").serialize();
  var b = a.split('&');
  var key=[];
  var value = [];
  for (var i = 0; i < b.join(' ').split('=').length; i++) {
  var ffff = b.join(' ').split('=').join(',').split(',')[i];
    if(i == 0) {
      key.push(ffff.split(' ')[0]);
    }
    else{
      key.push(ffff.split(' ')[1]);
      value.push(ffff.split(' ')[0]);
    }
  }
  var hash = {};
  for (var j = 0; j < key.filter(x => x != null).length; j++) {
    if (key[j] in hash){
      hash[key[j]] = hash[key[j]] + ',' + value[j];
    }
    else{
      hash[key[j]] = value[j];
    }
  }
  calculate_hash_on_delete(hash,row_num - 1 );
  for (var j = 0; j < key.filter(x => x != null).length; j++) {
    hash[key[j]] = hash_change(row_num - 1 , hash[key[j]])

  }
  console.log(hash);

});

function calculate_hash_on_delete(hash,index){
  var quantity = hash["quantity"];
  var value_array = hash["taxable_value"].split(',');
  var cgst_ar = hash["cgst"].split(',');
  var sgst_ar =  hash["sgst"].split(',');
  var igst_ar = hash["igst"].split(',');
  var cess_ar = hash["cess"].split(',');
  var total_val = hash["total_taxable_value"];
  var cgst_val = hash["cgst_amount"];
  var sgst_val = hash["sgst_amount"];
  var igst_val = hash["igst_amount"];
  var cess_val = hash["cess_amount"];
  var qar = quantity.split(',');

    var f = (qar[index] * value_array[index]);
    total_val = total_val - (qar[index] * value_array[index]);
    if (cgst_ar[index] != null){
      cgst_val = cgst_val - ( (f * cgst_ar[index])/100 );
    }
    if (sgst_ar[index] != null){
      sgst_val = sgst_val - ( (f * sgst_ar[index])/100 );
    }
    if (igst_ar[index] != null){
      igst_val = igst_val - ( (f * igst_ar[index])/100 );
    }
    if (cess_ar[index] != null){
      cess_val = cess_val - ( (f * cess_ar[index])/100 );
    }

  alert(parseInt(cgst_val));
  $('#total_taxable_value').val(total_val);
  $('#cgst_amount').val(cgst_val);
  $('#sgst_amount').val(sgst_val);
  $('#igst_amount').val(igst_val);
  $('#cess_amount').val(cess_val);


}

function hash_change(index,val){
    vd = val.split(',');
    vd[index] = null;
    return vd.join(',');
}

$(document.body).on('change', '.change', function()
{
  a = $("#selection :input").serialize();
  var b = a.split('&');
  var key=[];
  var value = [];
  for (var i = 0; i < b.join(' ').split('=').length; i++) {
  var ffff = b.join(' ').split('=').join(',').split(',')[i];
    if(i == 0) {
      key.push(ffff.split(' ')[0]);
    }
    else{
      key.push(ffff.split(' ')[1]);
      value.push(ffff.split(' ')[0]);
    }

  }
  var hash = {};
  for (var j = 0; j < key.filter(x => x != null).length; j++) {
    if (key[j] in hash){
      hash[key[j]] = hash[key[j]] + ',' + value[j];
    }
    else{
      hash[key[j]] = value[j];
    }
  }
  // alert(key.filter(x => x != null));
  // alert(value);
  // alert("hash");
  // alert(hash["unit"]);
  console.log(hash);
  calculate_hash(hash);
})

function  calculate_hash(hash){
  var quantity = hash["quantity"];
  var value_array = hash["taxable_value"].split(',');
  var cgst_ar = hash["cgst"].split(',');
  var sgst_ar =  hash["sgst"].split(',');
  var igst_ar = hash["igst"].split(',');
  var cess_ar = hash["cess"].split(',');
  var total_val =0;
  var cgst_val =0;
  var sgst_val =0;
  var igst_val =0;
  var cess_val =0;
  var qar = quantity.split(',');
  for (var j = 0; j < qar.length; j++) {
    var f = (qar[j] * value_array[j]);
    total_val = total_val + (qar[j] * value_array[j]);
    if (cgst_ar[j] != null){
      cgst_val = cgst_val + ( (f * cgst_ar[j])/100 );
    }
    if (sgst_ar[j] != null){
      sgst_val = sgst_val + ( (f * sgst_ar[j])/100 );
    }
    if (igst_ar[j] != null){
      igst_val = igst_val + ( (f * igst_ar[j])/100 );
    }
    if (cess_ar[j] != null){
      cess_val = cess_val + ( (f * cess_ar[j])/100 );
    }


  }
  alert(parseInt(cgst_val));
  $('#total_taxable_value').val(total_val);
  $('#cgst_amount').val(cgst_val);
  $('#sgst_amount').val(sgst_val);
  $('#igst_amount').val(igst_val);
  $('#cess_amount').val(cess_val);

}

function change_val(){
   $("#selection :input").serialize();

}

$('body').on('click', '.delete_row', function() {
   $(this).parents('tr').remove();
   rowget();
   change_val();
   val = findrow();
   if (val== 2){
     $('.delete_row').hide();
   }
   else{
     $('.delete_row').show();
   }
});


function findrow() {
    var x = document.getElementById("mytable").rows.length;
    return x;
}

$("#insert-more").click(function () {
    $("#mytable").each(function () {
        var tds = '<tr>';
        jQuery.each($('tr:last td', this), function () {
            tds += '<td>' + $(this).html() + '</td>';
        });
        tds += '</tr>';
        if ($('tbody', this).length > 0) {
            $('tbody', this).append(tds);
        } else {
            $(this).append(tds);
        }
    });
    rowget();
    change_val();
    val = findrow();
    if (val== 2){
      $('.delete_row').hide();
    }
    else{
      $('.delete_row').show();
    }
});

$( document ).ready(function() {
    ListDBValues();
    ListDBProductValues();
    val = findrow();
    $('input').keypress(function(event) {
    if (event.keyCode == 13) {
        event.preventDefault();
    }
});
    if (val== 2){
      $('.delete_row').hide();
    }
    else{
      $('.delete_row').show();
    }
});

function ListDBValues() {
   $('#biller_name').html('<option>--Please Select --</option>');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Contact;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.Name)
                       $('#biller_name').append("<option value=" + row.Id + ">" + row.Id + '. ' +
                           row.name +   "</option>");
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler);

   return;
}

function ListDBProductValues() {
   $('#product_select').html('<option>--Please Select --</option>');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Product;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.Name)
                       $('#product_select').append("<option value=" + row.Id + ">" + row.Id + '. ' +
                           row.product_name +   "</option>");
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler);

   return;
}

$(document).on('change', '#biller_name', function () {
  var isd = $(this).val();
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql("SELECT * FROM Contact WHERE Id =" + isd + ";", [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       $('#biller_gstin').val(row.gstin);
                       $('#biller_state').val(row.state);
                       $('#shipping_address').val(row.address);
                       $('#shipping_address1').val(row.address1);
                       $('#shipping_place').val(row.place);
                       $('#shiping_pincode').val(row.pincode);
                       $('#shiping_state').val(row.state);
                       $('#shiping_place').val(row.place);

                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler);
})


$(document).on('change', '#product_select', function () {
  var isd = $(this).val();

  $(this).closest('tr').find("input[id='hsn']").each(function() {

    var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
    db.transaction(function (transaction) {
        transaction.executeSql("SELECT * FROM Product WHERE Id =" + isd + ";", [],
            function (transaction, result) {
                if (result != null && result.rows != null) {
                    console.log(result.rows)
                    for (var i = 0; i < result.rows.length; i++) {
                        var row = result.rows.item(i);
                        var pr = row;
                    }
                }
            }, errorHandler);
    }, errorHandler, nullHandler);



  });
})

function rowget(){
  $("#mytable td").click(function() {

          var column_num = parseInt( $(this).index() ) + 1;
           row_num = parseInt( $(this).parent().index() )+1;
      });

}
var row_num =0;
   $(document).ready(function(){
     rowget();

  })

function nullHandler() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Contact(Id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, address TEXT NOT NULL ,city TEXT NOT NULL ,state TEXT NOT NULL,address1 TEXT,country TEXT NOT NULL, place TEXT NOT NULL,pincode TEXT NOT NULL,gstin TEXT NOT NULL) ', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});
// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");

}
