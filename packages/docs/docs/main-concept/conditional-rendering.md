---
sidebar_position: 16
---

# Conditional rendering

Conditional rendering is used to conditionally render an element to the dom.
It uses the `v:if` directive which removes an element from the dom if the value is a falsy and append the element if otherwise.

## Syntax

The syntax of conditional rendering directive is `v:if={<boolean>}`.

## Using conditional rendering

Here's an example on how to use conditional rendering.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {
    toggle = true;

    render() {
        return <h1 v:if={this.toggle}>Hello World!</h1>
    }
}
```