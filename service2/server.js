const http = require('http');
const { Kafka } = require('kafkajs')

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: ['kafka:9092']
})

const consumer = kafka.consumer({ groupId: 'test-group' })
let lastMessage = '';

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: 'service2', fromBeginning: false })
  
  
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      lastMessage = message.value.toString();
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })  
}


run().catch(console.error)

const requestListener = function (req, res) {
  res.writeHead(200);
  console.log(lastMessage);
  res.end(lastMessage);
}

const server = http.createServer(requestListener);
server.listen(3000);
// http://localhost:8001/api/v1/namespaces/default/services/client-service/proxy/hello
