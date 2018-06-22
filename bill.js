var global_hash = {};
function errorHandler(transaction, error) {
  alert('Error: ' + error.message + ' code: ' + error.code);
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
  global_hash = hash;
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
  var totl = total_val + cgst_val + sgst_val + igst_val + cess_val;
  $('#total_taxable_value').val(total_val);
  $('#cgst_amount').val(cgst_val);
  $('#sgst_amount').val(sgst_val);
  $('#igst_amount').val(igst_val);
  $('#cess_amount').val(cess_val);
  $('#total_amount').val(totl);


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
  global_hash = hash;
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
  var totl = total_val + cgst_val + sgst_val + igst_val + cess_val;
  $('#total_taxable_value').val(total_val);
  $('#cgst_amount').val(cgst_val);
  $('#sgst_amount').val(sgst_val);
  $('#igst_amount').val(igst_val);
  $('#cess_amount').val(cess_val);
  $('#total_amount').val(totl);

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
                       $('#biller_name').append("<option value=" + row.name + " id= " + row.Id + ">" + row.Id + '. ' +
                           row.name +   "</option>");
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler2);

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
                       $('#product_select').append("<option value=" + row.product_name + " id= " + row.Id + ">" + row.Id + '. ' +
                           row.product_name +   "</option>");
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler1);

   return;
}

$(document).on('change', '#biller_name', function () {
  var isd = $(this).children(":selected").attr("id");
  alert(isd);
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
   }, errorHandler, nullHandler1);
})


$(document).on('change', '#product_select', function () {
    var isd = $(this).children(":selected").attr("id");

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
    }, errorHandler, nullHandler2);



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

function nullHandler1() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Contact(Id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, address TEXT NOT NULL ,city TEXT NOT NULL ,state TEXT NOT NULL,address1 TEXT,country TEXT NOT NULL, place TEXT NOT NULL,pincode TEXT NOT NULL,gstin TEXT NOT NULL) ', [], nullHandler1, errorHandler);
   }, errorHandler, successCallBack);
});

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
       tx.executeSql('CREATE TABLE IF NOT EXISTS Transcation(Id INTEGER NOT NULL PRIMARY KEY, transcation_type TEXT, sub_type TEXT ,document_type TEXT,document_no TEXT,document_date TEXT,ownwer_name TEXT, owmer_gstin TEXT,owner_state TEXT,ownwer_address TEXT,ownwer_address1 TEXT,owner_place TEXT,owner_pincode TEXT,biller_name TEXT,biller_gstin TEXT,biller_state TEXT,shipping_address TEXT,shipping_address1 TEXT,shiping_place TEXT,shiping_state TEXT,shiping_pincode TEXT,product_select TEXT,product_description TEXT,hsn TEXT,quantity TEXT,unit TEXT,taxable_value TEXT,cgst TEXT,sgst TEXT,igst TEXT,cess TEXT,total_taxable_value TEXT,cgst_amount TEXT,sgst_amount TEXT,igst_amount TEXT,cess_amount TEXT,total_amount TEXT,tansporter_name TEXT,transporter_id TEXT,approxiamate_distance TEXT,mode TEXT,vehicle_type TEXT,vehicle_no TEXT) ', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});
// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");


}

$(document).on('click', '#submit', function (e) {
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       tx.executeSql('INSERT INTO Transcation (transcation_type, sub_type,document_type,document_no,document_date,ownwer_name,owmer_gstin,ownwer_address,ownwer_address1,owner_place,owner_state,owner_pincode,biller_name,biller_gstin,biller_state,shipping_address,shipping_address1,shiping_place,shiping_state,shiping_pincode,product_select,product_description,hsn,quantity,unit,taxable_value,cgst,sgst,igst,cess,total_taxable_value,cgst_amount,sgst_amount,igst_amount,cess_amount,total_amount,tansporter_name,transporter_id,approxiamate_distance,mode,vehicle_type,vehicle_no) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [$('input[name=transcation_type]:checked').val(), $('input[name=sub_type]:checked').val(), $('#document_type').val(), $('#document_no').val(), $('#document_date').val(),  $('#ownwer_name').val(), $('#owmer_gstin').val(), $('#ownwer_address').val(), $('#ownwer_address1').val(),$('#owner_place').val(), $('#owner_state').val(), $('#owner_pincode').val(),$('#biller_name').val(),$('#biller_gstin').val(),$('#biller_state').val(),$('#shipping_address').val(),$('#shipping_address1').val(),$('#shiping_place').val(),$('#shiping_state').val(),$('#shiping_pincode').val(),global_hash["product_select"],global_hash["product_description"],global_hash["hsn"],global_hash["quantity"],global_hash["unit"],global_hash["taxable_value"],global_hash["cgst"],global_hash["sgst"],global_hash["igst"],global_hash["cess"],$('#total_taxable_value').val(),$('#cgst_amount').val(),$('#sgst_amount').val(),$('#igst_amount').val(),$('#cess_amount').val(),$('#total_amount').val(),$('#tansporter_name').val(),$('#transporter_id').val(),$('#approxiamate_distance').val(),$('input[name=mode]:checked').val(),$('input[name=vehicle_type]:checked').val(),$('#vehicle_no').val()], nullHandler, errorHandler);
   });
   let myNotification = new Notification('Shaperzz Bill', {
     body: 'Bill Created Successfully'
   })

   myNotification.onclick = () => {
     console.log('Notification clicked')
   }

})
