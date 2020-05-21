let redis = require("redis")
let client = redis.createClient()

function vote(id){
    let key = 'article:' + id + ':internal'
    client.incr(key)
}

function dowvote(id){
    let key = 'article:' + id + ':internal'
    client.decr(key)
}

function print_content_key(id){
    var headlinekey = 'article:' + id + ':world'
    var votes = 'article:' + id + ':internal'
    client.mget([headlinekey, votes], function(err, replies){
        console.log('The article "' + replies[0] + '" has', replies[1],  'votes')
    });
        
}

vote(1)
vote(1)
vote(3)
vote(1)
vote(3)
dowvote(1)

vote(2)
vote(2)

print_content_key(1)
print_content_key(3)
print_content_key(2)

client.quit()
