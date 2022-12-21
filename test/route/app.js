export function under(app) {
  const foo = app.under('/foo');

  foo.get('/', async ctx => {
    await ctx.render({text: 'Foo'});
  });

  return foo;
}

export function route(app, foo) {
  foo.get('/bar', async ctx => {
    await ctx.render({text: 'Foo Bar'});
  }); 
}