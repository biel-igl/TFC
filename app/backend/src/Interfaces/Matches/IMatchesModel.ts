import { IMatches } from './IMatches';

export interface IMatchesModel {
  findAll(filterProgres: boolean | null): Promise<IMatches[]>,
  update(id: IMatches['id']): Promise<void>,
  updateMatch(id: IMatches['id'], goals: number[]): Promise<void>,
  createNewMatch(data: Partial<IMatches>): Promise<IMatches | null>
}
