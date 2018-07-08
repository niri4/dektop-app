$(document).on('click', '#logout', function () {
  var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('UPDATE Owner SET logout= ? WHERE Id= ?', [1,1]);
    let myNotification = new Notification('Shaperzz Bill', {
      body: 'Successfully  Logout'
    })

    myNotification.onclick = () => {
      console.log('Notification clicked')
    }
     //   var param1var = getQueryVariable("id");
      window.location = './login.html';
  });
})




// this is called when an error happens in a transaction
function errorHandler(transaction, error) {
   console.log('Error: ' + error.message + ' code: ' + error.code);

}

// this is called when a successful transaction happens
function successCallBack() {
   console.log("DEBUGGING: success");
   $("#loader").show();
   $("#class_access").hide();
}
function successCallBack1() {
   console.log("DEBUGGING: success");
   // $("#loader").show();
   // $("#class_access").hide();
   // window.location="./bill.html";
}
//This is for Listing values present in the database
function check_result(email, password) {
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Owner;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows.length);
                   if (result.rows.length == 0){
                     let myNotification = new Notification('Shaperzz Bill', {
                       body: 'Database Reset Please Setup Properly.'
                     })

                     myNotification.onclick = () => {
                       console.log('Notification clicked')
                     }
                   }
                   else{
                     if ((result.rows[0].email == email) && (result.rows[0].password == password)){
                       var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
                       db.transaction(function (tx) {

                         tx.executeSql('UPDATE Owner SET logout= ? WHERE Id= ?', [0,1]);
                         let myNotification = new Notification('Shaperzz Bill', {
                           body: 'Successfully  Login'
                         })

                         myNotification.onclick = () => {
                           console.log('Notification clicked')
                         }
                          //   var param1var = getQueryVariable("id");
                           window.location = './bill.html';
                       });
                     }
                     else{
                         let myNotification = new Notification('Shaperzz Bill', {
                           body: 'Invalid password or email'
                         })

                         myNotification.onclick = () => {
                           console.log('Notification clicked')
                         }
                     }
                   }


               }
               else {
                 return false;
               }
           });
   });
}

function nullHandler() {};
   // var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   // db.transaction(function (tx) {
   //     //tx.executeSql('INSERT INTO Owner(place,address,state,pincode,gstin,name) VALUES (?,?,?,?,?,?)', [$('#email').val(),$('#email').val(),$('#email').val(),$('#email').val(),$('#email').val(), $('#email').val()], nullHandler, errorHandler);
   // });


$(document).on('click', '#login', function () {
  var ch = check_result($('#email').val(),$('#password').val());
})


$(document).on('click', '#profile_update', function () {
  if (($('#new_password').val() != '') && ($('#new_password').val() != ' ')){
    if ($('#new_password').val() == $('#confirm_password').val()){
      var ch = profile_update($('#current_password').val(),$('#new_password').val(),$('#pro_email').val());
    }
    else{

      let myNotification = new Notification('Shaperzz Bill', {
        body: 'new password and confirm password not match'
      })

      myNotification.onclick = () => {
        console.log('Notification clicked')
      }

    }

  }
  else{
    let myNotification = new Notification('Shaperzz Bill', {
      body: 'new password should be enter'
    })

    myNotification.onclick = () => {
      console.log('Notification clicked')
    }
  }

})


function profile_update(current_password, new_password,email) {
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Owner;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows.length);
                   if (result.rows.length == 0){
                     let myNotification = new Notification('Shaperzz Bill', {
                       body: 'Database Reset Please Setup Properly.'
                     })

                     myNotification.onclick = () => {
                       console.log('Notification clicked')
                     }
                   }
                   else{
                     if ((result.rows[0].email == email) && (result.rows[0].password == current_password)){
                       var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
                       db.transaction(function (tx) {
                         tx.executeSql('UPDATE Owner SET password= ? WHERE Id= ?', [new_password,1]);
                         let myNotification = new Notification('Shaperzz Bill', {
                           body: 'Successfully  Login'
                         })

                         myNotification.onclick = () => {
                           console.log('Notification clicked')
                         }
                          //   var param1var = getQueryVariable("id");
                           window.location = './bill.html';
                       });
                     }
                     else{
                         let myNotification = new Notification('Shaperzz Bill', {
                           body: 'something went wrong'
                         })

                         myNotification.onclick = () => {
                           console.log('Notification clicked')
                         }
                     }
                   }


               }
               else {
                 return false;
               }
           });
   });
}


$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Owner;', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows.length);
                   if (result.rows.length == 0){
                   }

                   else{
                     $('#pro_email').val(result.rows[0].email);
                     $('#pro_access_token').val(result.rows[0].access_token);
                   }


               }
               else {
               }
           });
   });
});
