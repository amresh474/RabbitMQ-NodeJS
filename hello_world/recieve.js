import amqplib from 'amqplib';

const queueName = "wdj";

const recieveMsg = async () => {
    const connection = await amqplib.connect('amqps://nipvobhi:pKKj_gx-S1rsuJc7MdVvWJpOtdYMsWU0@rattlesnake.rmq.cloudamqp.com/nipvobhi');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    console.log(`Waiting for messages in queue: ${queueName}`);
    channel.consume(queueName, msg => {
        console.log("[X] Received:", msg.content.toString());
    }, { noAck: true })
}

recieveMsg();