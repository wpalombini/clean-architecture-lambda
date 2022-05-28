import { Context, Callback, APIGatewayEvent } from 'aws-lambda';
import { container } from 'tsyringe';
import { IOrderUseCase } from '@domain/interfaces/use-cases/iorder.use-case';
import { TYPES } from '@domain/types';

export class App {
  private orderUseCase: IOrderUseCase;

  constructor(private event: APIGatewayEvent, private context: Context, private callback: Callback) {
    this.orderUseCase = container.resolve(TYPES.IOrderUseCase);
  }

  public async init() {
    try {
      switch (this.event.httpMethod) {
        case 'GET':
          return this.getMethodResponse(await this.orderUseCase.getAll());
        case 'POST':
          return this.postMethodResponse(await this.orderUseCase.create(JSON.parse(this.event.body)));
        default:
          throw new Error('Http method not supported');
      }
    } catch (err) {
      return this.buildErrorResponse({ message: err.message });
    }
  }

  private getMethodResponse<T>(body: T) {
    return this.buildResponse(200, body);
  }

  private postMethodResponse<T>(body: T) {
    return this.buildResponse(201, body);
  }

  private buildErrorResponse<T>(body: T) {
    return this.buildResponse(500, body);
  }

  private buildResponse<T>(statusCode: number, body: T) {
    return {
      statusCode,
      body: JSON.stringify(body),
      // body: JSON.stringify({
      //   ...body,
      // env: process.env.ENVIRONMENT,
      // event: this.event,
      // }),
    };
  }
}
