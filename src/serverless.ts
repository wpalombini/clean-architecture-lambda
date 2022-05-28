import { Handler, Context, Callback } from 'aws-lambda';
import { App } from './app';
import { bootstrap } from './main';

let app: (event: any, context: Context, callback: Callback) => App;

export const handler: Handler = async (event: any, context: Context, callback: Callback) => {
  app = app ?? bootstrap();
  return app(event, context, callback).init();
};
