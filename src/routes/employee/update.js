const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');

const router = express.Router();

router.put('/employee/update',async(req,res)=>{

    try{
        const id = req.body.id;

        if(!id)
        {
            res.send("Enter the valid id");
        }
    
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;
        let phone = req.body.phone;
        let gender = req.body.gender;
    
        let query = `UPDATE EMPLOYEE_DETAIL SET`
    
        if(name)
        {
            query += ` NAME = '${name}'`
        }
        if(email)
        {
            query += ` EMAIL = '${email}'`
        }
        if(password)
        {
            query += ` PASSWORD = '${password}'`
        }
        if(phone)
        {
            query += ` PHONE = '${phone}'`
        }
        if(gender)
        {
            query += ` GENDER = '${gender}'`
        }
         
        query += ` WHERE EMPLOYEE_ID = ${id}`
        let result = await DB(query);
        let updateData = result.rowsAffected;
        // console.log(updateData);
    
        if(updateData.length > 0)
        {
            text = 'EMPLOYEE DATA IS UPDATED SUCESFULLY';
            sendMail(text);
            
            res.send({'data updated sucesfull': updateData});
        }
        else
        {
            res.send({'data is not updated': updateData});
        }
    }
    catch(err)
    {
        console.log(err);
        res.send("error occour in update catch block")
    }

})

module.exports = router;