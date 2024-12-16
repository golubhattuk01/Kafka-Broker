const { kafka } = require('./client');

async function init() {
    console.log("init started");
    const admin = kafka.admin()
    console.log("admin created");

    await admin.createTopics({
        topics: [
            {
                topic: "rider2",
                numPartitions: 2,
            },
        ],
    })

    console.log("topic  and partitions are created");

    // remember to connect and disconnect when you are done
    await admin.connect()
    await admin.disconnect()
    console.log("admin disconnect");
}

init();