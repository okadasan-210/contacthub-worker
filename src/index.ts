import { Context, Hono } from 'hono';
import companyController from '@/Controller/company';

const app = new Hono<Env>();

app.route('/companies', companyController);

export default {
  async fetch(request: Request, env: Env['Bindings'], context: ExecutionContext): Promise<Response> {
    // return new Response('こんにちは');

    return app.fetch(request, env, context);
  },
};
