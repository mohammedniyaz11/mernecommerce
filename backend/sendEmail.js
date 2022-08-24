import nodemailer from 'nodemailer'

import {google} from 'googleapis'


const {OAuth2}=google.auth;

const   OAUTH_PLAYGROUND='https://developers.google.com/oauthplayground'







const {
    MAILING_SERVICE_CLIENT_ID,
    MAILING_SERVICE_CLIENT_SECRET,
    MAILING_SERVICE_REFRESH_TOKEN,
    SENDER_EMAIL_ADDRESS
} = process.env

const oauth2Client = new OAuth2(
  "596510111275-fn4cba5v9f2jso08jpo6hso4e9h9clla.apps.googleusercontent.com",
    "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",
 "1//04wMlzUWVwmgmCgYIARAAGAQSNwF-L9Ir-HE3EGE0DWLBU5gUOHc852l_7vunD_aly3cL1iZXwe6oL-9mLBWzjrNdFiJduRBgjfQ",
    OAUTH_PLAYGROUND
)


//send email
const sendMail = (to, url, txt) => {
    console.log(to)
   

    oauth2Client.setCredentials({
        refresh_token: '1//04wMlzUWVwmgmCgYIARAAGAQSNwF-L9Ir-HE3EGE0DWLBU5gUOHc852l_7vunD_aly3cL1iZXwe6oL-9mLBWzjrNdFiJduRBgjfQ'
    })
 

    const accessToken = oauth2Client.getAccessToken()
    console.log(accessToken)
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'sendapimail11@gmail.com',
            clientId: "596510111275-fn4cba5v9f2jso08jpo6hso4e9h9clla.apps.googleusercontent.com",
            clientSecret: "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",
            refreshToken: '1//04wMlzUWVwmgmCgYIARAAGAQSNwF-L9Ir-HE3EGE0DWLBU5gUOHc852l_7vunD_aly3cL1iZXwe6oL-9mLBWzjrNdFiJduRBgjfQ',
            accessToken
        }

      
        
    })
    console.log(smtpTransport,"smtp transport")
    const mailOptions = {
        from: 'sendapimail11@gmail.com',
        to: to,
        subject: "Amazona",
        html: `
            <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Amazona <br> your otp is......</h2>
            <div><h1>1234<h1><div>
            <p>Congratulations! You're almost set to start using AMAZONA.
                Just click the button below to validate your email address.
            </p>
            
            <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `
    }
    console.log(mailOptions)

    smtpTransport.sendMail(mailOptions, (err, infor) => {
        if(err) return err;
        return infor
    })
}
    




export default sendMail;