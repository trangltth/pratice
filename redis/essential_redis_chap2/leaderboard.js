let redis = require('redis')
let client = redis.createClient()

function leaderBoard(key) {
    this.key = key
}

leaderBoard.prototype.addUser = function (score, username) {
    client.zadd(this.key, score, username, function () {
        console.log("user: " + username + " is added");        
    })
}

leaderBoard.prototype.removeUser = function (username){
    client.zrem(this.key, username, function(err, replies){
        console.log("remove users: ", replies)
    })
}

leaderBoard.prototype.getUserScoreAndRank = function(username){
    var keyname = this.key;
    let _score = 0;

    // method 1
    // need to rework
    // task: double check why zrank does not display _index value(done)
    // solution: remove client.quit command
    // causes: client.zrank command is executed in the last order commands
    client.zscore(keyname, username, function(err, score){
        console.log("username: " + username);
        console.log("key: " + keyname)  ;
        console.log("error: ", err)
        client.zrank(keyname, username, function(err, _index){
            console.log("User " + username + " is at " + _index + " with score: " + score)
            console.log("error: ", err)
        });
    });

    client.zrange(keyname, 0,-1,function(err, data){
        console.log("data is: ", data)
    });

    // method 2
    // client.zscore(keyname, username, function(err, score){
    //     _score = score  
    // });

    // client.zrank(keyname, username, function(err, _index){
    //     console.log("User " + username + " is at " + _index + " with score: " + _score)
    // });

}

leaderBoard.prototype.showTopUser = function(){
    client.zrevrange(this.key, 0, -1, function(err, topUsers){
        console.log("Top 10 Users: ", topUsers)
    })
}

leaderBoard.prototype.getUsersAroundUser = function(username, quantity, callback){
    var key = this.key
    client.zrevrank(key, username, function(err, zrevrankReply){

        var startOffset = Math.floor(zrevrankReply - (quantity / 2) + 1); // 4    
        
        if (startOffset < 0) { // 5      
            startOffset = 0;    
        }    
        var endOffset = startOffset + quantity - 1;

        client.zrevrange(key, startOffset, endOffset, "withscores",function(err, zrevrangeReply){
            var users = []; // 8      
            for (var i = 0, rank = 1 ; i < zrevrangeReply.length ; i += 2,         rank++) { // 9        
                var user = {          
                    rank: startOffset + rank,          
                    score: zrevrangeReply[i + 1],          
                    username: zrevrangeReply[i],        
                }; // 10        
                users.push(user);
            }
            callback(users)
        })        
    })
}

LeaderBoard =  new leaderBoard("best seller")
LeaderBoard.addUser(1, "mario puzzel")
LeaderBoard.addUser(2, "connan doyle")
LeaderBoard.addUser(3, "test")

LeaderBoard.removeUser("test")

LeaderBoard.getUserScoreAndRank("mario puzzel")

LeaderBoard.addUser(1, "happer life")
LeaderBoard.addUser(2, "steven levis")

LeaderBoard.showTopUser();

LeaderBoard.getUsersAroundUser("connan", 6, function(users){
    users.forEach(user => {
        console.log("#" + user.rank +" user around connan are: " + user.username + " with score: " + user.score)
    });
    client.quit()
})

// client.quit()