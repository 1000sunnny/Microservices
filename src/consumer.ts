import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'Kafka',
    brokers: ['127.0.0.1:9092']
});
const run = async () => {

    const consumer = kafka.consumer({ groupId: `test-group-${Math.floor(Math.random() * 2)}` })

    // Consuming
    await consumer.connect()
    await consumer.subscribe({ topic: 'Test', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message?.value?.toString(),
                topic
            })
        },
    })
}

run().catch(console.error)