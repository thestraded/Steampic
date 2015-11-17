var express = require('express')
var app = express()
var steamuserinfo = require('steam-userinfo');
steamuserinfo.setup("6B50E53858868777CD06E447A335E61C");
var SteamApi = require('steam-api');

var steamUserId;
var imgFile = "";

app.get('/:id', function (req, res) {
	steamUserId = req.params.id;

		steamuserinfo.getUserInfo(steamUserId, function(error, data){

			if(error) throw error;
			//res.send("<img src = '" + data.response.players[0].avatarfull + "'>");
			imgFile = "<img src = '" + data.response.players[0].avatarfull + "'>" + imgFile;
			var user = new SteamApi.User("6B50E53858868777CD06E447A335E61C", steamUserId)
				
				user.GetFriendList(optionalRelationship = 'all', steamUserId).done(function(result)
				{

  					var friendCount = result.length-1;
  					
	  					for(var i = 1; i < friendCount; i++)
		  					{
		  						imgFile = imgFile + "<img style=\" opacity:.5; \" src = '" + result[i].avatarFull + "'>";
		  					}

		  			var opacityRatio = friendCount/500;
		  			imgFile += '<style>img {opacity: "' + opacityRatio + '"; width:100%; height:100%; position:absolute; left:0; right: 0;}</style>'; 
					console.log(opacityRatio);
					res.send(imgFile);
				});
		})
		// res.send(imgFile);


})

app.listen(3000)