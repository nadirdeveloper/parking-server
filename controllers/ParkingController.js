const { GenerateUniqueId } = require("../helpers/uniqueId");
var nodemailer = require('nodemailer');

module.exports = function (app, mongoose) {
  const { Area, Parking, Booking, Feedback, User } = app.db.models;
  const GetParkingAreas = async (req, res) => {
    try {
      const allAreas = await Area.find();
      res.json({ success: true, allAreas, message: "Successfully Found All Areas" });
    } catch (error) {
      if (error) {
        res.json({ success: false, error: error.message })
      }
    }
  }
  const GetParkingSlots = async (req, res) => {
    try {
      const { areaId, selectedStartTime, selectedEndTime, selectedDate } = req.body;
      const dataToCheck = {
        areaId,
        startTime: new Date(`${selectedDate} ${selectedStartTime}`).getTime(),
        endTime: new Date(`${selectedDate} ${selectedEndTime}`).getTime(),
      }
      const allParkings = await Parking.find({ areaId });
      let gotParkings = [];
      for (let i = 0; i < allParkings.length; i++) {
        let eachParking = allParkings[i];
        const checkUnavailable = await Booking.find({ startTime: { $gte: dataToCheck.startTime }, endTime: { $lte: dataToCheck.endTime }, areaId, parkingId: eachParking.id, isBooking: true })
        if (checkUnavailable.length != 0) {
          let newParking = { ...eachParking._doc, isAvailable: false }
          gotParkings.push(newParking)
        } else {
          let newParking = { ...eachParking._doc, isAvailable: true }
          gotParkings.push(newParking)
        }
      }
      res.json({ success: true, allParkings: gotParkings, message: "Successfully found All Parkings" })
    } catch (error) {
      if (error) {
        res.json({ success: false, message: error.message });
      }
    }
  }

  const BookParkingSlot = async (req, res) => {
    try {
      const { areaId, selectedStartTime, selectedEndTime, selectedDate, parkingId } = req.body;
      const bookingId = mongoose.Types.ObjectId();
      const dataToSave = {
        _id: bookingId,
        id: bookingId,
        areaId,
        parkingId,
        userId: req.user.user,
        startTime: new Date(`${selectedDate} ${selectedStartTime}`).getTime(),
        endTime: new Date(`${selectedDate} ${selectedEndTime}`).getTime(),
        isBooking: true
      }
      const newBooking = new Booking(dataToSave);
      let saveBooking = await newBooking.save();
      sendConfirmationEmail(req.user.email, bookingId, dataToSave.startTime, dataToSave.endTime);
      res.json({ success: true, message: "Successfully Saved Booking" })
    } catch (error) {
      console.log(error)
      if (error) {
        res.json({ success: false, message: error.message });
      }
    }
  }

  const sendConfirmationEmail = (reciever, bookingId, startTime, endTime) => {
    Booking.findOne({ id: bookingId }).populate({ path: 'parkingId', model: Parking }).populate({ path: 'areaId', model: Area }).then((data) => {
      const parkingArea = data.areaId.name;
      const slotName = data.parkingId.name;
      User.findOne({ email: reciever }).then((user) => {
        const mailOptions = {
          from: 'PARKING TEAM <daveed42401@gmail.com>', // sender address
          to: [reciever], // list of receivers
          subject: 'Parking Booking Confirmation', // Subject line
          html: `<html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
                <title>Water Montoring cron job</title>
                <style type="text/css">
                body {margin: 0; padding: 0; min-width: 100%!important;}
                img {height: auto;}
                .content {width: 100%; max-width: 600px;}
                .header {padding: 40px 30px 20px 30px;}
                .innerpadding {padding: 30px 30px 30px 30px;}
                .borderbottom {border-bottom: 1px solid #f2eeed;}
                .subhead {font-size: 15px; color: #ffffff; font-family: sans-serif; letter-spacing: 10px;}
                .h1, .h2, .bodycopy {color: #153643; font-family: sans-serif;}
                .h1 {font-size: 33px; line-height: 38px; font-weight: bold;}
                .h2 {padding: 0 0 15px 0; font-size: 24px; line-height: 28px; font-weight: bold;}
                .bodycopy {font-size: 16px; line-height: 22px;}
                .button {text-align: center; font-size: 18px; font-family: sans-serif; font-weight: bold; padding: 0 30px 0 30px;}
                .button a {color: #ffffff; text-decoration: none;}
                .footer {padding: 20px 30px 15px 30px;}
                .footercopy {font-family: sans-serif; font-size: 14px; color: #ffffff;}
                .footercopy a {color: #ffffff; text-decoration: underline;}
                @media only screen and (max-width: 550px), screen and (max-device-width: 550px) {
                body[yahoo] .hide {display: none!important;}
                body[yahoo] .buttonwrapper {background-color: transparent!important;}
                body[yahoo] .button {padding: 0px!important;}
                body[yahoo] .button a {background-color: #effb41; padding: 15px 15px 13px!important;}
                body[yahoo] .unsubscribe {display: block; margin-top: 20px; padding: 10px 50px; background: #2f3942; border-radius: 5px; text-decoration: none!important; font-weight: bold;}
                }
                /*@media only screen and (min-device-width: 601px) {
                .content {width: 600px !important;}
                .col425 {width: 425px!important;}
                .col380 {width: 380px!important;}
                }*/
                </style>
                </head>
                <body yahoo bgcolor="#ffffff">
                <table width="100%" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <!--[if (gte mso 9)|(IE)]>
                      <table width="600" align="center" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                      <td>
                      <![endif]-->
                    <table bgcolor="#ffffff" class="content" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td bgcolor="#00bcd4" class="header">
                        <table width="70" align="left" border="0" cellpadding="0" cellspacing="0">
                        <tr>
                          <td height="70" style="padding: 0 20px 20px 0;">
                            <img class="fix" src="https://i.ibb.co/L15WcdZ/logo-mini.png" width="70" height="70" border="0" alt=""/>
                          </td>
                        </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                          <table width="425" align="left" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                          <td>
                          <![endif]-->
                        <table class="col425" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 425px;">
                        <tr>
                          <td height="70">
                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td class="subhead" style="padding: 0 0 0 3px;">
                                 PARKING APP
                              </td>
                            </tr>
                            <tr>
                              <td class="h1" style="padding: 5px 0 0 0;">
                                 PARKING BOOKING CONFIRMATION
                              </td>
                            </tr>
                            </table>
                          </td>
                        </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td class="innerpadding borderbottom">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td class="h2">
                             Hi ${user.fullName},
                          </td>
                        </tr>
                        <tr>
                          <td class="bodycopy">
                             You have recieved this email for the success confirmation of parking booking.
                          </td>
                        </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td class="innerpadding borderbottom">
                        <table width="115" align="left" border="0" cellpadding="0" cellspacing="0">
    
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                          <table width="380" align="left" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                          <td>
                          <![endif]-->
                        <table class="col380" align="left" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 380px;">
                        <tr>
                          <td>
                            <table border="1">
                              <tr>
                                <th>S.no</th>
                                <th>Booking ID</th>
                                <th>Parking Area</th>
                                <th>Slot Name</th>
                                <th>Start At</th>
                                <th>End At</th>
                              </tr>
                              <tr>
                                  <td>${1}</td>
                                  <td>${bookingId}</td>
                                  <td>${parkingArea} Gallons</td>
                                  <td>${slotName}</td>
                                  <td>${new Date(startTime).toUTCString()}</td>
                                  <td>${new Date(endTime).toUTCString()}</td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                        </table>
                        <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                      </td>
                    </tr>
                    <tr>
                      <td class="innerpadding bodycopy">
                         Thank you,
                      </td>
                    </tr>
                    <tr>
                      <td class="footer" bgcolor="#44525f">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tr>
                          <td align="center" class="footercopy">
                             &reg; PARKING APP,  2021<br/>
                            <span class="hide">from this Email</span>
                          </td>
                        </tr>
                        </table>
                      </td>
                    </tr>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
                  </td>
                </tr>
                </table>
                </body>`
        };
        console.log({
          user: process.env.SENDER_EMAIL,
          pass: process.env.SENDER_PASSWORD
        })
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
          }
        });
        transporter.sendMail(mailOptions, function (err, info) {
          if (err)
            console.log(err)
          else {
            console.log(info);
            console.log("Successfully sent email")
          }
        })
      }).catch((err) => {
        if (err) {
          console.log(err)
        }
      })

    }).catch((err) => {
      if (err) {
        console.log(err);
      }
    })

  }

  const GetUserBookings = async (req, res) => {
    try {
      const userBookings = await Booking.find({ userId: req.user.user }).populate({
        path: 'areaId',
        model: Area,
        select: 'name'
      }).populate({
        path: 'parkingId',
        model: Parking,
        select: 'name'
      });
      res.json({ success: true, message: "Successfully Found Bookings", userBookings })
    } catch (error) {
      if (error) {
        res.json({ success: false, error: error.message })
      }
    }
  }

  const SaveFeedbackController = async (req, res) => {
    try {
      const { name, feedback } = req.body;
      const feedbackId = mongoose.Types.ObjectId();
      const dataToSave = {
        _id: feedbackId,
        id: feedbackId,
        email: req.user.email,
        userId: req.user.user,
        fullName: name,
        message: feedback,
        reply: false
      }
      const newFeedback = new Feedback(dataToSave);
      const saveFeedback = newFeedback.save();
      res.json({ success: true, message: "Successfully Saved Your Feedback" })
    } catch (error) {
      if (error) {
        res.json({ success: false, error: error.message })
      }
    }
  }

  const ViewFeedbackController = async (req, res) => {
    try {
      const allUserFeedbacks = await Feedback.find({ userId: req.user.user });
      res.json({ success: true, message: "Successfully Found All Feedbacks", allUserFeedbacks })
    } catch (error) {
      if (error) {
        res.json({ success: false, error: error.message })
      }
    }
  }

  const CancelBookingController = async (req, res) => {
    try {
      const { bookingId } = req.body;
      let deleteBooking = await Booking.updateOne({ _id: bookingId }, { isBooking: false });
      if (deleteBooking.deletedCount === 1) {
        res.json({ success: true, message: 'Successfully Cancelled Your Booking' })
      } else {
        res.json({ success: true, message: 'Sorry No User Found' })
      }
    } catch (error) {
      if (error) {
        res.json({ success: false, message: error.message })
      }
    }
  }

  app.controllers.CancelBookingController = CancelBookingController;
  app.controllers.GetParkingAreas = GetParkingAreas;
  app.controllers.GetUserBookings = GetUserBookings;
  app.controllers.SaveFeedbackController = SaveFeedbackController;
  app.controllers.ViewFeedbackController = ViewFeedbackController;
  app.controllers.GetParkingSlots = GetParkingSlots;
  app.controllers.BookParkingSlot = BookParkingSlot;
}