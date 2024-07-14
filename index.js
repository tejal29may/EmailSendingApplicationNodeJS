
const express = require("express");
const nodemailer = require("nodemailer");
const bodyparser=require("body-parser")
const path = require('path');
// const cors = require('cors');
const fs = require('fs');



const app = express();
app.use(express.json())
app.use(express.urlencoded())

const transporter = nodemailer.createTransport({
  host: "localhost",
  port: "1025",
  secure: false,
});




const staticDirectory = path.join(__dirname, 'css');
console.log("dire",__dirname);
console.log(`Serving static files from: ${staticDirectory}`);

fs.readdir(staticDirectory, (err, files) => {
  if (err) {
      return console.log('Unable to scan directory: ' + err);
  }
  console.log('Directory contents:', files);
});

app.use(express.static(staticDirectory));

app.get("/", (req, res) => {
    res.sendFile(path.join(staticDirectory, "index.html"));
});


app.get("/sendmail", (req, res) => {
  console.log("this is req boy",req.body);
  const mailOptions = {
    to: "tejal@gmail.com",
    from: "do-not-reply@jobapp.com",
    subject: "Welcome to JobApp",
    // text: "Welcome to JobApp, search for your relavent job for free",
    html: `
    <html>
    <head></head>
    <body>
    <h1>Hi There,</h1>
    <h3>Welcome to job app </h3>
    <p style="color: blue;">lorem ipsum dor sit ametlorem ipsum dor sit ametlorem ipsum dor sit ametlorem ipsum dor sit ametlorem ipsum dor sit ametlorem ipsum dor sit ametlorem ipsum dor sit amet</p>
    <script>alert("hello");</script>
    </body>
    </html>
    `,
    // attachment: // File blob (File object)
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });

  res.json({ success: true, message: "Mail sent successfully" });
});

app.listen(10000, () => console.log(`Server is up and running at port 10000`));