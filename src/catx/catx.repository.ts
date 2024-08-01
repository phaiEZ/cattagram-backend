import { EntityRepository, Repository } from 'typeorm';
import { Catx } from './catx.entity';

@EntityRepository(Catx)
export class CatxRepository extends Repository<Catx> {}
