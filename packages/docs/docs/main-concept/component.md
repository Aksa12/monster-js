---
sidebar_position: 1
---

# Component

Components are the most basic building block of an application.
It is composed of template, logic and styles.
It is used to split the UI into small and reusable pieces of codes.

:::note
Component file must have an extension of `.tsx` instead of `.ts`.
:::

## Logic and template

The logic and template are combined in a single file.
It is a typescript class that has a `@Component` decorator and a `render()` method that returns a jsx element.
Since a component has jsx elements inside it, it should have an extension of `.tsx` instead of `.ts`.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    render() {
        return <h1>Hello World!</h1>
    }
}
```

The parameter of `@Component` will be the web component selector.
In the example above the selector is `app-greeting` which means our component must be `<app-greeting />` when we render it to the view.

:::caution
Selector must be all lowercase or it might throw an error if there are uppercase characters.
:::

## Styles

MonsterJS uses `sass` by default but we can also use other css frameworks depending on our webpack configuration.
This styles will only affect it's component and will have no effect on it's parent and child components.

Component styles is imported directly to the `.component.tsx` file.

Example.
```typescript
import './greeting.component.scss';
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    render() {
        return <h1>Hello World!</h1>
    }
}
```

:::note
In order for the component styles to work properly,
the component and styles must have the same filename with `.component.tsx` extension for the component and `.component.scss` extension for the styles.
:::

Example.

```
greeting
    ├── greeting.component.tsx
    └── greeting.component.scss
```

## Shadow dom component

To encapsulate our component we can attach a shadow dom to it.
To do this, we can use the `@ShadowComponent` decorator instead of `@Component`.
The @ShadowComponent decorator has two parameters.
First is the component selector, and second is the shadow mode(`open` or `closed`) which is optional and the default is `open`,

Example.

```typescript
import './greeting.component.scss';
import { ShadowComponent } from '@monster-js/core';

@ShadowComponent('app-greeting', 'closed')
export class Greeting {
    render() {
        return <h1>Hello World!</h1>
    }
}
```

## Web component slot

With shadow dom, we can display elements from parent to child component's view using slots.

Example.

#### Parent component
```typescript
import { Component } from '@monster-js/core';

@Component('app-parent')
export class Parent {
    render() {
        return <div>
            <app-child>
                <h1>I am a slot content</h1>
                <span>I am a slot content</span>
            </app-child>
        </div>
    }
}
```

All elements inside the `<app-child></app-child>` tag will be displayed in the child component slot.

#### Child component
```typescript
import { ShadowComponent } from '@monster-js/core';

@ShadowComponent('app-child', 'closed')
export class Child {
    render() {
        return <div>
            <slot></slot>
        </div>
    }
}
```

### Named slot

Named slots allows us to choose where we want to display the elements inside the child component's view.
A component can have multiple named slots.

Example.

#### Parent component
```typescript
import { Component } from '@monster-js/core';

@Component('app-parent')
export class Parent {
    render() {
        return <div>
            <app-child>
                <h1 slot="slot-1">I am a slot content</h1>
                <span slot="slot-2">I am a slot content</span>
            </app-child>
        </div>
    }
}
```

#### Child component
```typescript
import { ShadowComponent } from '@monster-js/core';

@ShadowComponent('app-child', 'closed')
export class Child {
    render() {
        return <div>
            <slot name="slot-1"></slot>
            <div>
                <slot name="slot-2"></slot>
            </div>
        </div>
    }
}
```

In the example above, the element `<h1 slot="slot-1">I am a slot content</h1>` from parent component will be display in `<slot name="slot-1"></slot>` in child component.
The same for the `<span slot="slot-2">I am a slot content</span>` will be displayed in `<slot name="slot-2"></slot>`.

:::note
Slots only works when using shadow dom.
:::

## Custom element component

Custom element allows us to define a new type of elements.
To create a custom element, we need decorate our component with `@CustomElement` decorator.
This decorator has two parameter, first is the type of custom element constructor and second is what type of element it will extend.

Example.

```typescript
import './greeting.component.scss';
import { Component, CustomElement } from '@monster-js/core';

@CustomElement(HTMLButtonElement, 'button')
@Component('app-custom-button')
export class CustomButton {
    render() {
        return <span>I am a button!</span>
    }
}
```

In the example above, we created a custom element using `@CustomElement(HTMLButtonElement, 'button')`.
That means we need to attach the component in a `<button></button>` element like the following.

```typescript
<button is="app-custom-button"></button>
```

## Define component

Component must be defined before we can use it.
Since MonsterJS components are web components, we can use the `customElement.define` as long as we have the MonsterJS polyfill referenced in `src/index.html`.
Please check [polyfill](/docs/useful-topics/polyfill) for more information about the MonsterJS polyfill.

Example.
```javascript
// index.ts
import { Greeting } from './greeting.component';

customElement.define('app-greeting', Greeting);
```
We can also use the selector defined in the `@Component` decorator.
```javascript
// index.ts
import { getSelector } from '@monster-js/core';
import { Greeting } from './greeting.component';

customElement.define(getSelector(Greeting), Greeting);
```

or we can use the `defineComponent` function provided by the core module.

```javascript
// index.ts
import { defineComponent } from '@monster-js/core';
import { Greeting } from './greeting.component';

defineComponent(Greeting);
```

## Define custom element component

Custom element components can also be defined using `customElement.define`.

Example.

```typescript
import { getSelector } from '@monster-js/core';
import { CustomButton } from './custom-button.component';

customElement.define(getSelector(CustomButton), CustomButton, {
    extends: 'button'
});
```

or

```typescript
import { defineComponent } from '@monster-js/core';
import { CustomButton } from './custom-button.component';

defineComponent(CustomButton);
```

on register it in a module


```typescript
import { CustomButton } from './custom-button.component';

@Module({
    components: [CustomButton]
})
export class AppModule {}
```

## Global components

Components can be registered as a global component.
Global components can be used in any components inside our application.

Example.

```typescript
import { GlobalComponents } from '@monster-js/core';
import { Greeting } from './greeting.component';

const gc = new GlobalComponents();
gc.add('app-greeting');
customElement.define(getSelector(Greeting), Greeting);
```

Global components needs to be registered as global components first before we define the component using `customElements.define` to avoid issues.

### Using globalComponent function

We can also use the `globalComponent` function that will do the same thing from the example above.

Example.

```typescript
import { globalComponent } from '@monster-js/core';
import { Greeting } from './greeting.component';

globalComponent(Greeting);
```

## Register component to a module

For the component to be available for other components in a module, we need to register the component to the module.
Registered component does not need to be defined using `customElement.define`.

To register the component, we just need to pass the component to the components array in a module.

Example.

```typescript
import { Module } from '@monster-js/core/module';
import { Greeting } from './greeting.component';

@Module({
    components: [Greeting]
})
export class AppModule { }
```

:::note
Components must be registered to one module only.
:::

Components must be registered to one module only.
If we want to use the component inside other module, we just need to export the component from it's module and import it's module to the one that needs the component.
Please see [Module](./module#register-components) for more information about exporting a component from it's module.

## Render a component into view

To render a component into view, we just need to call it's selector inside the template.

Example.

```typescript
<div>
    <app-greeting></app-greeting>
</div>
```
or
```typescript
<div>
    <app-greeting />
</div>
```

In the example above, the greeting component will be rendered in the view inside the `<app-greeting />` element as a web component as long as the greeting component is defined in a module or using the `customElement.define` function.

## Other web components

Web components that are not made using MonsterJS will also work inside a MonsterJS project.
We just need to register the web component's selector as a global component using `GlobalComponents` class found in the core package.

Example.

```typescript
// src/index.ts
import { GlobalComponents } from '@monster-js/core';

const gc = new GlobalComponents();
gc.add('external-web-component');
gc.add('another-external-web-component');
```

It is recommended that we register the external components inside `src/index.ts` file.

## Component directives

To use directives inside a component we need to register the directives to the component using `@Directives` decorator.
After we register the directive, we can now use it inside the component's template.

Please see [Directives](./directives) for more information about directives.

Example.

```typescript
import { Component, Directives } from '@monster-js/core';
import { HighlightDirective } from './highlight.directive';

@Directives(HighlightDirective)
@Component('app-greeting')
export class Greeting {
    render() {
        return <h1 highlight:color="red">Hello World!</h1>
    }
}
```

Directives can also be registered in a module so that it will be available to all the components registered in the module.

Please see [Module](./module#register-directives) for more information about registering directives into a module.

## Component pipes

To use pipes inside a component we need to register the pipes to the component using `@Pipes` decorator.
After we register the pipe, we can now use it inside the component's logic and template.

Please see [Pipes](./pipes) for more information about pipes.

Example.

```typescript
import { Component, Pipes } from '@monster-js/core';
import { UppercasePipe } from './uppercase.pipe';

@Pipes(UppercasePipe)
@Component('app-greeting')
export class Greeting {

    greeting = 'Hello World!';

    render() {
        return <h1>{this.greeting | uppercase}</h1>
    }
}
```

To use the pipe inside the component's logic we can inject pipe into our component's constructor.

Example.

```typescript
import { Component, Pipes } from '@monster-js/core';
import { UppercasePipe } from './uppercase.pipe';

@Pipes(UppercasePipe)
@Component('app-greeting')
export class Greeting {

    greeting = 'Hello World!';

    constructor(private uppercasePipe: UppercasePipe) {}

    uppercaseText(text: string) {
        return this.uppercasePipe.transform(text);
    }

    render() {
        return <h1>{this.uppercaseText(this.greeting)}</h1>
    }
}
```

Pipes can also be registered in a module so that it will be available to all the components registered in the module.

Please see [Module](/docs/main-concept/module) for more information about registering pipes into a module.

:::caution
Template pipes may throw a typescript type checking error since the pipe operator is originally an arithmetic operator that accepts any, number and bigint values.
A temporary fix for this is to set our values to type any.
This error will be addressed in later releases.
:::

## Component services

To use services inside a component we need to register the services to the component using `@Services` decorator.
After we register the service, we can now use it inside the component's logic and view.

Please see [Services](./services) for more information about services.

Example.

```typescript
import { Component, Services } from '@monster-js/core';
import { GreetingService } from './greeting.service';

@Services(GreetingService)
@Component('app-greeting')
export class Greeting {

    constructor(private greetingService: GreetingService) { }

    render() {
        return <h1>{this.greetingService.getMessage()}</h1>
    }
}
```

Services can also be registered in a module so that it will be available to all the components registered in the module.

Please see [Module](/docs/main-concept/module) for more information about registering services into a module.