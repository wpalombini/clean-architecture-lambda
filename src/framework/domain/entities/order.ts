import { IEntity } from '@domain/interfaces/entities/ientity';

export class Order implements IEntity {
  public id: string;
  public description: string;
  public createdAt: Date;
}
