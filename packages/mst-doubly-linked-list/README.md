## `mst-doubly-linked-list`

### Usage

```js
import { types } from "mobx-state-tree";
import { DoublyLinkedList, DoublyLinkedListNode } from '@mst-ds/mst-doubly-linked-list';

const Todo = types.model('Todo', {
    name: types.string,
    active: types.boolean,
})

const TodoNode = DoublyLinkedListNode('Todo', Todo);

const rootStore = types.model('RootStore', {
    todos: DoublyLinkedList('Todo', TodoNode),
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

##### Props (DoublyLinkedList)
##### `.head`
##### `.tail`
##### `.nodes`

##### Props (DoublyLinkedListNode)
##### `.id`
##### `.value`
##### `.next`
##### `.previous`

##### Actions:
##### `.append(key, value)`
##### `.prepend(key, value)`
##### `.remove(key)`
##### `.fromArray([[key, value], ...])`
##### `.deleteHead()`
##### `.deleteHead()`
##### `.deleteTail()`
##### `.reverse()`

##### Views:
##### `.getNode(id)`
##### `.get(id)`
##### `.has(id)`
##### `.values`
##### `.entries`
##### `.array`
##### `.isEmpty`
##### `.toString(callback)`

##### Note: 
Library does not support `types.reference` types in node.
