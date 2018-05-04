[![NPM version](https://img.shields.io/npm/v/@webacad/ng-codemirror.svg?style=flat-square)](https://www.npmjs.com/package/@webacad/ng-codemirror)
[![Build Status](https://img.shields.io/travis/Web-ACAD/ng-codemirror.svg?style=flat-square)](https://travis-ci.org/Web-ACAD/ng-codemirror)

# WebACAD/CodeMirror

CodeMirror form component for angular.

## Installation

```bash
$ npm install --save @angular/common@^5.0
$ npm install --save @angular/core@^5.0
$ npm install --save @angular/forms@^5.0
$ npm install --save codemirror
$ npm install --save rxjs
$ npm install --save @webacad/ng-codemirror
```

or with yarn

```bash
$ yarn add @angular/common@^5.0
$ yarn add @angular/core@^5.0
$ yarn add @angular/forms@^5.0
$ yarn add codemirror
$ yarn add rxjs
$ yarn add @webacad/ng-codemirror
```

## Register module

**app.module.ts:**

```typescript
import {CodemirrorModule} from '@webacad/ng-codemirror';

@NgModule({
	imports: [
		CodemirrorModule,
	],
})
export class AppModule {}
```

## Usage

```html
<wa-codemirror mode="javascript"></wa-codemirror>
```

**Available options:**

* `mode`: codemirror `mode` option
* `theme`: codemirror `theme` option
* `lineNumbers`: codemirror `lineNumbers` option
* `viewportMargin`: codemirror `viewportMargin` option

## Using in angular forms

This package implements all the necessary code for angular forms. That means that you can use it just like any other 
ordinary form control.

## App-wide configuration

The component itself provides only a few options for codemirror. If you need to have more control over the codemirror 
or if you want to configure it globally, use the `WA_CODEMIRROR_DEFAULTS` injection token:

```typescript
import * as CodeMirror from 'codemirror';

export const AppCodeMirrorConfiguration: CodeMirror.EditorConfiguration = {
	lineNumbers: true,
	theme: 'material',
};
```

and register it in your app module:

```typescript
import {CodemirrorModule, WA_CODEMIRROR_DEFAULTS} from '@webacad/ng-codemirror';
import {AppCodeMirrorConfiguration} from './codemirror-configuration';

@NgModule({
	imports: [
		CodemirrorModule,
	],
	providers: [
		{
			provide: WA_CODEMIRROR_DEFAULTS,
			useValue: CodeMirrorConfiguration,
		},
	],
})
export class AppModule {}
```
