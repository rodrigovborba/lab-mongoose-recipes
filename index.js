const mongoose = require('mongoose');

// Import Recipe model
const Recipe = require('./models/Recipe');

// Import data
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo!');
    Recipe.create({
      title: 'Pizza',
      level: 'Easy Peasy',
      ingredients: ['dough', 'tomato', 'cheese'],
      cuisine: 'Italy',
      dishType: 'Dish',
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.ricardocuisine.com%2Fservices%2Frecipes%2F500x675_pizza.jpg&f=1&nofb=1',
      duration: 30,
      creator: 'Mario'
  })
  .then((document) => {
    console.log(document.title)
  })
  .then(() => {
    return Recipe.insertMany(data)
  })
  .then((updatedDocument) => { 
    console.log(updatedDocument.map(recipe => recipe.title))
  })
  .then((document) => {
    return Recipe.updateOne({title: 'Rigatoni alla Genovese'}, {duration: 100})
  })
  .then(() => {
    console.log('Rigatoni alla Genovese updated');
    return Recipe.deleteOne({title: 'Carrot Cake'})
  })
  .then(() => {
    console.log('Carrot Cake removed')
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  })
  .finally(() => {
    mongoose.connection.close();
  })
});