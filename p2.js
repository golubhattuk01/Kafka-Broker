const { kafka } = require('./client');
const { Partitioners } = require('kafkajs');
require('dotenv').config();
const kafkatopic = process.env.KAFKA_TOPIC2;
// console.log(kafkatopic);


const readline = require("readline");
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,

})

async function init() {
    console.log("init started");
    const producer = kafka.producer({
        allowAutoTopicCreation: false,
        transactionTimeout: 30000,
        createPartitioner: Partitioners.LegacyPartitioner  // Use the legacy partitioner
    });

    console.log("producer created");

    await producer.connect();

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line" , async function name(line) {
         const [rider , location] = line.split(' ');

         await producer.send({
            topic: kafkatopic,
            messages: [
                { key: rider, value: location, partition: location.toLowerCase() == 'north'? 0:1}
                // { key: 'key2', value: 'hey hey!', partition: 1 }
            ],
        })
    }).on('close' , async()=>
    {
        await producer.disconnect();
        console.log("producer disconnect");
    })
}

init();
