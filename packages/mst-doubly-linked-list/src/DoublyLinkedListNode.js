import { types, isReferenceType } from 'mobx-state-tree';

export const maybeNullReference = (subType, options = {}) => types.maybeNull(types.reference(subType, options))

const DoublyLinkedListNode = (name, Type) => {
    if(isReferenceType(Type)) {
        throw new Error('"mst-doubly-linked-list" does not support reference types')
    }

    const NodeType = types
        .model(`${name}DoublyLinkedListNode`, {
            id: types.identifier,
            value: Type,
            next: maybeNullReference(types.late(() => NodeType)),
            previous: maybeNullReference(types.late(() => NodeType)),
        })
        .views(self => ({
            toString(callback) {
                return callback ? callback(self.value) : `${self.value}`;
            },
        }))
        .actions(self => {
            const setNext = nextNode => {
                self.next = nextNode;
            };

            const setPrevious = nextNode => {
                self.previous = nextNode;
            };

            return {
                setNext,
                setPrevious,
            };
        });

    return NodeType
}

export default DoublyLinkedListNode