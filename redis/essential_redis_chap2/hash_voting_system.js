let redis = require('redis')
let client = redis.createClient()

function saveLink(id, author, title, link) {
    client.hmset("link:" + id, "author", author, "title", title, "link", link, "score", 0)
}

function upVote(id) {
    client.hincrby("link:" + id, "score", 1)
}

function downVote(id) {
    client.hincrby("link:" + id, "score", -1)
}

function showDetail(id){
    client.hgetall("link:" + id, function (err, replies) {
        console.log("title: ", replies['title'])
        console.log("author: ", replies['author'])
        console.log("link: ", replies['link'])
        console.log("score: ", replies['score'])
    })
}

saveLink(123, "dayvson", "Maxwell Dayvson's Github page", "https://github.com/dayvson");
upVote(123);
upVote(123);
saveLink(456, "hltbra", "Hugo Tavares's Github page", "https://github.com/hltbra");
upVote(456);
upVote(456);
downVote(456);

showDetail(123)
showDetail(456)

client.quit()