// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
  alert('Error: ' + error.message + ' code: ' + error.code);
   console.log('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");

}
//This is for Listing values present in the database
function ListDBValues() {
   $('#contact_id').html('');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Contact;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.name)
                       $('#contact_id').append("<tr>" + "\n" + "<td>" + row.Id + "</td>" + "\n" + "<td>" + row.name + "</td>" +
                           "\n"  + "<td>" + row.address + "</td>" + "\n"  + "<td>" + row.state + "</td>" + "\n"  + "<td>" + row.place + "</td>" +"\n" + "<td>" + "<button class='btn btn-primary' id='del' value=" + row.Id +  "> Delete</button>" +  "</td>" + "\n" +  "</tr>");
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler);

   return;
}

$(document).on('click', '#del', function () {
  var isd = $(this).val();
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       tx.executeSql("DELETE FROM Contact WHERE Id =" + isd );
   });
   ListDBValues();
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
ListDBValues();
$(document).on('click', '#submit', function () {
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       tx.executeSql('INSERT INTO Contact (name, gstin,state,address,address1,place,pincode,country,city) VALUES (?,?,?,?,?,?,?,?,?)', [$('#Name').val(), $('#gstin').val(), $('#state').val(), $('#address').val(), $('#address1').val(), $('#place').val(), $('#pincode').val(), $('#country').val(),$('#city').val()], nullHandler, errorHandler);
   });
   ListDBValues();
})
