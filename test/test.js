import routePlugin from '../lib/route.js';
import mojo from '@mojojs/core';
import t from 'tap';

t.test('routePlugin', async t => {
  const app = mojo({mode: 'testing'});
  app.plugin(routePlugin);

  const ua = await app.newTestUserAgent({tap: t});
  
  await t.test('Route Foo', async () => {
    (await ua.getOk('/foo')).statusIs(200).bodyLike(/Foo/);
  });

  await t.test('Route Foo Bar', async () => {
    (await ua.getOk('/foo/bar')).statusIs(200).bodyLike(/Foo Bar/);
  });  

  await ua.stop();

  t.end();
});