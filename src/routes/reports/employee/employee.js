const express = require('express');
const DB = require('../../../DB/db');
const puppeteer = require('puppeteer');

const router = express.Router();

router.get('/employee/pdf',async(req,res)=>{

      try{
        let query = `SELECT * FROM EMPLOYEE_DETAIL`
        let result = await DB(query);
    
        if(result.recordset.length > 0)
        {
            const employeeData = result.recordset;
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
    
            let store = '';
    
            for(const emp of employeeData)
            {
                const EMPLOYEE_ID = emp.EMPLOYEE_ID;
                const NAME = emp.NAME;
                const EMAIL = emp.EMAIL;
                const PASSWORD = emp.PASSWORD;
                const PHONE = emp.PHONE;
                const GENDER = emp.GENDER;
    
                store += `
                <tr class = 'box'>
                <td>${EMPLOYEE_ID} </td>
                <td>${NAME}</td>
                <td>${EMAIL} </td>
                <td>${PASSWORD}</td>
                <td>${PHONE}</td>
                <td>${GENDER}</td>
                </tr>
                `
            }
                await page.setContent(`
                                                
                    <Table class = "table">
                          <tr>
                            <th><h4>EMPLOYEE ID</h4></th>
                            <th><h4>NAME</h4></th>
                            <th><h4>EMAIL</h4></th>
                            <th><h4>PASSWORD</h4></th>
                            <th><h4>PHONE</h4></th>
                            <th><h4>GENDER</h4></th>
                          </tr>
                          ${store}
                    </Table>

                  <style>
 
                  body{
                        border:2px solid black;
                        padding:15px;
                    }

                   .table {
                    padding : 0;
                    width : 100%;
                    height : 10vh;
                    border: 2px solid black;
                    //  background-color: yellow;
                   }
                   
                 .table tr th h4 {
                    margin : 0;
                    border : 2px solid black;
                    padding: 1px;
                    // background-color: pink;
                 }

                 .box td {
                  margin : 0;
                  height : 30px;
                  border: 2px solid black;
                //   background-color: green;
                  text-align: center;
             }
                 </style>
                   
                `)
    
               await page.pdf({path : 'employee_new.pdf' , format : 'A4' , printBackground: true});
               await page.setViewport({width:1080 , height:1024});
               await browser.close();
    
               res.send("Employee pdf is generated sucesfully");
        }
        else
        {
            res.send("employee pdf is not generated");
        }
      }
      catch(error)
      {
         res.send("error occour in catch block");
      }
})

module.exports = router;
