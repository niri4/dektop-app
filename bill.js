//This is for Listing values present in the database
// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
  alert('Error: ' + error.message + ' code: ' + error.code);
   console.log('Error: ' + error.message + ' code: ' + error.code);

}

$( document ).ready(function() {
    ListDBValues();
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
