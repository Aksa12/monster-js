---
sidebar_position: 4
---

# Data binding

Data binding is a way to synchronize the data of logic and view.
This means that when a value is changed in logic, view gets updated, and when the user change some data in the view, variables in logic will be updated.

## Attribute binding

Here is an example on how to bind a property from the logic into an attribute:

```typescript
import { Component } from '@monster-js/core';

@Component('app-root')
export class App {

    id: number = 0;

    constructor() {
        setInterval(() => this.id++, 1000);
    }

    render() {
        return <h1 id={this.id}>App component.</h1>
    }
}
```

In the example above, the id of h1 element will increment every second.
This is an example of one way binding.

## Text binding

Here is an example on how to bind a component property to view:

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    counter: number = 0;

    constructor() {
        setInterval(() => this.counter++, 1000);
    }

    render() {
        return <h1>{this.number}</h1>
    }
}
```

In the example above, the counter will increment every second and display the changes as a text in view.
This is another example of one way binding.

## Model binding

Model binding is a two way binding of data.
It uses the `v:model` directive.
Every time the model is changed from the view, the value in logic will be updated and the same thing will happen in the view when the model is updated from the logic.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-root')
export class App {

    greeting: string = 'Hello world!';

    render() {
        return <div>
            <h1>{this.greeting}</h1>
            <input v:model={this.greeting} type="text" />
        </div>
    }
}
```

This is an example of two way binding.