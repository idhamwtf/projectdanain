const nodemailer=require('nodemailer')

const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'idhamdummy1@gmail.com',
        pass:'fousdgzigtkibfgy'
    },
    tls:{
        rejectUnauthorized:false
    }
})

module.exports=transporter