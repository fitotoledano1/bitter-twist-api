const express = require('express');
const Firestore = require('@google-cloud/firestore');

const app = express();
const db = new Firestore();

app.use(express.json());
const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log('BitterTwist API is listening... ')
});

app.get('/', async (req, res) => {
    res.json({status: 'BitterTwist API working correctly.'})
});

app.get('/twists', async(req, res) => {
    var output = 
    db.collection("twists").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var twists = querySnapshot.docs.map(doc => doc.data());
            res.status(200).json(twists)
        });
    });
    return output
});