"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'Kafka',
    brokers: ['127.0.0.1:9092']
});
const run = async () => {
    const consumer = kafka.consumer({ groupId: `test-group-${Math.floor(Math.random() * 2)}` });
    // Consuming
    await consumer.connect();
    await consumer.subscribe({ topic: 'Test', fromBeginning: true });
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
