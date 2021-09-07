const fs = require('fs');
const path = require('path');
const express = require('express');
const dataJS= require('./data');
const { accounts, users, writeJSON} = dataJS;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const port = 3000;

app.get('/', (req, res) => {
    res.render('index',{ title: 'Account Summary',accounts:accounts, profile: '/profile', Profile: 'Karthik',transfer:'/transfer', Transfer:'Transfer' });
});
app.get('/savings', (req, res) => {
    res.render('account',{ account:accounts.savings});
});
app.get('/checking', (req, res) => {
    res.render('account',{ account:accounts.checking});
});
app.get('/credit', (req, res) => {
    res.render('account',{ account:accounts.credit});
});
app.get('/profile', (req, res) => {
    res.render('profile',{ user: users[0]});
});
app.get('/transfer', (req, res) => {
    res.render('transfer',{ user: users[0]});
});
app.post('/transfer', (req, res) => {
    accounts[req.body.from].balance = accounts[req.body.from].balance - req.body.amount;
    accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount,10);
    writeJSON();
    res.render('transfer',{message: "Transfer Completed"})
});
app.get('/payment', (req, res) => {
    res.render('payment',{ account: accounts.credit});
});
app.post('/payment', (req, res) => {
    accounts.credit.balance = accounts.credit.balance - req.body.amount;
    accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);
    writeJSON();
    res.render('payment',{ message: "Payment Successful", account: accounts.credit });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})