const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const request = require("request");

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function (req, res) {
  var FirstName = req.body.Fname;
  var LastName = req.body.Lname;
  var Email = req.body.Email;

  var data = {
    members: [
      {
        email_address: Email,
        status: "subscribed",
        merge_fields: {
          FNAME: FirstName,
          LNAME: LastName
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);

  var object = {
    url: "https://us5.api.mailchimp.com/3.0/lists/fc997a5b19",
    method: "POST",
    headers: {
      Authorization: "vivek 999904e2272ea3181d7cbbd048b9d229-us5"
    },
    body: jsonData
  };

  request(object, function (error, responce, body) {
    if (error) {
      console.log("Their is Some Error Plzz Check.");
      res.sendFile(__dirname + "/failure.html");
    }
    else if(responce.statusCode==200){ 
      console.log("Status Code is -> " + responce.statusCode);
      res.sendFile(__dirname + "/success.html");
    }

  })
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 4000, function (req, res) {
  console.log("Sign-Up-Entries Server Started...");
});

// Loading All HTML Files Firstly in Static & Then Redirecting Instead of Sending When Required

// curl -X POST \
//   'https://${dc}.api.mailchimp.com/3.0/lists/{list_id}?skip_merge_validation=<SOME_BOOLEAN_VALUE>&skip_duplicate_check=<SOME_BOOLEAN_VALUE>' \
//   --user "anystring:${apikey}"' \
//   -d '{"members":[],"update_existing":false}'

// const express = require("express");
// const app = express();

// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: true }));

// const request = require("request");

// app.use(express.static("public"));

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");

// });
// app.get("/failure", function (req, res) {
//   res.sendFile(__dirname + "/public/failure.html");

// });
// app.get("/success", function (req, res) {
//   res.sendFile(__dirname + "/public/success.html");

// });

// app.post("/", function (req, res) {
//   var FirstName = req.body.Fname;
//   var LastName = req.body.Lname;
//   var Email = req.body.Email;

//   var data = {
//     members: [
//       {
//         email_address: Email,
//         status: "subscribed",
//         merge_fields: {
//           FNAME: FirstName,
//           LNAME: LastName
//         }
//       }
//     ]
//   };
//   var jsonData = JSON.stringify(data);

//   var object = {
//     url: "https://us5.api.mailchimp.com/3.0/lists/fc997a5b19",
//     method: "POST",
//     headers: {
//       Authorization: "vivek 999904e2272ea3181d7cbbd048b9d229-us5"
//     },
//     body: jsonData
//   };

//   request(object, function (error, responce, body) {
//     if (error) {
//       console.log("Their is Some Error Plzz Check.");
//       res.redirect("/failure");
//     }
//     else { 
//       console.log("Status Code is -> " + responce.statusCode);
//       res.redirect("/success");
    
//     }

//   })
// });

// app.post("/failure", (req, res) => {
//   res.redirect("/");
// });

// app.listen(3000, function (req, res) {
//   console.log("Sign-Up-Entries Server Started...");
// });

// // curl -X POST \
// //   'https://${dc}.api.mailchimp.com/3.0/lists/{list_id}?skip_merge_validation=<SOME_BOOLEAN_VALUE>&skip_duplicate_check=<SOME_BOOLEAN_VALUE>' \
// //   --user "anystring:${apikey}"' \
// //   -d '{"members":[],"update_existing":false}'