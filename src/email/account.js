import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
  sendgrid.send({
    to: email,
    from: `corey@coreyhgross.com`,
    subject: `Thanks for joining in!`,
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  })
}

const sendCancellationEmail = (email, name) => {
  sendgrid.send({
    to: email,
    from: `corey@coreyhgross.com`,
    subject: `Sorry to see you go!`,
    text: `What did we do that hurt you so? Let us know how we can do better!`,
  })
}

export { sendWelcomeEmail, sendCancellationEmail }
