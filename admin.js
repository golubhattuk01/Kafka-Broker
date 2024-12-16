const { kafka } = require('./client');
require('dotenv').config();

const kafkatopic = process.env.KAFKA_TOPIC;
console.log(kafkatopic)
async function init() {
    console.log("init started");
    const admin = kafka.admin()
    console.log("admin created");

    await admin.createTopics({
        topics: [
            {
                topic: kafkatopic,
                numPartitions: 2,
            },
        ],
    })

    console.log("topic and partitions are created");

    // remember to connect and disconnect when you are done
    await admin.connect()
    await admin.disconnect()
    console.log("admin disconnect");
}

init();