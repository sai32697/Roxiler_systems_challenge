require('dotenv').config();
const bcrypt = require('bcryptjs');
const models = require('../models');

async function run() {
  await models.sequelize.sync({ force: true }); // drops and recreates
  const salt = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10', 10);
  const adminPassword = await bcrypt.hash('Admin@1234', salt);
  const ownerPassword = await bcrypt.hash('Owner@1234', salt);
  const userPassword = await bcrypt.hash('User@1234', salt);

  const admin = await models.User.create({
    name: 'System Administrator Default Name Here 000',
    email: 'admin@holo.com',
    password: adminPassword,
    address: 'HQ Address',
    role: 'admin'
  });

  const owner = await models.User.create({
    name: 'Store Owner Default Name LongNameHere 000',
    email: 'owner@holo.com',
    password: ownerPassword,
    address: 'Owner Address',
    role: 'owner'
  });

  const user = await models.User.create({
    name: 'Normal User Default Name LongName 00000',
    email: 'user@holo.com',
    password: userPassword,
    address: 'User Address',
    role: 'user'
  });

  const s1 = await models.Store.create({ name: 'Alpha Grocery', email: 'alpha@gro.com', address: 'Street 1', ownerId: owner.id });
  const s2 = await models.Store.create({ name: 'Beta Books', email: 'beta@books.com', address: 'Street 2', ownerId: owner.id });

  await models.Rating.create({ stars: 5, comment: 'Great!', userId: user.id, storeId: s1.id });
  await models.Rating.create({ stars: 4, comment: 'Nice', userId: user.id, storeId: s2.id });

  console.log('Seeded DB');
  process.exit(0);
}

run().catch(err=>{console.error(err); process.exit(1);});
