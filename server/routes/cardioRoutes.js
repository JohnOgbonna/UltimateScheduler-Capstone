const express = require('express');
const router = express.Router(); 
const fs = require('fs');


readCardio = () =>{ 
    const cardioex = fs.readFileSync('./data/cardioexcercises.json');
    return JSON.parse(cardioex);
} 

router.get('/', (_req, res) => {
    const cardioData = readCardio();
    res.status(200).json(cardioData);
  });  

  router.get('/nogym', (_req, res) => {
    const cardioData = readCardio();
    let nogymdata = cardioData.filter(exercise => !exercise.gym_required)
    res.status(200).json(nogymdata);
  }); 

  module.exports = router;