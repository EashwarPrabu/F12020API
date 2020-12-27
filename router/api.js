const router = require("express").Router();
const Race = require("../model/Race");

router.get('/', (req, res) => {
  return res.json({
    status: "Success",
    message: 'Welcome to the Rest API!',
  });
});

router.get("/races", async (req, res) => {
  try {
    const result = await Race.find();
    if (!result) return res.send("Sorry, No data Available!");
    res.status(200).json(result);
  } catch(err) {
    res.status(400).send(err);
  }
});

router.get("/races/:race", async (req, res) => {
  const raceNumber = req.params.race;
  if(!raceNumber) return res.status(400).send('Race Number field cannot be empty!');
  try {
    const queriedRace = await Race.findOne({ raceNumber });
    if (!queriedRace) return res.send("Sorry, no such race was found! Kindly recheck the raceNumber");
    res.status(200).json(queriedRace);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/races", async (req, res) => {
  const race = new Race({
    raceName: req.body.raceName,
    location: req.body.location,
    raceNumber: req.body.raceNumber,
    raceWinner: req.body.raceWinner,
    driverOfTheDay: req.body.driverOfTheDay,
  });
  try {
    const savedRace = await race.save();
    res.status(200).send("Race Info stored successfully!");
  } catch (err) {
    res.status(400).send(err);
  }
});

router.put('/races', async (req, res) => {
  const raceNumber = req.body.raceNumber;
  if(!raceNumber) return res.status(400).send('Race Number field cannot be empty!');
  try {
    const updatedRace = await Race.findOneAndUpdate(
      {raceNumber},
      {$set: { 
        raceName: req.body.raceName,
        location: req.body.location,
        raceNumber: req.body.raceNumber,
        raceWinner: req.body.raceWinner,
        driverOfTheDay: req.body.driverOfTheDay,
      }}, {new: true, useFindAndModify: false});
      return res.send(`The ${updatedRace.raceName} was successfully updated!`);
  } catch(err) {
    return res.status(400).send(err);
  }
});

router.delete("/races", async (req, res) => {
  try {
    await Race.deleteMany();
    return res.send(`All the races were successfully deleted!`);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.delete("/races/:race", async (req, res) => {
  const raceNumber = req.params.race;
  if(!raceNumber) return res.status(400).send('Race Number field cannot be empty!');

  const targetRace = await Race.findOne({ raceNumber });
  if (!targetRace) return res.status(400).send("No such race exists");

  try {
    const deletedRace = await Race.findOneAndDelete({ raceNumber });
    return res.send(`The ${deletedRace.raceName} was successfully deleted!`);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
