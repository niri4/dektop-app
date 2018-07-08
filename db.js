// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   console.log('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
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
                   console.log(result.rows);
                   if (result.rows.length == 0){

                    successCallBack1();
                   }
                   else{
                     $("#class_access").hide();
                     if (result.rows[0].logout == 1){
                       console.log("DEBUGGING: success");
                       $("#loader").show();
                       $("#class_access").hide();
                       window.location="./login.html";
                     }
                     else{
                       successCallBack();
                     }
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
       tx.executeSql('CREATE TABLE IF NOT EXISTS Owner(Id INTEGER NOT NULL PRIMARY KEY, name TEXT NOT NULL, place TEXT,state TEXT,gstin TEXT,address TEXT,address1 TEXT,pincode TEXT,password TEXT,logout TEXT,email TEXT,access_token TEXT)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack1);
});
ListDBValues();
$(document).on('click', '#submit', function () {
  var email = $('#email').val();
  var access_token = $('#access_token').val();
  var ha ={};
  $.ajax({url: "http://sandbox.shaperzz.com/api/v1/billing_app_check?email=" + email + "&access_token=" + access_token ,
         type: 'POST',
         email: email,
         access_token: access_token,
     }).done(function( msg ) {

       var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
       db.transaction(function (tx) {
           tx.executeSql('INSERT INTO Owner(place,address,address1,state,pincode,gstin,name,password,email,logout,access_token) VALUES (?,?,?,?,?,?,?,?,?,?,?)', [msg["billing_app"]["place"],msg["billing_app"]["address"], msg["billing_app"]["address1"],
           msg["billing_app"]["state"],msg["billing_app"]["postal_code"],msg["billing_app"]["gstin"], msg["billing_app"]["name"],"123456",email,0,access_token], nullHandler, errorHandler);
       });
       ListDBValues();
     });
   // var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   // db.transaction(function (tx) {
   //     //tx.executeSql('INSERT INTO Owner(place,address,state,pincode,gstin,name) VALUES (?,?,?,?,?,?)', [$('#email').val(),$('#email').val(),$('#email').val(),$('#email').val(),$('#email').val(), $('#email').val()], nullHandler, errorHandler);
   // });
})
