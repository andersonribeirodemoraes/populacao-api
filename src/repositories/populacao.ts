import db from '../database/connection';

interface PopulacaoProps {
  id?: number;
  uf: string;
  populacao: number;
}

class PopulacaoRepository {
  async show(uf: string): Promise<PopulacaoProps | undefined> {
    return await db<PopulacaoProps>('populacao')
      .where({ uf })
      .columns('uf', 'populacao')
      .first();
  }
}

export default PopulacaoRepository;
