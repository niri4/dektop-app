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
  var param1var = getQueryVariable("id");
  //alert(param1var);
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
     tx.executeSql('UPDATE Transcation SET e_way_bill_no= ? WHERE Id= ?', [$('#e_way_bill_no').val(),param1var]);
     let myNotification = new Notification('Shaperzz Bill', {
       body: 'Successfully  Add E-Way Bill No'
     })

     myNotification.onclick = () => {
       console.log('Notification clicked')
     }
      //   var param1var = getQueryVariable("id");
       window.location = './invoice.html?id=' + param1var;
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
