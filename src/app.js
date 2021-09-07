const fs = require('fs');
const path = require('path');
const express = require('express');
const dataJS= require('./data');
const { accounts, users, writeJSON} = dataJS;
const app = express();
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:true}));
app.use('/account', accountRoutes);
app.use('/services', servicesRoutes);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const port = 3000;

app.get('/', (req, res) => {
    res.render('index',{ title: 'Account Summary',accounts:accounts, profile: '/profile', Profile: 'Karthik',transfer:'/transfer', Transfer:'Transfer' });
});
app.get('/profile', (req, res) => {
    res.render('profile',{ user: users[0]});
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})