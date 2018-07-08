// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
  //alert('Error: ' + error.message + ' code: ' + error.code);
   console.log('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");

}
//This is for Listing values present in the database
function ListDBValues() {
   $('#transcation_id').html('');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM LastExport', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.Id);
                       if ( i == 0){
                         $('#export_detail').html('Last export on:' + row.export_date);

                       }
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler);

   return;
}




function nullHandler() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS LastExport(Id INTEGER NOT NULL PRIMARY KEY, export_date TEXT) ', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});
ListDBValues();

//document_date,ownwer_name,owmer_gstin,ownwer_address,ownwer_address1,owner_place,owner_state,owner_pincode,biller_name,biller_gstin,biller_state,shipping_address,shipping_address1,shiping_place,shiping_state,shiping_pincode,product_select,product_description,hsn,quantity,unit,taxable_value,cgst,sgst,igst,cess,total_taxable_value,cgst_amount,sgst_amount,igst_amount,cess_amount,total_amount
