import RabbitService from './services/rabbit';
import PopulacaoController from './controllers/populacao';

const rabbitService = new RabbitService();
const populacaoController = new PopulacaoController();

async function setup() {
  console.log('Iniciou consumer');

  const connection = await rabbitService.connect();
  const channel = await rabbitService.createChannel(connection);
  await channel.prefetch(1);

  const result = await rabbitService.consume(
    connection,
    channel,
    'processing',
    'requests',
  );

  const data = JSON.parse(result);

  populacaoController.getPopulacao(data);
}

setup();
