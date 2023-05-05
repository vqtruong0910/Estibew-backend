/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  const { faker } = require('@faker-js/faker');
  const _ = require('lodash');
  const bcrypt = require('bcrypt');

  await knex('user').del()
  for (let i = 1; i <= 20; i++) {
    const plain = "123456"; // faker.internet.password();
    const password = bcrypt.hashSync(plain, bcrypt.genSaltSync(10));
    const userName = faker.internet.userName();
    const email = faker.internet.email();
    const phone = faker.phone.number('+## ### ### ###');
    const birthday = faker.date.between(
      '1982-01-01T00:00:00.000Z',
      '2004-01-01T00:00:00.000Z'
    );

    const user = await knex('user').insert({
      username: userName,
      email,
      isEmailVerified: true,
      gender: _.sample(['male', 'female']),
      phone,
      password,
      birthday,
      avatar: faker.image.avatar(),
      provider: _.sample(['google', 'facebook', null]),
      providerId: i,
    }, '*');

    await knex('privacy').insert({
      userId: user[0].id
    });

    await knex('user_read').insert({
      userId: user[0].id
    });

  }

  const admplain = "123456"; // faker.internet.password();
  const admpassword = bcrypt.hashSync(admplain, bcrypt.genSaltSync(10));

  const admin = await knex('user').insert({
    username: "admin",
    email: "admin",
    isEmailVerified: true,
    gender: _.sample(['male', 'female']),
    password: admpassword,
    role: 1
  }, '*');

  await knex('privacy').insert({
    userId: admin[0].id
  });

  await knex('user_read').insert({
    userId: admin[0].id
  });
};
