"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const producer_1 = require("./producer");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.post('/send-msg', (req, res) => {
    try {
        const { topic, message } = req.body;
        (0, producer_1.sendMessages)({
            topic,
            messages: [{ value: message, partition: 0 }]
        });
        res.status(200).send('Message send successfully');
    }
    catch (error) {
        res.status(500).send(`Could not send Message: ${error}`);
    }
});
app.listen(3000, () => { return console.log('Server running on port 3000'); });
