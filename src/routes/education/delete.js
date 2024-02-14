const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');

const router = express.Router();

router.delete('/education/delete',async(req,res)=>{
    try{
        const id = req.body.id;

        if(!id)
        {
            res.send("Enter the Employee id")
        }
    
        let deleteQuery = `DELETE FROM EDUCATION_DETAIL WHERE EDUCATION_ID = '${id}' `
        let result = await DB(deleteQuery);
        let resultData = result.rowsAffected;
    
        if(resultData.length > 0 )
        {
            text = 'Education Details Is Deleted';
            sendMail(text);
            
            res.send( "education id deleted sucesfully");
        }
    }
    catch(error)
    {
        console.log(err.message);
        res.send("error occour in education delete catch block")
    }
})

module.exports = router;







