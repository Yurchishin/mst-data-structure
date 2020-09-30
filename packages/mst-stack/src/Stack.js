import { types, isReferenceType } from 'mobx-state-tree';
import LinkedList from '@mst/mst-linked-list';

const Stack = (name = '', Type, options = {}) => {
    if (isReferenceType(Type)) {
        throw new Error('"mst-stack" does not support reference types')
    }

    const StackModel = types
        .model(`${name}Stack`, {
            linkedList: LinkedList(`${name}Stack`, Type, options),
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
            const push = (id, value) => {
                self.linkedList.prepend(id, value);
                return self
            }

            const pop = () => {
                self.linkedList.deleteHead();
                return self
            }

            return {
                push,
                pop,
            }
        })

    return types.optional(StackModel, {})
}

export default Stack;