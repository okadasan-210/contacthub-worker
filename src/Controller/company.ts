import { zValidator } from '@hono/zod-validator';
import { Context, Hono } from 'hono';
import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';
import { CompanyEntity } from '@/Entity/Company.entry';

const app = new Hono<Env>();

app
  .post(
    '/',
    zValidator(
      'json',
      z.object({
        name: z.string().min(1).max(255),
        address: z.string().min(1).max(255),
        tel: z.string().min(1).max(255),
      }),
    ),
    async context => {
      const requestBody = context.req.valid('json');
      const id = uuidv4();
      const company = new CompanyEntity({ id, ...requestBody });

      const kv = context.env.KV;
      await kv.put(`company:${id}`, JSON.stringify(company));

      return context.json({ message: `company:${id}に${requestBody.name}を保存しました` });
    },
  )
  .get('/:uuid', async context => {
    const id = context.req.param('uuid');
    const kv = context.env.KV;
    const value = await kv.get(`company:${id}`);
    if (!value) {
      return context.json({ message: 'レコードが見つかりませんでした' }, 404);
    }

    const company = new CompanyEntity(JSON.parse(value));

    //JSON.parse等のメソッドの復習をする!!!!!!!!!!!

    return context.json(company);
  });

// .post('/kv-test', async context => {
//   const kv = context.env.KV;
//   const company = {
//     name: '株式会社おかだ',
//     updated_at: new Date().toISOString(),
//   };

//   await kv.put('companies_json', JSON.stringify(company));

//   return context.json({ message: 'kvにデータを保存しました' });
// })

// .get('/kv-get', async context => {
//   const kv = context.env.KV;
//   const list = await kv.list();
//   console.log(list);

//   const value = await kv.get('sample_key');
//   console.log(value);

//   return context.json({ message: 'kvテストに成功しました' });
// });

export default app;
