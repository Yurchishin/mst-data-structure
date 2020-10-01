## `mst-queue`

### Usage

```js
import { types } from "mobx-state-tree";
import { Queue, QueueNode } from '@mst-ds/mst-queue';

const Todo = types.model('Todo', {
    name: types.string,
    active: types.boolean,
})

const TodoNode = QueueNode('Todo', Todo);

const rootStore = types.model('RootStore', {
    todos: Queue('Todo', TodoNode),
}).create()

rootStore.todos.enqueue('1', {
    name: 'name1',
    active: false,
}) // '1'
rootStore.todos.head // '1'
rootStore.todos.tail // '1'

rootStore.todos.enqueue('2', {
    name: 'name2',
    active: true,
}) // '1,2'
rootStore.todos.head // '1'
rootStore.todos.tail // '2'

rootStore.todos.dequeue() // '2'
rootStore.todos.head // '2'
```

### API

##### Props (LinkedList)
##### `.head`
##### `.tail`
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
##### `.enqueue(key, value)`
##### `.dequeue()`

##### Note: 
Library does not support `types.reference` types in node.
