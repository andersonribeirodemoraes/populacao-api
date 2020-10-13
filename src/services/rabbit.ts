import amqp, { Channel, ConfirmChannel, Connection } from 'amqplib';
import { CLOUDAMQP_URL } from '../config/rabbit';

class RabbitService {
  async connect() {
    return await amqp.connect(CLOUDAMQP_URL);
  }

  async createConfirmChannel(connection: Connection) {
    return await connection.createConfirmChannel();
  }

  async createChannel(connection: Connection) {
    return await connection.createChannel();
  }

  consume(
    connection: Connection,
    channel: Channel,
    exchangeName: string,
    routingKey: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      channel.consume(`${exchangeName}.${routingKey}`, async function (msg) {
        if (msg) {
          const msgBody = msg.content.toString();
          const data = JSON.parse(msgBody);

          await channel.ack(msg);
          resolve(data);
        }
      });

      connection.on('close', err => reject(err));

      connection.on('error', err => reject(err));
    });
  }

  publishToChannel(
    channel: ConfirmChannel,
    routingKey: string,
    exchangeName: string,
    data: string,
  ) {
    return new Promise((resolve, reject) => {
      channel.publish(
        exchangeName,
        routingKey,
        Buffer.from(JSON.stringify(data), 'utf-8'),
        { persistent: true },
        function (err, ok) {
          if (err) return reject(err);
          resolve();
        },
      );
    });
  }
}

export default RabbitService;
