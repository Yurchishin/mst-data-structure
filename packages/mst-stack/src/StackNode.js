import {isReferenceType, types} from "mobx-state-tree";

export const maybeNullReference = (subType, options = {}) => types.maybeNull(types.reference(subType, options))

const StackNode = (name, Type) => {
    if (isReferenceType(Type)) {
        throw new Error('"mst-stack" does not support reference types')
    }

    const NodeType = types
        .model(`${name}StackNode`, {
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

export default StackNode