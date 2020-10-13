import { Request, Response } from 'express';
import PopulacaoRepository from '../repositories/populacao';
import RabbitService from '../services/rabbit';

const populacaoRepository = new PopulacaoRepository();
const rabbitService = new RabbitService();

interface EstadoProps {
  id?: number;
  nome: string;
  uf: string;
  populacao?: number;
}

class PopulacaoController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { uf } = request.params;

    const populacao = await populacaoRepository.show(uf.toUpperCase());

    if (!populacao) return response.status(404).send('UF não encontrada');

    return response.json(populacao);
  }

  public async getPopulacao(data: any): Promise<any> {
    const arrayPopulacao = data.estados.map(async (estado: EstadoProps) => {
      const populacao = await populacaoRepository.show(estado.uf.toUpperCase());
      return { ...estado, populacao: populacao?.populacao };
    });

    (async () => {
      try {
        const resultado = await Promise.all(arrayPopulacao);

        const channel = await rabbitService.createConfirmChannel(
          await rabbitService.connect(),
        );

        await rabbitService.publishToChannel(
          channel,
          'result',
          'processing',
          JSON.stringify(resultado),
        );
      } catch (err) {
        throw new Error('Erro ao publicar mensagem');
      }
    })();
  }
}

export default PopulacaoController;
