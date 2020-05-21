let redis = require('redis')
let redisclient = redis.createClient()
let queue = require('./queue')
let logqueue = new queue.Queue("logs", redisclient)
let log_max = 5

// for (var i = 0; i < log_max; i++){
//     var data = "Hello world #" + i
//     logqueue.push(data)
//     console.log(data)
// }

// function logMessages() { // 3  
//     logQueue.pop(function(err, replies) { // 4    
//         var queueName = replies[0];    
//         var message = replies[1];    
//         console.log("[consumer] Got log: " + message); // 5    
//         logQueue.size(function(err, size) {  // 6      
//             console.log(size + " logs left");     });    
//             logMessages();   // 7  
//         });}
        
// logMessages(); // 8

function log_message() {
    logqueue.pop(function(err, replies){
        var queueName = replies[0];    
        var message = replies[1];    
        console.log("[consumer] Got log: " + message);
        // console.log("test: " + replies)

        logqueue.size(function(err, size){
            console.log(size + " log left")
        })
        log_message();
    })
}

log_message()

// redisclient.quit()
// 
