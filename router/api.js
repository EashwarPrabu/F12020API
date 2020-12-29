const router = require('express').Router();
const Race = require('../model/Race');
const { raceValidator } = require('../utils/validator');

router.get('/races', async (req, res) => {
  try {
    const result = await Race.find();
    if (!result) return res.send('Sorry, No data Available!');
    res.status(200).json(result);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/races/:race', async (req, res) => {
  const { value, error } = raceValidator({ raceNumber: req.params.race });
  if (error) return res.status(400).send(error.details[0].message);
  const { raceNumber } = value;
  try {
    const queriedRace = await Race.findOne({ raceNumber });
    console.log(queriedRace);
    if (!queriedRace)
      return res.send(
        'Sorry, no such race was found! Kindly recheck the raceNumber.'
      );

    res.status(200).json(queriedRace);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/races', async (req, res) => {
  const { value, error } = raceValidator({ raceNumber: req.body.raceNumber });
  if (error) return res.status(400).send(error.details[0].message);
  const { raceNumber } = value;
  console.log(raceNumber);
  try {
    const existingRace = await Race.findOne({ raceNumber });
    console.log(existingRace);
    if (!existingRace) {
      const race = new Race({
        raceName: req.body.raceName,
        location: req.body.location,
        raceNumber: req.body.raceNumber,
        raceWinner: req.body.raceWinner,
        driverOfTheDay: req.body.driverOfTheDay,
      });
      const savedRace = await race.save();
      res
        .status(200)
        .send(`Info about the ${savedRace.raceName} stored successfully!`);
    } else {
      return res
        .status(400)
        .send(
          `The ${existingRace.raceName} already exists. You can use the PUT method to update the info if you want!`
        );
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/races', async (req, res) => {
  const { value, error } = raceValidator({ raceNumber: req.body.raceNumber });
  if (error) return res.status(400).send(error.details[0].message);
  const { raceNumber } = value;
  try {
    const updatedRace = await Race.findOneAndUpdate(
      { raceNumber },
      {
        $set: {
          raceName: req.body.raceName,
          location: req.body.location,
          raceNumber: req.body.raceNumber,
          raceWinner: req.body.raceWinner,
          driverOfTheDay: req.body.driverOfTheDay,
        },
      },
      { new: true, useFindAndModify: false }
    );
    return res.send(`The ${updatedRace.raceName} was successfully updated!`);
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.delete('/races', async (req, res) => {
  try {
    await Race.deleteMany();
    return res.send(`All the races were successfully deleted!`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete('/races/:race', async (req, res) => {
  const { value, error } = raceValidator({ raceNumber: req.params.race });
  if (error) return res.status(400).send(error.details[0].message);

  const { raceNumber } = value;
  const targetRace = await Race.findOne({ raceNumber });
  if (!targetRace) return res.status(400).send('No such race exists');

  try {
    const deletedRace = await Race.findOneAndDelete({ raceNumber });
    return res.send(`The ${deletedRace.raceName} was successfully deleted!`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
