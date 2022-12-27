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

JavaScript:

route/foo.js

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

TypeScript:

src/route/foo.ts

```js
import type {MojoApp, MojoRoute} from '@mojojs/core';

export function under(app: MojoApp) {
  const foo = app.under('/foo');

  foo.get('/', async ctx => {
    await ctx.render({text: 'Foo'});
  });

  return foo;
}

export function route(app: MojoApp, foo: MojoRoute) {
  foo.get('/bar', async ctx => {
    await ctx.render({text: 'Foo Bar'});
  }); 
}
```

# Install

```
npm install mojo-plugin-route
```

## Author

Lucas Tiago de Moraes

## Copyright

(c) Lucas Tiago de Moraes 2022

## License

MIT