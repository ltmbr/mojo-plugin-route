import type {MojoApp} from '@mojojs/core';
import {existsSync, lstatSync} from 'node:fs';
import globSync from 'glob';

export default function routePlugin(app: MojoApp, options: {namespace?: string} = {}) {
  new Route(app, options);
}

class Route {
  private routes: any;

  constructor(app: MojoApp, options: {namespace?: string} = {}) {
    this.routes = {};

    const namespace = options.namespace ?? 'route';
    const pathRoutes = app.home + '/' + namespace; 
    
    if (!existsSync(pathRoutes)) 
      throw Error(`Routes path (${pathRoutes}) does not exist!`); 
      
    this.files(app, namespace, pathRoutes);
  }

  private async files(app: MojoApp, namespace: string, pathRoutes: string) {
    globSync(pathRoutes + '/**/*.js', {mark: true}, (er, files) => {
      files.forEach(file => {
        if (lstatSync(file.toString()).isFile()) {
          this.loadFile(app, namespace, file);
        }
      });
    });    
  }
  
  private async loadFile(app: MojoApp, namespace: string, file: string) {
    const imports = await import(file.toString());

    const re = new RegExp(`/${namespace}/([^\.]+)\.(?:ts|js|mjs)$`);
    const match = file.match(re);
    const name = match ? match[1] : '';

    const under = imports['under'];
    if (under !== undefined) {
      let run = await under(app);

      if (run !== undefined)
        this.routes[name] = run;
    }

    const route = imports['route'];
    if (route !== undefined) {
      if (match && this.routes[match[1]]) {
        route(app, this.routes[match[1]], this.routes[name] ?? undefined);     
      } else { 
        route(app, this.routes[name] ?? undefined);    
      }
    }    
  }
}