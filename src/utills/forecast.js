const request = require('request')
const { REPL_MODE_STRICT } = require('repl')

const forcast=(longitute,latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=550781d76242433570d3b7fea1a89108&query='+longitute+','+latitude
   // request({url:url,json:true},(error,response)=>{
       // Destructuring the object 
    request({url,json:true},(error,{body}={})=>{
        if(error){
            callback('Unable to connect to the server',undefined)
        }else if(body.error){
            callback('Unable to find the location: Please provide the correct location',undefined)
        }else{
            callback(undefined,{
                Temperature:body.current.temperature,
                Rain_Chance: body.current.precip,
                weather_desp:body.current.weather_descriptions[0],
                observation_time: body.current.observation_time,
                wind_speed : body.current.wind_speed,
                feelslike : body.current.feelslike
            })
        }
    }
    )
}

module.exports=forcast