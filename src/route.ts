import type {MojoApp, MojoRoute} from '@mojojs/core';
import {existsSync, lstatSync} from 'node:fs';
import globSync from 'glob';

export default function routePlugin(app: MojoApp, options: {namespace?: string} = {}) {
  new Route(app, options);
}

class Route {
  private app: MojoApp;
  private router: MojoRoute;
  private routes: any;

  constructor(app: MojoApp, options: {namespace?: string} = {}) {
    this.app = app;
    this.router = app.router;
    this.routes = {};

    // check if the namespace is setted, default is 'route'
    const namespace = options.namespace ?? 'route';

    // it is path using typescript
    const tsPathRoutes = app.home + '/lib/' + namespace;
    
    // it is path using javascript
    const jsPathRoutes = app.home + '/' + namespace;

    let pathRoutes = '';
    
    // check if exists path when it is using typescript
    if (existsSync(tsPathRoutes))
      pathRoutes = tsPathRoutes;

    // check if exists path when it is using javascript (default)
    if (existsSync(jsPathRoutes))
      pathRoutes = jsPathRoutes;      
    
    if (!existsSync(pathRoutes)) 
      throw Error(`Routes path ${pathRoutes} does not exist!`); 
      
    this.files(namespace, pathRoutes);
  }

  private async files(namespace: string, pathRoutes: string) {
    globSync(pathRoutes + '/**/*.js', {mark: true}, (er, files) => {
      files.forEach(async file => {
        if (lstatSync(file.toString()).isFile()) {
          await this.loadFile(namespace, file);
        }
      });
    });
  }
  
  private async loadFile(namespace: string, file: string) {
    const imports = await import(file.toString());

    // get name to reference
    const re = new RegExp(`/${namespace}/([^\.]+)\.js$`);
    const match = file.match(re);
    const name = match ? match[1] : '';

    // get base to reference
    const bases = name.split('/');
    bases.pop();
    const base = bases.join('/');

    // get app to check if need set app in the methods any, under and route
    const app = imports['app'];

    // check if exist method 'any', if is true load the method
    const any = imports['any'];
    if (any !== undefined) {
      let run;
      
      if (app)
        run = await any(this.app, this.router, this.routes[base]);
      else
        run = await any(this.router, this.routes[base]);

      if (run !== undefined)
      this.routes[name] = run;
    }    

    // check if exist method 'under', if is true load the method
    const under = imports['under'];
    if (under !== undefined) {
      let run;
      
      if (app)
        run = await under(this.app, this.router, this.routes[base]);
      else
        run = await under(this.router, this.routes[base]);

      if (run !== undefined)
      this.routes[name] = run;
    }

    // check if exist method 'route', if is true load the method
    const route = imports['route'];
    if (route !== undefined) {
      if (this.routes[base]) {
        if (app)
          await route(this.app, this.router, this.routes[base], this.routes[name]);     
        else
          await route(this.router, this.routes[base], this.routes[name]);     
      } else { 
        if (app)
          await route(this.app, this.router, this.routes[name]);  
        else
          await route(this.router, this.routes[name]);  
      }
    }
  }
}