const express = require('express');
const DB = require('../../../DB/db');
const ExcelJs = require('exceljs');

const router = express.Router();

router.get('/employee/excel',async(req,res)=>{

      try{
        const empid = req.body.empid;

        if(!empid)
        {
            res.send("Enter the employee id")
        }
        let query = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${empid}`

        let employeeData = await DB(query);
        let employeeResult = employeeData.recordset;
    
        const workbook = new ExcelJs.Workbook();
        const worksheet = workbook.addWorksheet('EMPLOYEE SHEET');

        function addBorders(row){
            row.eachCell((cell)=>{ 
                cell.border={
                    top : {style : "thin"},
                    bottom :{style : "thin"},
                    left:{style : "thin"},
                    right :{style :"thin"}
                }
            })
        }
        // function bgColor (row){
        //     row.eachCell((cell)=>{
        //       cell.fill = {
        //         type : 'pattern',
        //         pattern : 'solid',
        //        fgColor : {argb :	'FFFF0000'}
        //       }
        //     })
    
        //   }
    
        worksheet.addRow(['EMPLOYEE_ID','NAME','EMAIL','PASSWORD','PHONE','GENDER']).font = { bold: true, color: { argb: 'FFFF0000' } };
        addBorders(worksheet.lastRow);
        // bgColor(worksheet.lastRow)

        employeeResult.forEach((employee) => {
            worksheet.addRow([employee.EMPLOYEE_ID, employee.NAME, employee.EMAIL, employee.PASSWORD, employee.PHONE, employee.GENDER]);
            addBorders(worksheet.lastRow);
          });
    
        workbook.xlsx.writeFile('employee_new.xlsx');
        res.send("excel file for employee is generated");
      }
      catch(error)
      {
        console.log(error);
        res.send("error occour in employee excel catch block");
      }
})

module.exports = router;

