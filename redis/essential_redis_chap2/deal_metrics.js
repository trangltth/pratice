let redis = require('redis')
let client = redis.createClient()

function markDealAsSent(dealId, userId) {
    client.sadd(dealId, userId)
    console.log('Deal: ' + dealId + ' is added for user: ' + userId)
}

function sendDealIfNotSend(dealId, userId){
    client.sismember(dealId, userId, function (err, is_member) {
        if (is_member){
            console.log("Deal " + dealId + " is already sent for user " + userId)
        }
        else{
            console.log("Deal " + dealId + " is not sent for user " + userId)
            markDealAsSent(dealId, userId)
        }
    })
}

function showUsersReceivedAllDeal(dealIds) {
    client.sinter(dealIds, function (err, userIds) {
        console.log("Users have all deals: ", userIds)        
    })
}

function showUsersHaveAtLeastOnceDeal(dealIds) {
    client.sunion(dealIds, function (err, userIds) {
        console.log("Users have at leat one deal: ", userIds)
    })
}

markDealAsSent(1,1)
markDealAsSent(1,2)
markDealAsSent(2,2)
markDealAsSent(2,3)

sendDealIfNotSend(1,2)
sendDealIfNotSend(1,3)

showUsersReceivedAllDeal([1,2])
showUsersHaveAtLeastOnceDeal([1,2])

client.quit()