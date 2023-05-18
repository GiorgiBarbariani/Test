const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const Customer = require('../app/schema');
const generateAndInsertCustomers = require('../app/schema');
require('dotenv').config();

generateAndInsertCustomers();

mongoose.connect(process.env.DB_URI);

const anonymizedCustomerSchema = new mongoose.Schema({
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

const AnonymizedCustomer = mongoose.model('AnonymizedCustomer', anonymizedCustomerSchema);

function anonymizeCustomer(customer) {
  const anonymizedFirstName = faker.random.alphaNumeric(8);
  const anonymizedLastName = faker.random.alphaNumeric(8);
  const anonymizedEmail = `${faker.random.alphaNumeric(8)}@${faker.random.alphaNumeric(8)}.com`;
  const anonymizedLocation = {
    line1: faker.random.alphaNumeric(8),
    line2: faker.random.alphaNumeric(8),
    postcode: faker.random.alphaNumeric(8),
    city: faker.random.alphaNumeric(8),
    state: faker.random.alphaNumeric(8),
    country: faker.random.alphaNumeric(8),
  };
  const anonymizedCreatedAt = customer.createdAt;

  return {
    firstName: anonymizedFirstName,
    lastName: anonymizedLastName,
    email: anonymizedEmail,
    location: anonymizedLocation,
    createdAt: anonymizedCreatedAt,
  };
}

async function handleDocumentChange(documentId) {
  try {
    const customer = await Customer.findById(documentId).exec();
    if (customer) {
      const anonymizedCustomer = anonymizeCustomer(customer);
      await insertAnonymizedCustomer(anonymizedCustomer);
      console.log('Документ успешно анонимизирован:', customer._id);
    } else {
      console.log('Документ не найден:', documentId);
    }
  } catch (err) {
    console.log('Ошибка при анонимизации документа:', err);
  }
}

async function handleNewDocument(documentId) {
  try {
    const customer = await Customer.findById(documentId).exec();
    if (customer) {
      const anonymizedCustomer = anonymizeCustomer(customer);
      await insertAnonymizedCustomer(anonymizedCustomer);
      console.log('Новый документ успешно анонимизирован:', customer._id);
    } else {
      console.log('Документ не найден:', documentId);
    }
  } catch (err) {
    console.log('Ошибка при анонимизации нового документа:', err);
  }
}

async function insertAnonymizedCustomer(customer) {
  try {
    const newAnonymizedCustomer = new AnonymizedCustomer(customer);
    const savedAnonymizedCustomer = await newAnonymizedCustomer.save();
    console.log('Анонимизированный покупатель успешно вставлен:', savedAnonymizedCustomer._id);
  } catch (err) {
    console.log('Ошибка при вставке анонимизированного покупателя:', err);
  }
}


module.exports = insertAnonymizedCustomer;
