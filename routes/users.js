import express from 'express';
import fs from 'fs';
import usersData from '../user.json' assert { type: 'json' };

const router = express.Router();

// all routes in here are starting with /users
router.get('/', (req, res) => {
  res.send(usersData);
});

router.post('/', (req, res) => {
  const { firstName, lastName, age } = req.body;
  const newUser = { firstName, lastName, age };

  usersData.push(newUser); // add the new user to the existing array

  // write the updated data to the JSON file
  fs.writeFile('../user.json', JSON.stringify(usersData), (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing to file');
    } else {
      res.status(200).send('User added successfully');
    }
  });
});

export default router;
