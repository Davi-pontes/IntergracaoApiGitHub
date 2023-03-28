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
    const token = requisitarAcessoAoToken()
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
function chamadaHtml(){
    app.get('/login', function(req,res){
        res.sendFile(__dirname + '/src/tela.html')
    })
    app.get('/oauth2callback', function (req,res){
        res.sendFile(__dirname + '/src/callback.html')
    })
}
function requisitarConsentimento(){
    app.get('/signin',(request,response) => {
        
        let url =
        "https://api.login.yahoo.com/oauth2/request_auth_fe?client_id=dj0yJmk9SjlLWVd3Qk9pQ3V3JmQ9WVdrOU1USk9UelZDVTFFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWYw&response_type=code&redirect_uri=https://www.datapriority.com.br/";
        response.redirect(url);
    });
}
function requisitarAcessoAoToken(){
    var dashboard_response = {};
app.get('/dashboard',(req,res) => {
    let authCode = req.query.code;
    let url = 'https://api.login.yahoo.com/oauth2/get_token';
    let requestBody = {
        client_id :
            'dj0yJmk9SjlLWVd3Qk9pQ3V3JmQ9WVdrOU1USk9UelZDVTFFbWNHbzlNQT09JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWYw',
        client_secret :
            'dc4422416f9b878e0c71d07a1173eea40d091ed1',
        redirect_uri : 'https://www.datapriority.com.br/',
        code : authCode,
        grant_type : 'authorization_code'
    };
    let data =
        Object.keys(requestBody).map(key=>encodeURIComponent(key) + '=' + encodeURIComponent(requestBody[key])).join('&');
    fetch(url, {
        method: 'post',
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        },
        body: data
    }).then(function (response) {
        dashboard_response=response.json();
        return response.json();
    });
});
}

iniciarServidor()
chamadaHtml()
requisitarConsentimento()
requisitarAcessoAoToken()
