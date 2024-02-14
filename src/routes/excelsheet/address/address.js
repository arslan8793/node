const express = require('express');
const DB = require('../../../DB/db');
const ExcelJs = require('exceljs');

const router = express.Router();

router.get('/address/excel',async(req,res)=>{

    try{
        const empid = req.body.empid;

        if(!empid)
        {
          res.send("Enter the employee id");
        }
  
        let employeeQuery = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${empid}`
        let employeeData = await DB(employeeQuery);
  
        let addressQuery = `SELECT * FROM ADDRESS_DETAIL WHERE EMPLOYEE_ID = ${empid}`
        let addressData = await DB(addressQuery);
  
        if(employeeData.recordset.length > 0 && addressData.recordset.length > 0)
        {
          let employeeResult = employeeData.recordset;
          let addressResult = addressData.recordset;
  
          const workbook = new ExcelJs.Workbook();
          const worksheet = workbook.addWorksheet('ADDRESS DETAIL');

          function addBorders(row){
            row.eachCell((cell)=>{
                cell.border = {
                    top:{style: "thin"},
                    bottom:{style : "thin"},
                    left:{style : "thin"},
                    right:{style : "thin"}
                }
            })
          }
  
          worksheet.addRow(['EMPLOYEE ID', 'NAME' , 'EMAIL' , 'PASSWORD' , 'PHONE' ,'GENDER']). font= {bold : true, color :{argb: 'FFFF0000'} };
          addBorders(worksheet.lastRow);

          employeeResult.forEach((employee)=>{
              worksheet.addRow([employee.EMPLOYEE_ID , employee.NAME , employee.EMAIL ,employee.PASSWORD , employee.PHONE, employee.GENDER]);
              addBorders(worksheet.lastRow);
          })
  
          worksheet.addRow([])
          worksheet.addRow([])
  
          worksheet.addRow(['ADDRESS ID','EMPLOYEE ID' ,'NAME' ,'ADDRESS 1' ,'ADDRESS 2' ,'CITY' ,'STATE' ,'COUNTRY']).font = {bold:true , color: {argb : 'FFFF0000'}};
          addBorders(worksheet.lastRow);
          
        addressResult.forEach((address) => {
            worksheet.addRow([address.ADDRESS_ID, address.EMPLOYEE_ID, address.NAME, address.ADDRESS_1, address.ADDRESS_2, address.CITY, address.STATE, address.COUNTRY]);
            addBorders(worksheet.lastRow);
            })

          workbook.xlsx.writeFile('address_new.xlsx');
          res.send("Address file generated sucesfully");
  
        }
    }
    catch(error)
    {
        console.log(error);
         res.send("error occour in address catch block");
    }
})

module.exports = router;