const mongoose = require("mongoose");
const faker = require("faker");
const { mongo } = require("./src/config/vars");
const User = require("./src/models/user.model");
const Message = require("./src/models/message.model");

const messagesSeedData = () => {
  const seedData = [];
  for (let i = 0; i <= 10; i += 1) {
    seedData.push({
      location: {
        type: "Point",
        coordinates: [
          parseFloat(faker.address.longitude()),
          parseFloat(faker.address.latitude()),
        ],
      },
      username: faker.internet.userName(),
      title: faker.lorem.words(5),
      body: faker.lorem.words(10),
    });
    console.log(`Created ${i} items`);
  }
  return seedData;
};

const usersSeedData = {
  email: "gkatsanos@gmail.com",
  password: "1234",
  firstName: "George",
  lastName: "Katsanos",
  active: true,
  gender: "male",
};

mongoose.connect(mongo.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

Message.deleteMany({}).then(() => Message.insertMany(messagesSeedData()));
User.deleteMany({})
  .then(() => User.create(usersSeedData))
  .then(() => console.log("seeding done"));
