import { CLOUDAMQP_URL } from '../config/rabbit';
import amqp from 'amqplib';

const messageQueueConnectionString = CLOUDAMQP_URL;

async function setup() {
  console.log('Iniciando Script de criação de filas');

  const connection = await amqp.connect(messageQueueConnectionString);

  const channel = await connection.createChannel();

  await channel.assertExchange('processing', 'direct', { durable: true });

  await channel.assertQueue('processing.requests', { durable: true });
  await channel.assertQueue('processing.results', { durable: true });

  await channel.bindQueue('processing.requests', 'processing', 'request');
  await channel.bindQueue('processing.results', 'processing', 'result');

  console.log('Setup terminou!');
  process.exit();
}

setup();
