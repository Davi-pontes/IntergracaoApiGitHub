const { default: axios } = require('axios')
const express = require('express')

const app = express()

app.listen('8080')

app.route('/').get ((req,res) => {

    axios.get('https://api.github.com/users/Davi-pontes')
    .then(result => res.send(`<img src="${result.data.avatar_url}"/>`))
    .catch(error => console.error(error))
})