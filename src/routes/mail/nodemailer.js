const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : 'arslan8793@gmail.com',
        pass : 'uwzp juvx cdtc bjpu',
    },
});

const sendMail = (text)=>{
    const mailoptions = {
        from : 'arslan8793@gmail.com',
        to : 'arslanhaquea@appstec.in',
        subject : 'NODEMAILER MAIL FROM ADIL',
        text,
        // text: 'Hello , how are you'
    }

transporter.sendMail(mailoptions,(err , info)=>{
     if(err)
     {
        console.log(err.message);
     }
     else
     {
        console.log('email are', info.response);
     }
  })
}

  module.exports = { sendMail }


