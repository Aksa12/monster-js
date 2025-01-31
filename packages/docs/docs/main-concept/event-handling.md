---
sidebar_position: 6
---

# Event handling

Event handling is a directive lets the component to respond to user action on the UI like button clicks, text inputs, drag elements and other actions.
It uses a directive with namespace of `on` to bind the component methods to an element as an event listener.

## Syntax

The syntax of event handling directive is `on:<event_name>={<component_method>}`.
The component_method must be a function and not a function call expression.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    clickMe() {
        console.log('Hello World!');
    }

    render() {
        return <button on:click={this.clickMe}>Greet</button>
    }
}
```

## Method parameters

Since event handling directive accepts a function as directive value.
We need to pass an unnamed function or fat arrow function and return the call expression of the component method in order for us to be able to pass some parameters to it.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    clickMe(name: string) {
        console.log(`Hello ${name}!`);
    }

    render() {
        return <button on:click={() => this.clickMe('Johnny')}>Greet</button>
    }
}
```

## Event variable

We can also get the event variable that holds the data of the event.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    clickMe(event) {
        console.log(event);
    }

    render() {
        return <button on:click={(event) => this.clickMe(event)}>Greet</button>
    }
}
```

or just simply

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    clickMe(event) {
        console.log(event);
    }

    render() {
        return <button on:click={this.clickMe}>Greet</button>
    }
}
```