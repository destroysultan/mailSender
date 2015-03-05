var pg = require('pg');

// Connects to postgres once, on server start
var connectionString = process.env.DATABASE_URL || "postgres://localhost/mailinglist";
var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('_BArrEkgdN35APiBHkFK4A');

var db;
pg.connect(connectionString, function(err, client) {
  if (err) {
    console.log(err);
  } else {
  	sendQueuedMail(client);
  }
});

function sendQueuedMail(db) {
	sendNewUsersInitialMessage(db);
	// other mails
}


function sendNewUsersInitialMessage(db) {
	// Query for new users
  db.query("", [SELECT email FROM USERS WHERE last_email_sent IS NULL], function(err, result) {
    if (err) {
      
    } else {
    		firstEmail(result.rows);
    }
  })
	// Assemble a new email

function firstEmail(users){

	var message = {
	    "text": "hax hax hax",
	    "subject": "in-class hacking",
	    "from_email": "liz@tradecraft",
	    "from_name": "in-class example",
	    "to": users
	}
	
	sendEmail(message);
}

function sendEmail(message) {
mandrill_client.messages.send({"message": message, "async": true, "ip_pool": false}, function(result) {
    console.log(result);

}, function(e) {
    // Mandrill returns the error as an object with name and message keys
    console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
});
}

	// Sent the email to new users using mandrill
}