# mojo-plugin-route

Plugin to loader files of routes to your mojo.js application.

index.js

```js
import mojo from '@mojojs/core';
import routePlugin from 'mojo-plugin-route';

const app = mojo();
app.plugin(routePlugin);

app.start();
```

route/app.js

```js
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
```