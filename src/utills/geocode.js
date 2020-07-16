const request = require('request')

const geoCode=(address,callback)=>{
   const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ3VycmF0YW5ncmV3YWwiLCJhIjoiY2tjZHV2MmlzMDI0ZDJ3cGg0bGV5Z3g3biJ9.F-o5x75b6__6BHQDd5R2WQ&limit=1'
   
   //request({url:geoUrl,json:true},(error,response)=>{
       // After destructuring the Objects
    request({url,json:true},(error,{body}={})=>{
             if(error){
                 callback('unable to connect to location services',undefined)
             }else if(body.features.length === 0){
                 callback('Please provide the valid City',undefined)
           }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude:body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
    }

    module.exports = geoCode