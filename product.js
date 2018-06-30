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
   $('#product_id').html('');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Product;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.Name)
                       $('#product_id').append("<tr>" + "\n" + "<td>" + row.Id + "</td>" + "\n" + "<td>" + row.product_name + "</td>" +
                           "\n"  + "<td>" + row.product_price + "</td>" + "\n" + "<td>" + row.product_code + "</td>" +  "\n" + "<td>" + "<button class='btn btn-primary' id='del' value=" + row.Id +  "> Delete</button>" +  "</td>" + "\n" +  "</tr>");
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
       tx.executeSql("DELETE FROM Product WHERE Id =" + isd );
   });
   ListDBValues();
})

function nullHandler() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Product(Id INTEGER NOT NULL PRIMARY KEY, product_name TEXT NOT NULL, product_price TEXT NOT NULL,product_code TEXT)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});
ListDBValues();
$(document).on('click', '#submit', function () {
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       tx.executeSql('INSERT INTO Product (product_name, product_price, product_code) VALUES (?, ?,?)', [$('#ProductName').val(), $('#ProductPrice').val(), $('#ProductCode').val()], nullHandler, errorHandler);
   });
   let myNotification = new Notification('Shaperzz Bill', {
     body: 'Product created successfully'
   })

   myNotification.onclick = () => {
     console.log('Notification clicked')
   }
   ListDBValues();
})
