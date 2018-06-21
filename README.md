# Demo for a wrapper component that applies smart fadeInOut animation with given content.

Usually, applying fadeInOut animations on entire components may produce undesired rendering effects during fade out.

The content of a given component may be already killed while the component is fading out, due to the input property changes that triggered the fade out.

Use case:
A component is displayed with *ngIf='condition' : 

`<my-list [content]='content' *ngIf='content.length > 0'></my-list>`

It's task is to render the content in a nice layout.

Usually you would apply an animation like this:

`<my-list [@fadeInOut]='trigger' [content]='content' *ngIf='content.length > 0'></my-list>`

The fade out transition is coupled with the destruction of the component (when 'condition' evaluates to false).
Something like:

```
transition(':leave', [
    animate(500, style({opacity: 0}))
])
```

When 'condition' changes from true to false, the renderer is not needed anymore. Then it's likely that content has also changed. It may even be null now. These changes reflect in the component even before the fade out begins, which you don't want to happen.

This app showcases a smart component wrapper that handles fade-In-Out logic such that fade in and out looks cool. There is no more animation attached to the initial component, but only to the wrapper.

# How to use

The `*ngIf='condition'` becomes `[displayCondition]='condition'`

```
<fade-wrapper [displayCondition]='contents.length > 0'>
  <my-list [contents]='contents'></my-list>
</fade-wrapper>
```

When the displayCondition becomes false, `<my-list>` is hidden, and then it's removed from the DOM.
You may wanna keep it in the DOM. 
Then use `<fade-wrapper [displayCondition]='...' [keepAlive]='true'></fade-wrapper>`

# ComponentizeApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
