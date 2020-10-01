import {types, isReferenceType} from "mobx-state-tree";

export const maybeNullReference = (subType, options = {}) => types.maybeNull(types.reference(subType, options))

const LinkedListNode = (name, Type) => {
    if (isReferenceType(Type)) {
        throw new Error('"mst-linked-list" does not support reference types')
    }

    const NodeType = types
        .model(`${name}LinkedListNode`, {
            id: types.identifier,
            value: Type,
            next: maybeNullReference(types.late(() => NodeType)),
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

            return {
                setNext,
            };
        });

    return NodeType
}

export default LinkedListNode