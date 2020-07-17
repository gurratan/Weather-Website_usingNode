const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utills/geocode')
const forcast = require('./utills/forecast')

const port= process.env.PORT || 3000

// Define path for Express configs 
const publicDirPath = path.join(__dirname, '../public')
const viewDir = path.join(__dirname, '../templateFiles/views')
const partialDir = path.join(__dirname, '../templateFiles/partials')

//Setup handlebar engine and view configuration 
app.set('view engine', 'hbs')
app.set('views', viewDir)
hbs.registerPartials(partialDir)

// Setup sattic directory to serve 
app.use(express.static(publicDirPath))


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Gurratan Grewal'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page',
        name: 'Gurratan',
        age: 28
    })
})

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Page',
        name: 'Gurratan'
    })
})

app.get('/product', (req, res) => {
    if (!req.query.search) {
        return res.send({
            Error : 'You must provide a serach term'
        })
    }
        req.query
        res.send({
            products: []
        })
    
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : ' Please provide the address..!! '
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            console.log('Please provide the valid add .. in app')
            return res.send({
                error : ' Please provide the valid address..!! '
            })
        }
        forcast(latitude, longitude, (error, {Temperature,Rain_Chance}={}) => {
            if (error) {
                return console.log(error)
            }
            res.send({
                location:location,
                Temperature:Temperature,
                Rain_Chance:Rain_Chance
            })

        })
    })
})

app.get('*', (req, res) => {
    res.render('404Page', {
        title: 404,
        name: 'Gurratan',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server started .. !! on port :'+port)
})