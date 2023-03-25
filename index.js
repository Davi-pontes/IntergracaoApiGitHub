const express = require('express')

const app = express()

app.listen('8080')

app.route('/').get((req,res) => res.send("Hello"))