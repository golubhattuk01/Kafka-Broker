const { Kafka } = require('kafkajs')
require('dotenv').config()
const kafkaapp = process.env.KAFKA_APP;
const kafkaBroker = process.env.KAFKA_BROKER;
console.log(kafkaBroker);
console.log(kafkaapp);

exports.kafka = new Kafka({
  clientId: kafkaapp,
  brokers: [kafkaBroker],
})