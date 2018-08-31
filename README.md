On branch 'master' - the styled version


On branch 'stripped' - the unstyled version



Switch between branches:

git checkout stripped       < --- >       git checkout master



BONUS EXERCISE:  how would you change the font-family used in the `<app-table-renderer>` component?  

HINT: ng-deep somewhere higher up in the hierarchy


------------------------------------------------------------------------

ORIGINAL ReadMe - not interesting for the SCSS exercise


# ShowCase for a wrapper component applying smart fadeInOut to its projected content.

Applying fadeInOut animations can produce undesired rendering effects during fade out, if the animated component renders content bound to its input properties.

During fade out, upon component destruction, the to-be-rendered content may be already "gone", resulting in an undesired look of the component while it disappears.

Use case:
A component is displayed with *ngIf='condition' : 

`<my-list [content]='content' *ngIf='content.length > 0'></my-list>`

It's task is to render the content in a nice layout.

Usually you would apply an animation like this:

`<my-list [@fadeInOut]='fadeDisplayState' 
          [content]='content' *ngIf='content.length > 0'></my-list>`

There is a fade out transition coupled to the destruction of the component (when 'condition' evaluates to false).
Something like:

```
transition(':leave', [
    animate(500, style({opacity: 0}))
])
```

When 'condition' becomes false, `<my-list>` is not needed anymore. Then it's likely that 'content' has also changed value. It may even be null now. These changes already show in the component before the fade out begins. So, during fade-out we'll see a list without content. Not cool.

This app showcases a smart component wrapper that handles fade-In-Out logic such that fade in and out looks cool. There is no more animation attached to the initial component, but only to the wrapper.

The wrapper comes in two flavors, depending on how flexible you want to be in development.
`<fade-wrapper>`  is all-in-one. The component handles display logic and rendering logic.
`<fade-wrapper-2>`  is a component with a custom directive. Here, the tricky rendering logic is seperated into the directive and can be reused and maintained more easily.

# How to use the 2-in-1

The `*ngIf='condition'` becomes `[shouldDisplay]='condition'`

```
<fade-wrapper [shouldDisplay]='contents.length > 0'>
  // <my-list> or whatever
</fade-wrapper>
```

When the displayCondition becomes false, `<my-list>` is hidden, and then it's removed from the DOM.
You may wanna keep it in the DOM. 
Then use `<fade-wrapper [shoudDisplay]='...' [keepInDom]='true'></fade-wrapper>`

# How to use the directive-based solution

```
<fade-wrapper-2 [fadeShouldDisplay]='contents.length > 0'>
  // <my-list> or whatever
</fade-wrapper-2>
```
`[keepInDom]='true'` is used just as on the 2-in-1.


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
