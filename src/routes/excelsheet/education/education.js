const express = require('express');
const DB = require('../../../DB/db');
const ExcelJs = require('exceljs');

const router = express.Router();


router.get('/education/excel',async(req,res)=>{
         
    try{
        let empid = req.body.empid;

        if(!empid)
        {
            res.send("Enter the employee id");
        }
    
        let employeeQuery = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${empid}`
        let employeeData = await DB(employeeQuery);
    
        let educationQuery = `SELECT * FROM EDUCATION_DETAIL WHERE EMPLOYEE_ID = ${empid}`
        let educationData = await DB(educationQuery);
    
        if(employeeData.recordset.length > 0 && educationData.recordset.length > 0)
        {
    
            let employeeresult = employeeData.recordset;
            let educationResult = educationData.recordset;
    
            const workbook = new ExcelJs.Workbook();
            const worksheet = workbook.addWorksheet('EDUCATION DETAIL');

            function addBorders(row){
                row.eachCell((cell)=>{
                    cell.border={
                      top : {style : "thin"},
                      bottom:{style : "thin"},
                      left:{style:"thin"},
                      right:{style:"thin"}
                    }
                })
            }
    
    
            worksheet.addRow(['EMPLOYEE ID' , 'NAME' ,'EMAIL' ,'PASSWORD' ,'PHONE','GENDER']).font = {bold : true , color: { argb: 'FFFF0000' } }
            addBorders(worksheet.lastRow)

            employeeresult.forEach((employee)=>{
                worksheet.addRow([employee.EMPLOYEE_ID, employee.NAME ,employee.EMAIL ,employee.PASSWORD , employee.PHONE ,employee.GENDER])
                addBorders(worksheet.lastRow)
            })
    
            worksheet.addRow([]);
            worksheet.addRow([]);
    
            worksheet.addRow(['EMPLOYEE ID','EDUCATION ID','NAME','X PERCENT', 'XII PERCENT' ,'GRADUATION' , 'MASTERS']).font = {bold : true, color : {argb: 'FFFF0000'}}
            addBorders(worksheet.lastRow)

            educationResult.forEach((education)=>{
                worksheet.addRow([education.EMPLOYEE_ID,education.EDUCATION_ID ,education.NAME ,education.X_PERCENT , education.XII_PERCENT , education.GRADUATION , education.MASTERS]);
                addBorders(worksheet.lastRow)
            })
    
            workbook.xlsx.writeFile('education_new.xlsx');
            res.send('excel file generetaed sucesfully');
        }
    }
    catch(error)
    {
        res.send("error occour in education catch block");
    }

})

module.exports = router;