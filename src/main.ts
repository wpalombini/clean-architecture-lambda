import 'reflect-metadata';
import 'module-alias/register';
import { Context, Callback } from 'aws-lambda';
import { container } from 'tsyringe';
import { IOrderUseCase } from '@domain/interfaces/use-cases/iorder.use-case';
import { OrderUseCase } from '@domain/use-cases/order.use-case';
import { App } from './app';
import { IOrderRepository } from '@domain/interfaces/repositories/iorder.repository';
import { OrderRepository } from '@infra/repositories/order.repository';
import { TYPES } from '@domain/types';
import { IOrderMapper } from '@domain/interfaces/mappers/iorder.mapper';
import { OrderMapper } from '@domain/mappers/order.mapper';

export const bootstrap = () => {
  container.register<IOrderUseCase>(TYPES.IOrderUseCase, { useClass: OrderUseCase });
  container.register<IOrderRepository>(TYPES.IOrderRepository, { useClass: OrderRepository });
  container.register<IOrderMapper>(TYPES.IMapper, { useClass: OrderMapper });

  return (event: any, context: Context, callback: Callback) => new App(event, context, callback);
};
