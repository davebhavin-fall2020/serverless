const aws = require("aws-sdk");
//const uuid1 = require('uuid');
const domain_name = "prod.davebhavin.me"
aws.config.update({ region: "us-east-1" });
exports.emailService = function (event, context, callback) {
	let message= event.Records[0].Sns.Message;
	console.log(email);
	let messageJson = JSON.parse(message);
	let messageDataJson = JSON.parse(messageJson.data);
	 let emailMessage = 'https://'+domain_name+'/v1/question/'+messageDataJson.Qid;
	 var emailParams = {
		Destination: {
		  ToAddresses: [
			messageDataJson.Email
		  ]
		},
		Message: {
		  Body: {
	
			Html: {
			  Charset: "UTF-8",
			  Data: "Your Qid "+messageDataJson.Qid+"has been answered and Ans id is "+messageDataJson.Aid+" Ans to your question is "+ messageDataJson.AnsText+" and link to your text is "+emailMessage
			}
		  },
		  Subject: {
			Charset: "UTF-8",
			Data: "Question has been answered"
		  }
		},
		Source: "csye6225@prod.davebhavin.me"
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
