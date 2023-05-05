/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function (knex) {
    const _ = require('lodash');
    const moment = require('moment/moment');
  
    for (let i = 1; i <= 10; i++) {
      await knex('client').insert({
        provider: _.sample(['google','facebook', 'Estibew']),
        ip: "127.0.0.1",
        userId: _.random(1, 20),
        created: moment().subtract(1, 'days')
      })
  
      await knex('client').insert({
        provider: _.sample(['google','facebook', 'Estibew']),
        ip: "127.0.0.1",
        userId: _.random(1, 20),
        created: moment().subtract(30, 'days')
      })
    }

    for (let i = 1; i <= 10; i++) {
        await knex('client').insert({
          ip: "127.0.0.1",
          created: moment().subtract(1, 'days')
        })
    
        await knex('client').insert({
          ip: "127.0.0.1",
          created: moment().subtract(30, 'days')
        })
      }
  };
  