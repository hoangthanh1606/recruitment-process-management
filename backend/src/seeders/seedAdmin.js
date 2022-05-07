const bcrypt = require('bcryptjs');
const { Account } = require('../apis/models');
const mongooseLoader = require('../loaders/mongooseLoader')

async function seed() {
  try {
    let password = await bcrypt.hash("admin123", 10);
    let admin = {
      "email": "cuongnguyen.devplus@gmail.com",
      "fullname": "Nguyễn Văn Cường",
      "password": password,
    };
    await mongooseLoader();
    await Account.create(admin);
  } catch (e) {
  }
}

seed();
