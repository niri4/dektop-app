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


});
$(document).on('click', '#submit', function (e) {
  //alert(param1var);
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
     tx.executeSql('DROP TABLE Transcation');
     tx.executeSql('DROP TABLE Contact');
     tx.executeSql('DROP TABLE Product');
     tx.executeSql('DROP TABLE LastExport');
     tx.executeSql('DROP TABLE Owner');
     let myNotification = new Notification('Shaperzz Bill', {
       body: 'Successfully Reset Database'
     })

     myNotification.onclick = () => {
       console.log('Notification clicked')
     }
      //   var param1var = getQueryVariable("id");
       window.location = './index.html';
   });


})
function nullHandler2() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Product(Id INTEGER NOT NULL PRIMARY KEY, product_name TEXT NOT NULL, product_price TEXT NOT NULL,product_code TEXT)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack1);
});
function nullHandler() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Product(Id INTEGER NOT NULL PRIMARY KEY, product_name TEXT NOT NULL, product_price TEXT NOT NULL,product_code TEXT)', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack1);
});


function errorHandler(transaction, error) {
  alert('Error: ' + error.message + ' code: ' + error.code);
   console.log('Error: ' + error.message + ' code: ' + error.code);
}
function successCallBack1() {

console.log("DEBUGGING: success");


}

function successCallBack() {
console.log("DEBUGGING: success");


}
