const express = require('express');
const DB = require('../../DB/db');
const { text } = require('body-parser');

const router = express.Router();

router.get('/education/fetch',async(req,res)=>{
     try{
        // const token = req.header.authorization
        // if(token){
        //     const tokenCheck = verifyToken(token)
        //     if(tokenCheck){
                const id = req.body.id;
                
                if(!id)
                {
                    res.send("enter the education id");
                }
                let fetchQuery = `SELECT * FROM EDUCATION_DETAIL WHERE EDUCATION_ID = ${id}`
            
                let result = await DB(fetchQuery);
                let resultData = result.recordset;
            
                if(resultData.length > 0)
                {
                    res.send({"sucesfully get the education detail": resultData});
                }
                else
                {
                    res.send("education detail id is not valid");
                }       
        //     }else{
        //         res.send('Invalid token')
        //     }
        // }else{
        //     res.send('token not passed')
        // }
     }
     catch(error)
     {
          res.send("error occour in education fetch cath block");
     }
})

module.exports = router;