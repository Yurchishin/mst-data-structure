import { types } from 'mobx-state-tree';
import { values } from 'mobx';

export const optionalMap = (Type, optionalValues) => types.optional(types.map(Type), {}, optionalValues)
export const optionalNull = (Type, optionalValues) => types.optional(types.maybeNull(Type), null, optionalValues)

const DoublyLinkedList = (name = '', Node) => {
    const DoublyLinkedListModel =  types
        .model(`${name}DoublyLinkedList`, {
            head: optionalNull(types.reference(Node)),
            tail: optionalNull(types.reference(Node)),
            nodes: optionalMap(Node),
        })
        .views(self => ({
            getNode(id) {
                return self.nodes.get(id) || null;
            },
            get(id) {
                return self.nodes.get(id).value || null;
            },
            has(id) {
                return self.nodes.has(id);
            },
            get values() {
                return values(self.nodes)
            },
            get entries() {
                return self.values.map(node => [node.id, node.value]);
            },
            get array() {
                return self.values.map(node => node.value);
            },
            get isEmpty() {
              return self.nodes.size === 0
            },
            toString(callback) {
                return self.array.map(node => node.toString(callback)).toString();
            },
        }))
        .actions(self => {
            const prepend = (id, value) => {
                self.nodes.set(id, {
                    id,
                    value,
                    next: self.head,
                    previous: null,
                });

                if (self.head) {
                    self.head.setPrevious(id);
                }
                self.head = id;

                if (!self.tail) {
                    self.tail = id;
                }

                return self;
            };

            const append = (id, value) => {
                self.nodes.set(id, {
                    id,
                    value,
                    next: null,
                    previous: null,
                });

                if (!self.head) {
                    self.head = id;
                    self.tail = id;

                    return self;
                }

                self.tail.setNext(id);
                self.nodes.get(id).setPrevious(self.tail.id);

                self.tail = id;

                return self;
            };

            const remove = id => {
                const deletedNode = self.nodes.get(id);

                if (!deletedNode) return self;
                if (!self.head) return self;

                if (self.head === deletedNode) {
                    if (self.head === self.tail) {
                        self.head = null;
                        self.tail = null;
                    } else {
                        self.head = self.head.next;
                        self.head.setPrevious(null);
                    }
                } else {
                    if (deletedNode.next) {
                        deletedNode.previous.setNext(deletedNode.next.id)
                        deletedNode.next.setPrevious(deletedNode.previous.id)
                    }
                    else {
                        self.tail = self.tail.previous;
                        self.tail.setNext(null);
                    }
                }

                self.nodes.delete(id);

                return self;
            };

            const fromArray = values => {
                values.forEach(([id, value]) => self.append(id, value));

                return self;
            };

            const deleteTail = () => {
                if (!self.head) return self;
                const id = self.tail.id

                if (self.head === self.tail) {
                    self.head = null;
                    self.tail = null;

                    self.nodes.delete(id);

                    return self;
                }

                self.tail = self.tail.previous;
                self.tail.setNext(null);

                self.nodes.delete(id);

                return self
            }

            const deleteHead = () => {
                if (!self.head) return self

                const id = self.head.id

                if (self.head.next) {
                    self.head = self.head.next;
                    self.head.setPrevious(null);
                } else {
                    self.head = null;
                    self.tail = null;
                }

                self.nodes.delete(id);

                return self;
            }

            const reverse = () => {
                let currNode = self.head;
                let prevNode = null;
                let nextNode = null;

                while (currNode) {
                    nextNode = currNode.next;
                    prevNode = currNode.previous;

                    currNode.setNext(prevNode);
                    currNode.setPrevious(nextNode);

                    prevNode = currNode;
                    currNode = nextNode;
                }

                // Reset head and tail.
                self.tail = self.head;
                self.head = prevNode;

                return self;
            }

            return {
                prepend,
                append,
                remove,
                fromArray,
                deleteHead,
                deleteTail,
                reverse,
            };
        });

    return types.optional(DoublyLinkedListModel, {})
};

export default DoublyLinkedList;
