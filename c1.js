const { kafka } = require('./client');
require('dotenv').config();
const groupId = process.env.KAFKA_GROUP_ID;
const kafkatopic = process.env.KAFKA_TOPIC2;
async function init() {
    console.log("init started");

    // Create a consumer instance
    const consumer = kafka.consumer({ groupId: groupId });

    console.log("consumer created");

    // Connect the consumer
    await consumer.connect();

    console.log("consumer connected");

    // Subscribe to the 'rider-update' topic
    await consumer.subscribe({ topics: [kafkatopic], fromBeginning: true });

    console.log("consumer subscribed to rider-update");

    // Start consuming messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            // This is where you can process the incoming messages
            console.log(`Received message from topic: ${topic}, partition: ${partition}`);
            console.log(`Message: ${message.key.toString()}`);
            console.log(`Message: ${message.value.toString()}`);
        },
    });
}

init();
