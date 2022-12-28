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

```ts
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

## Install

```
npm install mojo-plugin-route
```

## Attribute

### app

route/bar.js

```js
export const app = true;

export function under(app, r) {
  return r.under('/bar'); 
}

export function route(app, r, bar) {
  bar.get('/', async ctx => {
    await ctx.render({text: 'Bar'});
  }); 
}
```

when set app, methods any, under and route will receive app as the first parameter.

## Methods

### any

```js
export function any(r) {
  return r.any('/foo');
}
```

when set any, it is saved in reference.

### under

```js
export function under(r) {
  return r.under('/bar'); 
}
```

when set under, it is saved in reference.

### route

```js
export function route(r) {
  r.get('/baz', async ctx => {
    await ctx.render({text: 'Baz'});
  }); 
}
```

route method can receive reference from namespace, any or under, under is defaulting about any.

## Author

Lucas Tiago de Moraes

## Copyright

(c) Lucas Tiago de Moraes 2022

## License

MIT