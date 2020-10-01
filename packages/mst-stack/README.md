## `mst-stack`

### Usage

```js
import { types } from "mobx-state-tree";
import { Stack, StackNode } from '@mst-ds/mst-stack';

const Todo = types.model('Todo', {
    name: types.string,
    active: types.boolean,
})

const TodoNode = StackNode('Todo', Todo);

const rootStore = types.model('RootStore', {
    todos: Stack('Todo', TodoNode),
}).create()

rootStore.todos.push('2', {
    name: 'name1',
    active: false,
}) // '2'
rootStore.todos.head // '2'

rootStore.todos.push('1', {
    name: 'name2',
    active: true,
}) // '1,2'
rootStore.todos.head // '1'

rootStore.todos.pop() // '2'
rootStore.todos.head // '2'
```

### API

##### Props (LinkedList)
##### `.head`
##### `.nodes`

##### Props (LinkedListNode)
##### `.id`
##### `.value`
##### `.next`

##### Views:
##### `.getNode(id)`
##### `.get(id)`
##### `.has(id)`
##### `.values`
##### `.entries`
##### `.array`
##### `.isEmpty`
##### `.peek`
##### `.peekNode`
##### `.peekPair`
##### `.toString(callback)`

##### Actions:
##### `.push(key, value)`
##### `.pop()`

##### Note: 
Library does not support `types.reference` types in node.
