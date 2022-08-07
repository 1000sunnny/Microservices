"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'Kafka',
    brokers: ['localhost:9092']
});
const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'test-group' });
const run = async () => {
    // Producing
    await producer.connect();
    setInterval(async () => {
        await producer.send({
            topic: 'test-topic',
            messages: [
                { value: 'Hello KafkaJS user!' },
            ],
        });
    }, 1000);
    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: 'test-topic', fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            var _a;
            console.log({
                partition,
                offset: message.offset,
                value: (_a = message === null || message === void 0 ? void 0 : message.value) === null || _a === void 0 ? void 0 : _a.toString(),
                topic
            });
        },
    });
};
run().catch(console.error);
