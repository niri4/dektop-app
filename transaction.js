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
       transaction.executeSql('SELECT * FROM Transcation', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.transcation_type);
                       $('#transcation_id').append("<tr>" + "\n" + "<td>" + row.Id + "</td>" + "\n" + "<td>" + row.transcation_type + "</td>" +
                           "\n"  + "<td>" + row.sub_type + "</td>" + "\n" + "<td>" + row.document_type + "</td>" + "\n" +  "<td>" +  "<button class='btn btn-primary'  id='modeltrans' value=" + row.Id +  "> Detail</button>" + "</td>" + "\n" + "<td>" + "<button class='btn btn-primary' id='del' value=" + row.Id +  "> Delete</button>" +  "</td>"+ "\n" + "<td>" + "<button class='btn btn-success' id='print' value=" + row.Id +  "> Print</button>" +  "</td>" + "\n" +  "</tr>");
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler);

   return;
}


function ListDBSAVE() {
   $('#print_id').html('');
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (transaction) {
       transaction.executeSql('SELECT * FROM Transcation', [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.transcation_type);
                       $('#print_id').append("<tr>" + "\n" +
                        "<td>" + row.Id + ' ' + "</td>" + "\n" +
                        "<td>" + row.transcation_type + ' ' + "</td>" + "\n"  +
                         "<td>" + row.sub_type  + ' ' + "</td>" + "\n" +
                         "<td>" + row.document_type + ' ' + "</td>" + "\n" +
                         "<td>" + row.document_no + ' '  + "</td>" + "\n" +
                          "<td>" + row.document_date + ' ' + "</td>" + "\n" +
                          "<td>" + row.biller_name + ' ' + "</td>" + "\n" +
                          "<td>" + row.biller_gstin + ' ' + "</td>" + "\n" +
                          "<td>" + row.biller_state + ' ' + "</td>" + "\n" +
                          "<td>" + row.shipping_address + " " + row.shipping_address1 + "</td>" + "\n" +
                          "<td>" + row.shiping_place + ' ' + "</td>" + "\n" +
                          "<td>" + row.shiping_state  + ' ' + "</td>" + "\n" +
                          "<td>" + row.shiping_pincode + ' ' + "</td>" + "\n" +
                          "<td>" + row.product_select + ' ' + "</td>" + "\n" +
                          "<td>" + row.product_description + ' '  + "</td>" + "\n" +
                          "<td>" + row.hsn + ' ' + "</td>" + "\n" +
                          "<td>" + row.unit + ' ' + "</td>" + "\n" +
                          "<td>" + row.quantity + ' '  + ' ' + "</td>" + "\n" +
                          "<td>" + row.taxable_value + ' ' + ' ' + "</td>" + "\n" +
                          "<td>" + row.cgst + "%" + ' ' +  "</td>" + "\n" +
                          "<td>" + row.sgst + "%" + ' ' + "</td>" + "\n" +
                          "<td>" + row.igst + "%" + ' ' +  "</td>" + "\n" +
                          "<td>" + row.cess + "%" + ' ' +  "</td>" + "\n" +
                          "<td>" + row.total_taxable_value + ' ' +  "</td>" + "\n" +
                          "<td>" + row.cgst_amount + ' ' +  "</td>" + "\n" +
                          "<td>" + row.sgst_amount + ' ' +  "</td>" + "\n" +
                          "<td>" + row.igst_amount + ' ' +  "</td>" + "\n" +
                          "<td>" + row.cess_amount  + ' '+  "</td>" + "\n" +
                          "<td>" + row.total_amount  + ' ' +  "</td>" + "\n" +
                          "<td>" + row.tansporter_name  +  "</td>" + "\n" +
                          "<td>" + row.transporter_id  +  "</td>" + "\n" +
                          "<td>" + row.approxiamate_distance +  "</td>" + "\n" +
                          "<td>" + row.mode  + ' ' +  "</td>" + "\n" +
                          "<td>" + row.vehicle_type + ' '  +  "</td>" + "\n" +
                          "<td>" + row.vehicle_no  + ' ' +  "</td>" + "\n" +
                          "<td>" + row.discount + "%" + ' '  +  "</td>" + "\n" +
                          "<td>" + row.total_discount  + ' ' +  "</td>" + "\n" +
                          "<td>" + row.e_way_bill_no  + ' ' +  "</td>" + "\n" +
                          "</tr>");
                   }
               }
           }, errorHandler);
   }, errorHandler, nullHandler);

   return;
}

function date_tody() {
  var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear();

if(dd<10) {
    dd = '0'+dd
}

if(mm<10) {
    mm = '0'+mm
}

return today =  dd + '/' + mm + '/' + yyyy;
}

$(document).on('click', '#csv_formet', function () {
  var date_todys = date_tody();
  $('#formats-table').tableExport({type:'csv',fileName: 'Shaperzz_bill_history' + '_' + date_todys });
  export_date_data(date_todys);
})
$(document).on('click', '#excel_formet', function () {
  var date_todys = date_tody();
  $('#formats-table').tableExport({type:'excel',fileName: 'Shaperzz_bill_history' + '_' + date_todys });
  export_date_data(date_todys);
})
$(document).on('click', '#xml_formet', function () {
  var date_todys = date_tody();
  $('#formats-table').tableExport({type:'excel',fileName: 'Shaperzz_bill_history' + '_' + date_todys,
                          mso: {fileFormat:'xmlss',
                                worksheetName: ['Table 1','Table 2', 'Table 3']}});
  export_date_data(date_todys);
})

$(document).on('click', '#text_formet', function () {
  var date_todys = date_tody();

  $('#formats-table').tableExport({type:'txt',fileName: 'Shaperzz_bill_history' + '_' + date_todys });
  export_date_data(date_todys);
})
$(document).on('click', '#modeltrans', function () {
  var isd = $(this).val();
  particular_ele(isd);
})

function export_date_data(date_todys) {
  var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
  db.transaction(function (tx) {
    tx.executeSql('DROP TABLE  LastExport');
    tx.executeSql('CREATE TABLE IF NOT EXISTS LastExport(Id INTEGER NOT NULL PRIMARY KEY, export_date TEXT)');
      tx.executeSql('INSERT INTO LastExport (export_date ) VALUES (?)', [date_todys], nullHandler, errorHandler);
  });
  $('#export_detail').html('Last export on:' + date_todys);
  let myNotification = new Notification('Shaperzz Bill', {
    body: 'Export request ready for download'
  })

  myNotification.onclick = () => {
    console.log('Notification clicked')
  }

}

function  particular_ele(isd){
  $('#result_render').html('');
  var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
  db.transaction(function (transaction) {
      transaction.executeSql("SELECT * FROM Transcation WHERE Id =" + isd, [],
          function (transaction, result) {
              if (result != null && result.rows != null) {
                  console.log(result.rows)
                  for (var i = 0; i < result.rows.length; i++) {
                      var row = result.rows.item(i);
                      console.log(row.transcation_type);
                      $('#result_render').append("<tr>" + '\n' +"<th>" + "Id" + "</th>" +  "\n" + "<td>" + row.Id + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Transaction Type" + "</th>" +  "\n" + "<td>" + row.transcation_type + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Sub Type" + "</th>" +  "\n" + "<td>" + row.sub_type + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Document Type" + "</th>" +  "\n" + "<td>" + row.document_type + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Document Number" + "</th>" +  "\n" + "<td>" + row.document_no + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Document Date" + "</th>" +  "\n" + "<td>" + row.document_date + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Buyer Name" + "</th>" +  "\n" + "<td>" + row.biller_name + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Buyer GSTIN" + "</th>" +  "\n" + "<td>" + row.biller_gstin + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Buyer State" + "</th>" +  "\n" + "<td>" + row.biller_state + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Shipping Address" + "</th>" +  "\n" + "<td>" + row.shipping_address + ' '+ row.shipping_address1 + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Shipping Place" + "</th>" +  "\n" + "<td>" + row.shiping_place + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Shipping State" + "</th>" +  "\n" + "<td>" + row.shiping_state + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Shipping Pincode" + "</th>" +  "\n" + "<td>" + row.shiping_pincode + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Product Select" + "</th>" +  "\n" + "<td>" + row.product_select + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Product Description" + "</th>" +  "\n" + "<td>" + row.product_description + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "HSN" + "</th>" +  "\n" + "<td>" + row.hsn + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Quantity" + "</th>" +  "\n" + "<td>" + row.quantity + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Unit" + "</th>" +  "\n" + "<td>" + row.unit + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Taxable Value" + "</th>" +  "\n" + "<td>" + row.taxable_value + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Total Taxable Value" + "</th>" +  "\n" + "<th>" + row.total_taxable_value +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "CGST" + "</th>" +  "\n" + "<td>" + row.cgst + "%"+ "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Total CGST Amount" + "</th>" +  "\n" + "<td>" + row.cgst_amount + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "SGST" + "</th>" +  "\n" + "<td>" + row.sgst + "%"+ "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Total SGST Amount" + "</th>" +  "\n" + "<td>" + row.sgst_amount +  "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "IGST" + "</th>" +  "\n" + "<td>" + row.igst + "%"+ "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Total IGST Amount" + "</th>" +  "\n" + "<td>" + row.igst_amount + "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "CESS" + "</th>" +  "\n" + "<td>" + row.sgst + "%"+ "</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Total CESS Amount" + "</th>" +  "\n" + "<td>" + row.cess_amount +"</td>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Tansporter Name" + "</th>" +  "\n" + "<th>" + row.tansporter_name +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Transporter Id" + "</th>" +  "\n" + "<th>" + row.transporter_id +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Approxiamate Distance" + "</th>" +  "\n" + "<th>" + row.approxiamate_distance +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Mode" + "</th>" +  "\n" + "<th>" + row.mode +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Vehicle Type" + "</th>" +  "\n" + "<th>" + row.vehicle_type +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Vehicle Number" + "</th>" +  "\n" + "<th>" + row.vehicle_no +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "E-Way Bill Number" + "</th>" +  "\n" + "<th>" + row.e_way_bill_no +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Discount" + "</th>" +  "\n" + "<th>" + row.discount + "%" + "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Total Discount" + "</th>" +  "\n" + "<th>" + row.total_discount +  "</th>" + "\n" + " </tr>" + "\n" +
                    "<tr>" + '\n' +"<th>" + "Total Amount" + "</th>" +  "\n" + "<th>" + row.total_amount +  "</th>" + "\n" + " </tr>" + "\n"
                  );
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
       tx.executeSql("DELETE FROM Transcation WHERE Id =" + isd );
   });
   ListDBValues();
})

$(document).on('click', '#print', function () {
  var isd = $(this).val();
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       tx.executeSql("SELECT *  FROM Transcation WHERE Id =" + isd, [],
           function (transaction, result) {
               if (result != null && result.rows != null) {
                   console.log(result.rows)
                   for (var i = 0; i < result.rows.length; i++) {
                       var row = result.rows.item(i);
                       console.log(row.transcation_type);
                       if (i==0){
                         if (row.total_amount > 50000){
                           if(row.e_way_bill_no == null){
                             window.location = './ebill.html?id=' + isd;
                           }
                           else{
                             window.location = './invoice.html?id=' + isd;
                           }
                         }
                         else{
                           window.location = './invoice.html?id=' + isd;
                         }

                       }

                   }
               }
           }, errorHandler);
   });
})


function nullHandler() {};
$(document).ready(function () {
   // Opening a existing database or creating a new one if don't exist
   var db = openDatabase('mydb-test', '1.0', 'sqllite test database', 2 * 1024 * 1024);
   db.transaction(function (tx) {
       // Create a table in if not exist
       tx.executeSql('CREATE TABLE IF NOT EXISTS Transcation(Id INTEGER NOT NULL PRIMARY KEY, transcation_type TEXT, sub_type TEXT ,document_type TEXT,document_no TEXT,document_date TEXT,ownwer_name TEXT, owmer_gstin TEXT,owner_state TEXT,ownwer_address TEXT,ownwer_address1 TEXT,owner_place TEXT,owner_pincode TEXT,biller_name TEXT,biller_gstin TEXT,biller_state TEXT,shipping_address TEXT,shipping_address1 TEXT,shiping_place TEXT,shiping_state TEXT,shiping_pincode TEXT,product_select TEXT,product_description TEXT,hsn TEXT,quantity TEXT,unit TEXT,taxable_value TEXT,cgst TEXT,sgst TEXT,igst TEXT,cess TEXT,total_taxable_value TEXT,cgst_amount TEXT,sgst_amount TEXT,igst_amount TEXT,cess_amount TEXT,total_amount TEXT,e_way_bill_no TEXT) ', [], nullHandler, errorHandler);
   }, errorHandler, successCallBack);
});
ListDBValues();
ListDBSAVE();

//document_date,ownwer_name,owmer_gstin,ownwer_address,ownwer_address1,owner_place,owner_state,owner_pincode,biller_name,biller_gstin,biller_state,shipping_address,shipping_address1,shiping_place,shiping_state,shiping_pincode,product_select,product_description,hsn,quantity,unit,taxable_value,cgst,sgst,igst,cess,total_taxable_value,cgst_amount,sgst_amount,igst_amount,cess_amount,total_amount
