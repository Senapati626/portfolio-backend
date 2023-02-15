const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())
require('dotenv').config();

app.post("/message",async(req,res)=>{
    const {email,message} = req.body
    const transport = nodemailer.createTransport({
        service: 'gmail',
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: true,
        auth:{
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        },
        tls: {
            rejectUnauthorized: false
        } 
    })
    let mailOptions = ()=>{
        return {
        from: email,
        to: 'neellohitsenapati626@gmail.com',
        subject: 'Message on Portfolio Website',
        html: `
        <div>
            <p>Yo Neel,</p>
            <br></br>
            <p>${message}</p>
            <p><strong>${email}</strong></p>
        </div>
        `,
        text: message
        }
    }
    transport.sendMail(mailOptions(),(err,data)=>{
        if(err){
            console.log('error: ', err)
            res.status(404)
        }
        else{
            console.log('succesfully sent mail')
            res.status(200).json({mesage: "Success"})
        }
    })

})


app.listen(process.env.PORT || 4000, ()=>{
    console.log("Server running")
})