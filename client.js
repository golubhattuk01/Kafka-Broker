const { Kafka } = require('kafkajs')
require('dotenv').config()
const kafkaBroker = process.env.KAFKA_BROKER;



exports.kafka = new Kafka({
  clientId: 'my-app',
  brokers: [kafkaBroker],
})