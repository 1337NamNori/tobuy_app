const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const Item = require('./models/Item.js');

const app = express();

const mongodb = `mongodb+srv://namnori:todoapp123@cluster0.qoyff.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(() => {
    console.log('Database is connected');
    app.listen(PORT, () => {
        console.log(`Access http://localhost:${PORT}`);
    });
}).catch(err => {
    console.log(err);
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout', 'layout/mainLayout');
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);



app.get('/add-item', (req, res) => {
    res.render('add-item');
});

app.post('/add-item', (req, res) => {
    const item = new Item(req.body);
    item.save()
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
})

app.get('/item/:id', (req, res) => {
    Item.findById(req.params.id)
        .then(item => res.render('item-detail', { item }))
        .catch(err => console.log(err));
})

app.delete('/item/:id', (req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json({ redirect: '/' }))
        .catch(err => console.log(err));
})

app.put('/item/:id', (req, res) => {
    Item.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.json({ message: 'Update Successfully!' }))
        .catch(err => console.log(err));
})

app.get('/', (req, res, next) => {
    Item.find()
        .then(items => res.render('index', { items }))
        .catch(err => console.log(err));
});

app.use((req, res) => {
    res.render('404');
});

