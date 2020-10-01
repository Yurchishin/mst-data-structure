import { types } from 'mobx-state-tree';
import { values } from 'mobx';

export const optionalMap = (Type, optionalValues) => types.optional(types.map(Type), {}, optionalValues)
export const optionalNull = (Type, optionalValues) => types.optional(types.maybeNull(Type), null, optionalValues)

const Queue = (name = '', NodeType) => {
    const QueueModel = types
        .model(`${name}Queue`, {
            head: optionalNull(types.reference(NodeType)),
            tail: optionalNull(types.reference(NodeType)),
            nodes: optionalMap(NodeType),
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
            get peek() {
                return !self.isEmpty ? self.head.value : null
            },
            get peekNode() {
                return !self.isEmpty ? self.head : null
            },
            get peekPair() {
                return self.peekNode ? [self.peekNode.id, self.peekNode.value] : null
            },
            toString(callback) {
                return self.array.map(node => node.toString(callback)).toString();
            },
        }))
        .actions(self =>  {
            const enqueue = (id, value) => {
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
            }

            const dequeue = () => {
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

            return {
                enqueue,
                dequeue,
            }
        })

    return types.optional(QueueModel, {})
}

export default Queue;