import { types } from 'mobx-state-tree';
import { values } from 'mobx';

export const optionalMap = (Type, optionalValues) => types.optional(types.map(Type), {}, optionalValues)
export const optionalNull = (Type, optionalValues) => types.optional(types.maybeNull(Type), null, optionalValues)

const LinkedList = (name = '', Node) => {
    const LinkedListModel =  types
        .model(`${name}LinkedList`, {
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
                if(!self.head) {
                    self.nodes.set(id, {
                        id,
                        value,
                        next: null,
                    });
                }
                else {
                    self.nodes.set(id, {
                        id,
                        value,
                        next: self.head.id,
                    });
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
                });

                if (!self.head) {
                    self.head = id;
                    self.tail = id;

                    return self;
                }

                self.tail.setNext(id);
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
                    }
                } else {
                    let currentNode = self.head;

                    if (currentNode) {
                        while (currentNode.next) {
                            if (currentNode.next === deletedNode) currentNode.setNext(currentNode.next.next);
                            else currentNode = currentNode.next;
                        }
                    }

                    if (self.tail === deletedNode) self.tail = currentNode;
                }

                self.nodes.delete(id);

                return self;
            };

            const fromArray = values => {
                values.forEach(([id, value]) => self.append(id, value));

                return self;
            };

            const deleteTail = () => {
                if(!self.head) return self;
                const id = self.tail.id

                if (self.head === self.tail) {
                    self.head = null;
                    self.tail = null;

                    self.nodes.delete(id);

                    return self;
                }

                // Rewind to the last node and delete "next" link for the node before the last one.
                let currentNode = self.head;
                while (currentNode.next) {
                    if (!currentNode.next.next) currentNode.setNext(null);
                    else currentNode = currentNode.next;
                }

                self.tail = currentNode;

                self.nodes.delete(id);

                return self;
            }

            const deleteHead = () => {
                if (!self.head) return self

                const id = self.head.id

                if (self.head.next) self.head = self.head.next;
                else {
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
                    currNode.setNext(prevNode);

                    prevNode = currNode;
                    currNode = nextNode;
                }

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

    return types.optional(LinkedListModel, {})
};

export default LinkedList;