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
export function under(r) {
  const foo = r.under('/foo');

  foo.get('/', async ctx => {
    await ctx.render({text: 'Foo'});
  });

  return foo;
}

export function route(r, foo) {
  foo.get('/bar', async ctx => {
    await ctx.render({text: 'Foo Bar'});
  }); 
}
```

TypeScript:

src/route/foo.ts

```js
import type {MojoRoute} from '@mojojs/core';

export function under(r: MojoApp) {
  const foo = r.under('/foo');

  foo.get('/', async ctx => {
    await ctx.render({text: 'Foo'});
  });

  return foo;
}

export function route(r: MojoRoute, foo: MojoRoute) {
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