import amqplib from 'amqplib';

const queueName = "wdj";
const msg = "comment";

const sendMsg = async () => {
    const connection = await amqplib.connect('amqps://nipvobhi:pKKj_gx-S1rsuJc7MdVvWJpOtdYMsWU0@rattlesnake.rmq.cloudamqp.com/nipvobhi');
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: false });
    channel.sendToQueue(queueName, Buffer.from(msg));
    console.log('Sent: ', msg);
    setTimeout(() => {
        connection.close();
        process.exit(0);
    }, 500)
}

sendMsg();