import {Application, Request, Router} from "express";
import {request, Response} from "express";

const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const Recaptcha = require('express-recaptcha').RecaptchaV2
const formData = require('form-data')
const Mailgun = require('mailgun.js') //this is a class so we made it uppercase
const mailgun = new Mailgun(formData) //make a new object using the rules from package formData


// validation tools
const {check, validationResult} = require('express-validator')

const validation = [
    check('name', 'A valid name is required').not().isEmpty().trim().escape(),
    check('email', 'Please provide a valid email.').isEmail(),
    check('subject').optional().trim().escape(),
    check('message', 'A message of 2000 characters or less is required.').trim().escape().isLength({min: 1, max: 2000})
]

// set up our app
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())



const recaptcha = new Recaptcha(process.env.RECAPTCHA_SITE_KEY, process.env.RECAPTCHA_SECRET_KEY)

const mg = mailgun.client({username:'api', key:process.env.MAILGUN_API_KEY})

const handleGetRequest = (request: Request, response: Response) => {
    return response.json('This thing is on')
}

const handlePostRequest = (request: Request, response: Response) => {
    response.append('Content-Type', 'text/html')

    // @ts-ignore
    if(request.recaptcha.error) {
        return response.send(
            `<div class='alert alert-danger' role='alert'><strong>Oh Snap!</strong>There was a Recaptcha error. Please try again.</div>`
        )
    }

    const errors = validationResult(request)

    if(errors.isEmpty() === false) {
        const currentError = errors.array()[0]
        return response.send(
            `<div class='alert alert-danger' role='alert'><strong>Oh Snap!</strong>${currentError.msg}</div>`
        )
    }

    const {name, email, subject, message} = request.body
    // const name = request.body.name // We do this exact same thing more succinctly above
    // const email = request.body.email
    // const subject = request.body.subject
    // const message = request.body.message

    const mailgunData = {
        to: process.env.MAIL_RECIPIENT,
        from: ` ${name} <postmaster@${process.env.MAILGUN_DOMAIN}>`,
        subject: `${email}: ${subject}`,
        text: message
    }

    mg.messages.create(process.env.MAILGUN_DOMAIN, mailgunData)
        .then((msg: any) =>
        response.send(`<div class='alert alert-success' role="alert">Email Sent Successfully</div>`)
        )
        .catch((error: any) =>
        response.send(`<div class='alert alert-danger' role="alert">Email Failed to Send. Please Try Again Later.</div>`)
        )

}




// route
const indexRoute = express.Router()

indexRoute.route('/')
    .get(handleGetRequest)
    .post(recaptcha.middleware.verify, validation, handlePostRequest)

app.use('/apis', indexRoute) //Listen for apis and send it up to indexRoute

app.listen(4200, () => {
    console.log('Express Successfully Built')
})