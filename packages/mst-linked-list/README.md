## `mst-linked-list`

### Usage

```js
import { types } from "mobx-state-tree";
import { LinkedList, LinkedListNode } from '@mst-ds/mst-linked-list';

const Todo = types.model('Todo', {
    name: types.string,
    active: types.boolean,
})

const TodoNode = LinkedListNode('Todo', Todo);

const rootStore = types.model('RootStore', {
    todos: LinkedList('Todo', TodoNode),
}).create()

rootStore.todos.append('2', {
    name: 'name1',
    active: false,
}) // '2'
rootStore.todos.head // '2'
rootStore.todos.tail // '2'

rootStore.todos.prepend('1', {
    name: 'name2',
    active: true,
}) // '1,2'
rootStore.todos.head // '1'
rootStore.todos.tail // '2'

rootStore.todos.remove('1') // '1'
rootStore.todos.head // '2'
rootStore.todos.tail // '2'
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
##### `.toString(callback)`

##### Actions:
##### `.append(key, value)`
##### `.prepend(key, value)`
##### `.remove(key)`
##### `.fromArray([[key, value], ...])`
##### `.deleteHead()`
##### `.deleteHead()`
##### `.deleteTail()`
##### `.reverse()`

##### Note: 
Library does not support `types.reference` types in node.
