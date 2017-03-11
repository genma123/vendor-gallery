const express = require('express');
const aws = require('aws-sdk');
const fs = require('fs');
const _ = require('lodash');

const app = express();
app.use(express.static('./public'));
app.listen(process.env.PORT || 3001);

const S3_BUCKET = process.env.S3_BUCKET_NAME;
const s3 = new aws.S3();

function copyFile(req, res, fileName) {
	return new Promise(function (resolve,reject) {
		console.log("in copyFile, fileName: " +  fileName);
		if (fileName.slice(-1) === "/") {
			resolve(fileName);
			return;
		}
			
		  const s3Params =  {
			Bucket: S3_BUCKET,
			Key: fileName
		  };
		  
			var tokens = fileName.split('/');
			var prfxLength = tokens[0].length + 1;
			var path = "/client/public/" + fileName.substr(prfxLength);
			var stream = fs.createWriteStream(__dirname + path, { flags: 'w', encoding: null, mode: 0666 });
			s3.getObject(s3Params).on('httpData', function(chunk) {
				// console.log("got chunk");
				stream.write(chunk);
				// console.log("wrote chunk");
			}).on('complete', function() {
				// console.log("complete!");
				stream.end();
				resolve(fileName);
			}).send();
	});
}

function postProcess(fileNames) {
	var filtered = _.filter(fileNames, function(y) {
			return y.slice(-1) !== "/";
		});

	return _.map(filtered, function(fileName) {
			var tokens = fileName.split('/');
			var prfxLength = tokens[0].length + 1;
			return fileName.substr(prfxLength);
		});
}

function listFiles(req, res, prefix) {
	console.log("in listFiles");
	
	var params = {
	  Bucket: S3_BUCKET, /* required */
	  EncodingType: 'url',
	  FetchOwner: true || false,
	  MaxKeys: 1000,
	  Prefix: prefix
	};
	
	s3.listObjectsV2(params, function(err, data) {
	  if (err) console.log(err, err.stack); // an error occurred
	  else  {   /* console.log(data); */          // successful response
		// console.log(_.map(data.Contents, "Key"));
		/* _.map(data.Contents, "Key").map( / * x => copyFile(req, res, x) * /
			function(file) {
				copyFile(req, res, file).then(function(x) {
					console.log("Done copying: " + x);
				});
			}
		); */
		
		Promise.all(_.map(data.Contents, "Key").map(
			function(file) {
				return copyFile(req, res, file);
			})).then(function(values) {
				console.log("values: " + values);
				res.send(postProcess(values));
			});
		
	  }
	});
	
	// res.end();
	
}

app.get('/api/images', (req, res) => {
	console.log("got request");

	const prefix = 'mantiques';
	
	listFiles(req, res, prefix);

  /* var out = fs.createWriteStream("/tmp/test.jpg",
	{ flags: 'w',
	  encoding: null,
	  mode: 0666 });
  s3.client.getObject(s3Params).createReadStream().pipe(out); */

});

console.log("STARTED");
