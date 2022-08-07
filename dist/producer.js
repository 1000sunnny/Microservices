"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessages = void 0;
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'Kafka',
    brokers: ['127.0.0.1:9092']
});
const producer = kafka.producer();
const run = async () => {
    // Producing
    await producer.connect();
    let item = 0;
    setInterval(async () => {
        item++;
        await producer.send({
            topic: 'Test',
            messages: [
                { value: `${item}`, partition: Math.floor(Math.random() * 2) },
            ],
        });
    }, 1000);
};
const sendMessages = async ({ topic, messages }) => {
    await producer.connect();
    await producer.send({
        topic,
        messages,
    });
};
exports.sendMessages = sendMessages;
run().catch(console.error);
