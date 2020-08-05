const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode= require('./utils/geocode')
const app = express()

//finding path for the same
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath= path.join(__dirname,'../templates/partials')

//set uphandle bars and locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jaya Singh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jaya Singh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
      title: 'Help Me!!',
      name: 'Jaya Singh',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {

  if(!req.query.address)
  {
    return res.send({
      error:'You are required to send adddress to champ!!'
    })
  }
 geocode( req.query.address, (error,{latitude, longitude, location} ={} ) =>
 {
   if(error)
   {
     return res.send({error: error})
   }
    forecast(latitude, longitude,(error,forecastData) => {
      if(error)
      {
        return res.send({error: error})
      }
      res.send({
        forecast:forecastData,
        location,
        address:req.query.address

      })
    })
 })
})


app.get('/products',(req,res) => {
  if(!req.query.search)
  {
    return res.send({
      error: 'You must provide a search'
    })
  }
  console.log(req.query.search)
  res.send({
    products: []
  })
})
app.get('/help/*',(req,res) =>
{
  res.render('404',{
  title: '404',
  name: 'Jaya Singh',
  errorMessage: 'We dont have help related to do this OOPsie!!'
})
})
app.get('*',(req,res) =>
{
  res.render('404',{
  title: '404',
  name: 'Jaya Singh',
  errorMessage: 'PageNotFound'
})
})
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
