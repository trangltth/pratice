var redis = require("redis")
var client = redis.createClient()
client.set("1st", "this is first key")
client.get("1st", redis.print)
client.quit()


