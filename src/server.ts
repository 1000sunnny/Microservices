import express from "express";
import { sendMessages } from "./producer";
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post('/send-msg', (req, res) => {
  try {
    const { topic, message } = req.body

    sendMessages({
      topic,
      messages: [{ value: message, partition: 0 }]
    })

    res.status(200).send('Message send successfully')
  } catch (error) {
    res.status(500).send(`Could not send Message: ${error}`)
  }
})

app.listen(3000, () => { return console.log('Server running on port 3000') });