const nodemailer = require('nodemailer')


function sendMailForgets(email, forgets) {  

    const admin = 'sendmailrada@gmail.com'
    const pass = 'pipoca11!'
    const user = email

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: admin, 
            pass: pass
        }
    })

    transporter.sendMail({
        from: admin,
        to: user,
        secure: false,
        subject: 'Olá, Seja bem vindo!',
        html: '<h3>Copie o CÓDIGO ' + forgets + ' para redefinir sua senha.</h3>'
        
    }).then(info => {
        res.send(info)
    }).catch(error => {
        res.send(error)
    })
            
    }
 
    module.exports = sendMailForgets