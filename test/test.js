import routePlugin from '../lib/route.js';
import mojo from '@mojojs/core';
import t from 'tap';

t.test('routePlugin', async t => {
  const app = mojo({mode: 'testing'});
  await app.plugin(routePlugin);

  const ua = await app.newTestUserAgent({tap: t});

  await ua.get('/page');
  
  await t.test('Route Page', async () => {    
    (await ua.getOk('/page')).statusIs(200).bodyLike(/Page/);
  });

  await t.test('Route Page Bar', async () => {
    (await ua.getOk('/page/bar')).statusIs(200).bodyLike(/Page Bar/);
  });

  await t.test('Route Page Baz', async () => {
    (await ua.getOk('/page/baz')).statusIs(200).bodyLike(/Page Baz/);
  });   

  await t.test('Route Page Foo', async () => {
    (await ua.getOk('/page/foo')).statusIs(200).bodyLike(/Page Foo/);
  });  

  await t.test('Route Account Sign-In', async () => {
    (await ua.postOk('/account/sign-in', {form: {user: 'foo', pass: 'bar'}})).statusIs(200).bodyLike(/True/);
    (await ua.postOk('/account/sign-in', {form: {user: 'foo', pass: 'baz'}})).statusIs(200).bodyLike(/False/);
  });  

  await ua.stop();

  t.end();
});