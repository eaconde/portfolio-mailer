const AWS = require('aws-sdk');

// Create sendEmail params
const params = {
  Destination: {
    /* required */
    CcAddresses: [],
    ToAddresses: [
      process.env.EMAIL_TO,
    ],
  },
  Message: {
    /* required */
    Body: {
      Text: {
        Charset: process.env.CHARSET,
        Data: 'TEXT_FORMAT_BODY',
      },
    },
    Subject: {
      Charset: process.env.CHARSET,
      Data: 'Portfolio Inquiry',
    },
  },
  Source: process.env.EMAIL_FROM
};

const ses = new AWS.SES({ apiVersion: '2010-12-01' });

class EmailSender {
  async send() {
    try {
      // Create the promise and SES service object
      const sendPromise = await ses.sendEmail(params).promise();

      // eslint-disable-next-line no-console
      console.log(sendPromise);
      return true;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error, error.stack);
    }
    return true;
  }
}
module.exports = EmailSender;
