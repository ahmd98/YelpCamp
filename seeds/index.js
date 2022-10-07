const express= require('express');
const mongoose= require('mongoose');
const {places,descriptors}=require('./seedHelpers')

const cities=require('./cities');
const Campground= require('../models/campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db= mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('Database connected');
});

const sample=arr=>arr[Math.floor(Math.random()* arr.length)];

const seedDB= async()=>{
    await Campground.deleteMany({});
    for (let i=0 ; i<200 ; i++ ){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
       const camp= new Campground({
            author:'6335019c99fd791634f5ab60',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            geometry: {
              type: "Point",
              coordinates: [
              cities[random1000].longitude,
              cities[random1000].latitude,]
          },
            image: [
                {
                  url: 'https://res.cloudinary.com/dellnjwa7/image/upload/v1664662557/YelpCamp/h0hvfnotzwwnhzirgebv.png',
                  filename: 'YelpCamp/h0hvfnotzwwnhzirgebv',
                },
                {
                  url: 'https://res.cloudinary.com/dellnjwa7/image/upload/v1664662555/YelpCamp/xafuzbxs2dpdwl9lv1uf.jpg',
                  filename: 'YelpCamp/xafuzbxs2dpdwl9lv1uf',
                }
              ],
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci odio beatae delectus a molestias eveniet illum repudiandae hic officia! Nobis libero ad quibusdam molestias eos quis. Dicta natus reprehenderit unde!',
            price
        })
        await camp.save();
    }
}
seedDB().then(()=>{
    mongoose.connection.close();});