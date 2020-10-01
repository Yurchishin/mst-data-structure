import { types } from 'mobx-state-tree';
import { values } from 'mobx';

export const optionalMap = (Type, optionalValues) => types.optional(types.map(Type), {}, optionalValues)
export const optionalNull = (Type, optionalValues) => types.optional(types.maybeNull(Type), null, optionalValues)

const Stack = (name = '', NodeType) => {
    const StackModel = types
        .model(`${name}Stack`, {
            head: optionalNull(types.reference(NodeType)),
            nodes: optionalMap(NodeType),
        })
        .views(self => ({
            getNode(id) {
                return self.nodes.get(id) || null;
            },
            get(id) {
                return self.nodes.get(id).value || null;
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
            const push = (id, value) => {
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

                return self;
            }

            const pop = () => {
                if (!self.head) return self

                const id = self.head.id

                if (self.head.next) self.head = self.head.next;
                else {
                    self.head = null;
                }

                self.nodes.delete(id);

                return self;
            }

            return {
                push,
                pop,
            }
        })

    return types.optional(StackModel, {})
}

export default Stack;