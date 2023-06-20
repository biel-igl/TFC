import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(filterProgres: boolean | null): Promise<IMatches[]>,
  /* findById(id: IMatches['id']): Promise<IMatches | null> */
}
