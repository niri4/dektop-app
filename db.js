// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   console.log('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
  debugger;
   console.log("DEBUGGING: success");
   $("#loader").show();
   $("#class_access").hide();
   window.location="./bill.html";
}
function successCallBack1() {
   console.log("DEBUGGING: success");
   // $("#loader").show();
   // $("#class_access").hide();
   // window.location="./bill.html";
}
//This is for Listing values present in the database
function ListDBValues() {
   $('#msgbox').html('');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Owner;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows.length);
                   if (result.rows.length == 0){

                    successCallBack1();
                   }
                   else{
                     $("#class_access").hide();
                     successCallBack();
                   }


               }
               else {
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

     // Drop Query
     //tx.executeSql('DROP TABLE Owner');
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Owner(Id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, place TEXT,state TEXT,gstin TEXT,address TEXT,pincode TEXT)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack1);
});
ListDBValues();
$(document).on('click', '#submit', function () {
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       tx.executeSql('INSERT INTO Owner(place,address,state,pincode,gstin,name) VALUES (?,?,?,?,?,?)', [$('#email').val(),$('#email').val(),$('#email').val(),$('#email').val(),$('#email').val(), $('#email').val()], nullHandler, errorHandler);
   });
   ListDBValues();
})
