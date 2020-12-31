const express = require('express')
const app = express()
const port = 8080
const cookieParser = require('cookie-parser')

const LoginRoute = require('./routes/login.route');
const HomeRoute = require('./routes/home.route');
const HealthRoute = require('./routes/health.route');
const ChartRoute = require('./routes/chart.route');
const AdminRoute = require('./routes/admin.route');

const AuthMiddleware = require('./middlewares/auth.middleware')

require('dotenv').config()
const cors = require('cors');

app.get('/', (req, res) => {
  res.send('Welcome broooo!!');
})

app.use(cookieParser())

app.use(express.json())

// allow sharing info between backend and frontend
app.use(cors({ 
  origin: "http://localhost:3000", 
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true, 
}));

app.use('/auth', LoginRoute)
app.use('/get-home', AuthMiddleware.requireAuth, HomeRoute)
app.use('/input-data', AuthMiddleware.requireAuth, HealthRoute)
app.use('/chart', AuthMiddleware.requireAuth, ChartRoute)
app.use('/admin', AuthMiddleware.requireAuth, AdminRoute)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})