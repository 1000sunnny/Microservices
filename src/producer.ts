import { Kafka } from 'kafkajs'

const kafka = new Kafka({
    clientId: 'Kafka',
    brokers: ['127.0.0.1:9092']
})

const producer = kafka.producer()

const run = async () => {
    // Producing
    await producer.connect()

    let item = 0

    setInterval(async () => {
        item++
        await producer.send({
            topic: 'Test',
            messages: [
                { value: `${item}`, partition: Math.floor(Math.random() * 2) },
            ],
        })
    }, 1000)
}

export const sendMessages = async ({ topic, messages }: { topic: string, messages: { value: string, partition: number }[] }) => {
    await producer.connect()

    await producer.send({
        topic,
        messages,
    })
}

run().catch(console.error)