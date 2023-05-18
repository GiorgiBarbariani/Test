const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  location: {
    line1: String,
    line2: String,
    postcode: String,
    city: String,
    state: String,
    country: String,
  },
  createdAt: Date,
});

function generateCustomer() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const email = faker.internet.email();
  const location = {
    line1: faker.location.streetAddress(),
    line2: faker.location.secondaryAddress(),
    postcode: faker.location.zipCode(),
    city: faker.location.city(),
    state: faker.location.state(),
    country: faker.location.country(),
  };
  const createdAt = new Date();

  return {
    firstName,
    lastName,
    email,
    location,
    createdAt,
  };
}

const Customer = mongoose.model('Customer', customerSchema);

async function insertCustomer(customer) {
  try {
    const newCustomer = new Customer(customer);
    const savedCustomer = await newCustomer.save();
    console.log('Покупатель успешно вставлен:', savedCustomer._id);
  } catch (err) {
    console.log('Ошибка при вставке покупателя:', err);
  }
}

async function generateAndInsertCustomers(numCustomers) {
  for (let i = 0; i < numCustomers; i++) {
    const customer = generateCustomer();
    await insertCustomer(customer);
  }
}

module.exports = generateAndInsertCustomers;
