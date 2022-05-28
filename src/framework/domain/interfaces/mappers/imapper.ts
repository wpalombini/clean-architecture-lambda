import { IDto } from '@domain/interfaces/dtos/idto';
import { IEntity } from '@domain/interfaces/entities/ientity';

export interface IMapper<T extends IEntity, U extends IDto> {
  entityToDto(source: T): U;
  dtoToEntity(source: U): T;
}
