const express = require('express');
const DB = require('../../DB/db');
const {sendMail} = require('../mail/nodemailer');

const router = express.Router();

router.delete('/address/delete',async(req,res)=>{
    try{
    const id = req.body.id;
    if(!id)
    {
        res.send("enter the address id ");
    }

    let query =  `DELETE FROM ADDRESS_DETAIL WHERE ADDRESS_ID = ${id}`
    let result = await DB(query);
    let resultData = result.rowsAffected;

    if(resultData.length > 0)
    {
        text = 'Address detail deleted successfully';
        sendMail(text);
        
       res.send("address detail id deleted sucesfully") ;
    }
    else
    {
        res.send("address detail id is not deleted");
    }
    }
    catch(error)
    {
        res.send("error occour in addres delete catch block");
    }
    
})

module.exports = router;