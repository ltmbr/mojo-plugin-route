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

## Version

2.0.1

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

## Examples

route/admin.js

```js
export function under(r) {
  return r.under('/admin'); 
}
```

route/admin/users.js

```js
export function any(r, admin) {
  return admin.any('/users');
}

export function route(r, admin, users) {
  users.get('/').to({controller: 'users', action: 'index'});            // route: /admin/users
  users.get('/view/:id').to({controller: 'users', action: 'view'});     // route: /admin/users/view/123
  users.get('/add').to({controller: 'users', action: 'add'});           // route: /admin/users/add
  users.get('/edit/:id').to({controller: 'users', action: 'edit'});     // route: /admin/users/edit/123
  users.get('/delete/:id').to({controller: 'users', action: 'delete'}); // route: /admin/users/delete/123
}
```

route/admin/articles.js

```js
export function any(r, admin) {
  return admin.any('/articles');
}

export function route(r, admin, articles) {
  articles.get('/').to({controller: 'articles', action: 'index'});            // route: /admin/articles
  articles.get('/view/:id').to({controller: 'articles', action: 'view'});     // route: /admin/articles/view/123
  articles.get('/add').to({controller: 'articles', action: 'add'});           // route: /admin/articles/add
  articles.get('/edit/:id').to({controller: 'articles', action: 'edit'});     // route: /admin/articles/edit/123
  articles.get('/delete/:id').to({controller: 'articles', action: 'delete'}); // route: /admin/articles/delete/123
}
```

## Author

Lucas Tiago de Moraes

## Copyright

(c) Lucas Tiago de Moraes 2022

## License

MIT