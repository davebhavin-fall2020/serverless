const aws = require("aws-sdk");
const uuid1 = require('uuid');
const domain_name = "prod.davebhavin.me"
aws.config.update({ region: "us-east-1" });
exports.emailService = function (event, context, callback) {
    let email= event.Records[0].Sns.Message;
    let ques = event.Records[0].Sns.QuestionId;
	 let uuid= uuid1.v4();
	 let emailMessage = 'https://'+domain_name+'/v1/question/'+ques;
	 var emailParams = {
		Destination: {
		  ToAddresses: [
			email
		  ]
		},
		Message: {
		  Body: {
	
			Html: {
			  Charset: "UTF-8",
			  Data: emailMessage
			}
		  },
		  Subject: {
			Charset: "UTF-8",
			Data: "Question has been answered"
		  }
		},
		Source: "csye6225" + domain_name
	  };

      var sendPromise = new aws.SES({ apiVersion: '2010-12-01' }).sendEmail(emailParams).promise();
				sendPromise.then(
				  function (data) {
					console.log("Email sent to: "+email+" Message id:: "+ data.MessageId);
				  }).catch(
					function (err) {
					  console.error(err, err.stack);
					});

	 
};
