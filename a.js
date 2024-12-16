const { kafka } = require('./client');
require('dotenv').config();

const kafkatopic = process.env.KAFKA_TOPIC2;
console.log(kafkatopic)
async function init() {
    const admin = kafka.admin()
    await admin.connect()
    const topics = await admin.listTopics();
    console.log(topics);

    for (let i =0;i<topics.length;i++)
    {
        const metadata = await admin.fetchTopicMetadata({ topics: [topics[i]] });

        // Display the number of partitions
        metadata.topics.forEach(topic => {
            console.log(`Topic: ${topic.name}`);
            console.log(`Number of Partitions: ${topic.partitions.length}`);
        });
    }

    await admin.disconnect()
    console.log("admin disconnect");
}

init();