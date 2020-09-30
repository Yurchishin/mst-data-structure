import { types } from "mobx-state-tree";

export const maybeNullReference = (subType, options = {}) => {
    const refType = types.reference(subType, options);

    return types.maybeNull(refType);
};

const LinkedListNode = (name, Type, options= {}) => {
    const { identifierNumber = false } = options;

    const NodeType = types
        .model(`${name}LinkedListNode`, {
            id: identifierNumber ? types.identifierNumber : types.identifier,
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