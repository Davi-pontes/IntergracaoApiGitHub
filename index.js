const { default: axios } = require('axios')
const { response } = require('express')
const express = require('express')
const passport = require('passport-oauth')
const YahooStrategy = require('passport-yahoo-oauth').Strategy

const app = express()

function autenticacaoNoOAuth(){
    const webServer = iniciarServidor()
    const OAthClient = criarOAthCliente()
    requisitarConsentimento()
    redirecionarCallback()
    requisitarAcessoAoToken()
    definirAutenticacaoGlobal()
    encerrarServidor()
}
function iniciarServidor(){
    return new Promise((resolve, reject) => {
        const porta = 8080

        const server = app.listen(porta, () => {
            console.log(`> ouvindo a porta http://localhost:${porta}`)

            resolve({
                app,
                server
            })
        })
    })
}
 //teste de conexação com yahoo
/*app.route('/signin').get((req,res) => {
    let url = "https://api.login.yahoo.com/oauth2/request_auth?client_id=dj0yJmk9SjlLWVd3Qk9pQ3V3JmQ9WVdrOU1USk9UelZDVTFFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWYw&redirect_uri=https://localhost:8080/&response_type=code&scope=openid"
    res.redirect(url)
})*/
function requisitarConsentimento(){
    passport.use(new YahooStrategy),{
        consumerKey: dj0yJmk9SjlLWVd3Qk9pQ3V3JmQ9WVdrOU1USk9UelZDVTFFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWYw,
        consumerSecret: dc4422416f9b878e0c71d07a1173eea40d091ed1,
        callbackURL: "https://localhost:8080/oauth2callback"
    }
    
    app.get('/auth/yahoo', 
    passport.authenticate('yahoo'));
    
    app.get('/oauth2callback',
        passport.authenticate('yahoo', {failureRedirect: '/'}),
            function(req,res)  
            {res.redirect('/oauth2callback')})
    
}
function ensureAuthenticated(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}
app.get('/oauth2callback', ensureAuthenticated, (req,res) => {
    res.send('bem vindo')
})



