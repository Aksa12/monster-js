---
sidebar_position: 15
---

# List rendering

List rendering directive allows developers to render a list of element based on the given array of data.

## Syntax

The syntax of list rendering directive is `v:for={<array>}`.

## Using list rendering

Here's an example on how to use list rendering.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {

    array = [1, 2, 3];

    render() {
        return <p v:for={this.array}>Hello World!</p>
    }
}
```

The example code above will generate a list of elements that looks like the following:

```html
<p>Hello World!</p>
<p>Hello World!</p>
<p>Hello World!</p>
```

Three `<p>` tags since there are three elements inside `this.array`.

## List item name

`v:for-item="<item name>"`

It allows developers to set the variable name of the list item and display it in view.
If no list item directive is provided, it is `$item` by default.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {

    array = ['foo', 'bar', 'bazz'];

    render() {
        return <p v:for={this.array} v:for-item="listItem">Hello {listItem}!</p>
    }
}
```

:::note
The codes above might throw a typescript linter error `Cannot find name 'listItem'` since `listItem` is not defined.
A temporary fix for this is to declare the list item above our component and below the import statements list the following.

```typescript
declare const listItem: string;
```
:::

The example code above will generate a list of elements that looks like the following:

```html
<p>Hello foo!</p>
<p>Hello bar!</p>
<p>Hello bazz!</p>
```

## List index

`v:for-index="<index name>"`

It allows developers to set the variable name of the list item index.
If no list index directive is provided, it is `$index` by default.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {

    array = ['foo', 'bar', 'bazz'];

    render() {
        return <p v:for={this.array} v:for-index="listIndex">Hello {listIndex}!</p>
    }
}
```

:::note
The codes above might throw a typescript linter error `Cannot find name 'listIndex'` since `listIndex` is not defined.
A temporary fix for this is to declare the list item above our component and below the import statements list the following.

```typescript
declare const listIndex: number;
```
:::

The example code above will generate a list of elements that looks like the following:

```html
<p>Hello 0!</p>
<p>Hello 1!</p>
<p>Hello 2!</p>
```

## Update event

`v:for-update={<callback function>}`

List rendering is able to trigger an event if there is a change in the length of the array.

Example.

```typescript
import { Component } from '@monster-js/core';

@Component('app-greeting')
export class Greeting {

    array = [1, 2, 3];

    arrayLengthUpdated() {
        console.log('array length is updated');
    }

    render() {
        return <p v:for={this.array} v:for-update={this.arrayLengthUpdated}>Hello World!</p>
    }
}
```
