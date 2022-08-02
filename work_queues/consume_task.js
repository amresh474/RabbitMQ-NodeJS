const amqplib = require('amqplib');

const queueName = "task";

const consumeTask = async () => {
    const connection = await amqplib.connect('amqps://nipvobhi:pKKj_gx-S1rsuJc7MdVvWJpOtdYMsWU0@rattlesnake.rmq.cloudamqp.com/nipvobhi');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.prefetch(1);
    console.log(`Waiting for messages in queue: ${queueName}`);
    channel.consume(queueName, msg => {
        const secs = msg.content.toString().split('.').length - 1;
        console.log("[X] Received:", msg.content.toString());
        setTimeout(() => {
            console.log("Done resizing image");
            channel.ack(msg);
        }, secs * 1000);
    }, { noAck: false })
}

consumeTask();