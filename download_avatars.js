
/*
all the modules that apply to download_avatars.js file
*/
var request = require('request');
var token = require('./secrets.js');
var fs = require('fs');
/*
this log will show if the file works when using node in command line
*/
console.log('Welcome to the GitHub Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, callback) {
  var options = {
    url: "https://api.github.com/repos/" + process.argv[2] + "/" + process.argv[3] + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization': 'token' + token.GITHUB_TOKEN
    }
  };
  

  request(options, function(err, res, body) {
    callback(err, JSON.parse(body));
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);

  for (let object of result) {
    downloadImageByURL(object.avatar_url, "./avatars/" + object.login + object.id + ".jpg");
    console.log(object.avatar_url);
  }
});

function downloadImageByURL (url, filePath) {
  request.get(url)
  .on('error', function (err) {
    throw err;
  })
  .on('response', function (response) {
    console.log('Response Status Code: ', response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath));
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg");
