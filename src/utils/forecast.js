const request = require('request')
const forecast = (latitude,longitude,callback) =>
{
const url= 'http://api.weatherstack.com/current?access_key=14807b84be82d1b8b33ea546da0f5ae0&query='+latitude+','+ longitude +'&units=m'
request({url, json:true},(error,{body }) =>{
  if(error)
  {
    callback('Unable to connect to internet',undefined)
  }
  else if(body.error)
  {
    callback('please enter valid location',undefined)
  }
  else
  {

     callback(undefined, body.current.weather_descriptions[0]+ ".is currently " + body.current.temperature+ " celsius and it feels like "+ body.current.feelslike+ " celsius " +" . The Current humidity details is : "+ body.current.humidity +" %")
  }
}
)}
module.exports= forecast
