import { types, isReferenceType } from "mobx-state-tree";

export const maybeNullReference = (subType, options = {}) => types.maybeNull(types.reference(subType, options))

const QueueNode = (name, Type) => {
    if (isReferenceType(Type)) {
        throw new Error('"mst-queue" does not support reference types')
    }

    const NodeType = types
        .model(`${name}QueueNode`, {
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

export default QueueNode