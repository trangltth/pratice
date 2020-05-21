let redis = require('redis')
let client = redis.createClient()

function TimeSeries(client, namespace) { // 1  
    this.namespace = namespace; // 2  
    this.client = client; // 3  
    this.units = { // 4    
        second: 1,    
        minute: 60,    
        hour: 60 * 60,    
        day: 24 * 60 * 60  
    }; 
    this.granularities = { // 5
        '1sec' : { name: '1sec', ttl: this.units.hour * 2,                        
                                duration: this.units.second },// 6    
        '1min' : { name: '1min', ttl: this.units.day * 7,                        
                                duration: this.units.minute },// 7    
        '1hour': { name: '1hour', ttl: this.units.day * 60 ,
                                duration: this.units.hour },// 8
        '1day' : { name: '1day', ttl: null, duration: this.units.day } // 9  
    };
};

TimeSeries.prototype.insert = function(timestampInSeconds){
    for (var granularityName in this.granularities){
        var granularity = this.granularities[granularityName]
        console.log(granularity)
        var key = this._getKeyName(granularity, timestampInSeconds)
        console.log(key)
        this.client.incr(key)
        if (granularity.ttl !== null) { // 6      
            this.client.expire(key, granularity.ttl) 
        }
    }
}

TimeSeries.prototype._getKeyName = function(granularity, timestampInSeconds){
    var roundedTimestamp = this._getRoundedTimestamp(timestampInSeconds, granularity.duration); // 2  
    return [this.namespace, granularity.name, roundedTimestamp].join(':'); // 3
}

TimeSeries.prototype._getRoundedTimestamp = function(timestampInSeconds, precision){
    return Math.floor(timestampInSeconds/precision) * precision;

}

TimeSeries.prototype.fetch = function(granularityName,   beginTimestamp, endTimestamp, onComplete){
    let granularity = this.granularities[granularityName];  
    let begin = this._getRoundedTimestamp(beginTimestamp, granularity.duration);  
    let end = this._getRoundedTimestamp(endTimestamp, granularity.duration);  
    let fields = [];  
    let multi = this.client.multi()     

    for (var timestamp = begin;  timestamp <= end; timestamp += granularity.duration){
        var key = this._getKeyName(granularity, timestamp);
        multi.zcount(key, timestamp, timestamp)
    }

    multi.exec(function(err, replies){
        var results = [];    
        for (var i = 0 ; i < replies.length ; i++) 
        {      
            var timestamp = beginTimestamp + i * granularity.duration;
            var value = parseInt(replies[i], 10) || 0;      
            results.push({timestamp: timestamp, value: value});    
        }
        onComplete(granularityName, results)
    })


}

exports.TimeSeries = TimeSeries

// for testing
// timeSeries = new TimeSeries(client, 'time')
// timeSeries.insert(4000)

// timeSeries.fetch('1sec', 0, 130, function(granularityName, results){
//     console.log("granularityName: ", granularityName)
//     console.log("result: ", results)
// })

// client.quit()