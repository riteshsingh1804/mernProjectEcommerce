const nodeMailer=require("nodemailer");

const sendEmail=async (options)=>{

    const transporter=nodeMailer.createTransport({
        host:process.env.SMPT_HOST,
        port:process.env.SMPT_PORT,


        service:process.env.SMPT_SERVICE,
        auth:{
            user:process.env.SMPT_EMAIL,
            pass:process.env.SMPT_PASSWORD
        }
    })

    const mailOptions={
        from:process.env.SMPT_EMAIL,
        to:options.email,
        subject:options.subject,
        text:options.message
    }

    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;

// const transporter=nodeMailer.createTransport({
//     service:"gmail",
//     auth:{
//         user:"",
//         pass:""
//     }
// })

// const mailOptions={
//     from:"",
//     to:"",
//     subject:"",
//     text:""
// }











// "success": false,
// "message": "Invalid login: 535-5.7.8 Username and Password not accepted. For more information, go to\n535 5.7.8  https://support.google.com/mail/?p=BadCredentials kw11-20020a170902f90b00b001dcc18e1c10sm13581287plb.174 - gsmtp"

