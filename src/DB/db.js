const sql = require('mssql');


const config = {
    user : 'arslan',
    password : 'arslan',
    database : "TEST",
    server : "DESKTOP-KP2SIPK",
    options : {
        encrypt : true,
        trustServerCertificate: true
    }
}

async function DB(queryName)
{
    try{
        await sql.connect(config);
        const result = await sql.query(queryName);
     await sql.close();
     return result;
    }
    catch(err)
    {
        console.log(`error occour in DB catch block ${err}`);
    }
}

module.exports = DB