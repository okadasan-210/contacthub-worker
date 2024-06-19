import { Context, Hono } from 'hono';
import companyController from '@/Controller/company';
import workerController from '@/Controller/worker';

const app = new Hono<Env>();

app.route('/companies', companyController);
app.route('/workers', workerController);


export default {
  async fetch(request: Request, env: Env['Bindings'], context: ExecutionContext): Promise<Response> {
    // return new Response('こんにちは');

    return app.fetch(request, env, context);
  },
};
