const nodemailer = require('nodemailer');
const User = require('../models/User')
const Notification = require('../models/Notification')
const JobOffer = require("../models/JobOffer");

async function sendEmail() {

    const notification_array = await Notification.find({
        source: "1"
    })

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    if (notification_array.length == 0) {
        console.log("Emails array is empty")
        return
    }
    notification_array.forEach(notif => {

        User.findById(notif.user_id, function (err, user) {
            if (err) {
                console.log(err);
            } else {

                try {
                    let info = transporter.sendMail({
                        from: process.env.EMAIL,
                        to: 'malekkamoua50@gmail.com', // entreprise_email
                        subject: ` ${notif.title} Job submission`,
                        text: `Email: ${user.email} \n \n ${user.motivation_letter}  `,
                        attachments: [{
                            filename: `${user.name} cv`,
                            path: user.cv,
                            contentType: 'application/pdf'
                        }]
                    });

                    console.log("Message sent to " + user.email);

                    Notification.findOneAndDelete({
                        "_id": notif.id
                    }, function (error, docs) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log("notification deleted")
                            console.log(docs);
                        }
                    });

                    JobOffer.findOneAndUpdate({
                        "_id": notif.url
                    }, {
                        "$set": {
                            "status": "submitted"
                        }
                    }, function (err, updatedObject) {

                        if (err) {
                            console.log(err)

                        } else {
                            console.log(updatedObject)

                        }
                    });
                } catch (error) {
                    console.log(error);
                }
            }
        });
    });
}

module.exports = sendEmail;
