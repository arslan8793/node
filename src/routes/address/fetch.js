const express = require('express');
const DB = require('../../DB/db');

const router = express.Router();

router.get('/address/fetch',async(req,res)=>{
     try{
        const id = req.body.id;
        if(!id)
        {
            res.send("eneter the address id to get the data");
        }
    
        let query = `SELECT * FROM ADDRESS_DETAIL WHERE ADDRESS_ID = ${id}`
    
        let result = await DB(query);
        let resultData = result.recordset;
    
        if(resultData.length > 0)
        {
            res.send({"sucesfully get the address detail":resultData});
        }
        else
        {
            res.send("address detail is not avaliable");
        }
     }
     catch(error)
     {
        res.send("error occour in address catch block");
     }
})

module.exports = router;