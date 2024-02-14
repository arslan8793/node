const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');

const router = express.Router();


router.post('/address/insert',async(req,res)=>{
   try{
    const id = req.body.id;
    const name = req.body.name;
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const country = req.body.country;

    if(!id || !name || !address1 || !address2 || !city || !state || !country)
    {
        res.send("enter the id , name , address1 , address2 , city ,state ,country");
    }

    let employeeQuery = `SELECT * FROM EMPLOYEE_DETAIL WHERE EMPLOYEE_ID = ${id}`
    let employeeData = await DB(employeeQuery);

    if(employeeData.recordset.length > 0)
    {
        let query = `INSERT INTO ADDRESS_DETAIL(EMPLOYEE_ID ,NAME ,ADDRESS_1 , ADDRESS_2 ,CITY ,STATE ,COUNTRY) VALUES (${id} ,'${name}' , '${address1}' , '${address2}' ,'${city}' ,'${state}' , '${country}')`
        let result = await DB(query);

        text = 'Address detail inserted sucesfully';
        sendMail(text);
        
        res.send("data inserted sucesfully");
    }
    else
    {
        res.send("data is not inserted");
    }
   }
   catch(error)
   {
    console.log((error));
    res.send("error occour in address inserted catch block");
   }

})

module.exports = router;