var request = require('request');
var token = require('./secrets.js');


console.log("Welcome to Tashi's GitHub Avatar Downloader");


function getRepoContributors(repoOwner, repoName, cb) {

  var options = {
     url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
     headers: {
       'User-Agent': 'request',
       'Authorization token': token + token.GITHUB_TOKEN
     }
   };

   request(url, function(err, res, body) {
     cb(err, body);
  });
}


getRepoContributors("jquery", "jquery", function(err, result){

  console.log("Errors:", err);

  console.log("Result:", result);

});
