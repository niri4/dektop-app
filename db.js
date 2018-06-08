// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   console.log('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");

}
//This is for Listing values present in the database
function ListDBValues() {
   $('#msgbox').html('');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Msg;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.Name)
                       $('#msgbox').append('<br>' + row.MsgId + '. ' +
                           row.Name + ' ' + row.Msg);
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
       tx.executeSql('CREATE TABLE IF NOT EXISTS Msg(MsgId INTEGER NOT NULL PRIMARY KEY, Name TEXT NOT NULL, Msg TEXT NOT NULL)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});
ListDBValues();
$(document).on('click', '#submit', function () {
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       tx.executeSql('INSERT INTO Msg (Name, Msg) VALUES (?, ?)', [$('#name').val(), $('#msg').val()], nullHandler, errorHandler);
   });
   ListDBValues();
})
