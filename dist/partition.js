"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const kafkajs_1 = require("kafkajs");
const createPartition = async () => {
    const kafka = new kafkajs_1.Kafka({
        clientId: 'Kafka',
        brokers: ['127.0.0.1:9092', '127.0.0.1:9093']
    });
    const admin = kafka.admin();
    await admin.connect();
    await admin.createTopics({
        topics: [
            {
                topic: 'Test',
                numPartitions: 2,
                replicationFactor: 1
            }
        ]
    });
    await admin.disconnect();
};
createPartition().catch(error => console.log(error));
