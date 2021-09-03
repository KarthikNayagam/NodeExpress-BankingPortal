const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const port = 3000;
app.get('/', (req, res) => {
    res.render('index',{ title: 'Index', profile: '/profile', Profile: 'Karthik',transfer:'/transfer', Transfer:'Transfer' });
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})