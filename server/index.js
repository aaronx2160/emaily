const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

//middlewares
app.use(cors())
app.use(bodyParser.json())

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log('Server started, listening at 5000')
})

//routes
app.use('/api', require('./routers'))
