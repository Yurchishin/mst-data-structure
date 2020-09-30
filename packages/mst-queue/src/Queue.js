import { types } from 'mobx-state-tree';
import LinkedList from '@mst/mst-linked-list';

const Queue = (name = '', Type, options = {}) => {
    const QueueModel = types
        .model(`${name}Queue`, {
            linkedList: LinkedList(`${name}Queue`, Type, options),
        })
        .views(self => ({
            get values() {
                return self.linkedList.values
            },
            get entries() {
                return self.linkedList.entries
            },
            get array() {
                return self.linkedList.array
            },
            get isEmpty() {
                return self.linkedList.isEmpty
            },
            toString(callback) {
                return self.linkedList.toString(callback)
            },
            get peek() {
                return !self.isEmpty ? self.linkedList.head : null
            },
            get peekPair() {
                return self.peek ? [self.peek.id, self.peek.value] : null
            },
            get peekValue() {
                return self.peekPair ? self.peekPair[1] : null
            },
            get peekId() {
                return self.peekPair ? self.peekPair[0] : null
            },
        }))
        .actions(self =>  {
            const enqueue = (id, value) => {
                self.linkedList.append(id, value);
                return self
            }

            const dequeue = () => {
                self.linkedList.deleteHead();
                return self
            }

            return {
                enqueue,
                dequeue,
            }
        })

    return types.optional(QueueModel, {})
}

export default Queue;