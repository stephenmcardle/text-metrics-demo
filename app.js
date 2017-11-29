const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})

// initialize app
const app = vertex.app()
//app.use(bodyParser);

// import routes
const index = require('./routes/index')
const api = require('./routes/api')
const metrics = require('./routes/metrics')

// set routes
app.use('/', index)
app.use('/api', api) // sample API Routes
app.use('/metrics', metrics);


module.exports = app