import { types } from 'mobx-state-tree';
import { onSnapshotAggregation, createMSTSnapshot } from '@mst/mst-jest';
import LinkedList from '../src/index';

describe('LinkedList', () => {
    describe('model', () => {
        it('create(int)', () => {
            const list = LinkedList('Int', types.integer).create();

            createMSTSnapshot(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
        });
        it('create in model(int)', () => {
            const rootStore = types.model('RootStore', {
                numbers: LinkedList('Int', types.integer),
            }).create()

            createMSTSnapshot(rootStore)
        });
        it('create in model(Todo)', () => {
            const Todo = types.model('Todo', {
                name: types.string,
                active: types.boolean,
            })

            const rootStore = types.model('RootStore', {
                todos: LinkedList('Todo', Todo),
            }).create()

            rootStore.todos.append('1', {
                name: 'name1',
                active: false,
            })
            .append('2', {
                name: 'name2',
                active: true,
            })
            .append('3', {
                name: 'name2',
                active: false,
            })

            createMSTSnapshot(rootStore)
        });
    })
    describe('actions', () => {
        it('prepend', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();

            list.prepend('3', 3);

            expect(list.head.id).toBe('3');
            expect(list.head.value).toBe(3);
            expect(list.tail.id).toBe('3');
            expect(list.tail.value).toBe(3);

            list.prepend('2', 2).prepend('1', 1);

            const { head } = list;
            expect(head.id).toBe('1');
            expect(head.value).toBe(1);
            expect(list.nodes.size).toBe(3);

            const node2 = head.next;
            expect(node2.id).toBe('2');
            expect(node2.value).toBe(2);

            const node3 = node2.next;
            expect(node3.id).toBe('3');
            expect(node3.value).toBe(3);

            const { tail } = list;
            expect(tail.id).toBe('3');
            expect(tail.value).toBe(3);

            disposer()
        });

        it('append', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();

            list.append('1', 1);

            expect(list.head.id).toBe('1');
            expect(list.head.value).toBe(1);
            expect(list.tail.id).toBe('1');
            expect(list.tail.value).toBe(1);

            list.append('2', 2).append('3', 3);

            const { head } = list;
            expect(head.id).toBe('1');
            expect(head.value).toBe(1);

            const node2 = head.next;
            expect(node2.id).toBe('2');
            expect(node2.value).toBe(2);

            const node3 = node2.next;
            expect(node3.id).toBe('3');
            expect(node3.value).toBe(3);

            const { tail } = list;
            expect(tail.id).toBe('3');
            expect(tail.value).toBe(3);

            disposer()
        });

        it('remove head and tail', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            list.append('1', 1);

            expect(list.head.id).toBe('1');
            expect(list.head.value).toBe(1);
            expect(list.tail.id).toBe('1');
            expect(list.tail.value).toBe(1);
            expect(list.nodes.size).toBe(1);

            list.remove('1');

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            disposer()
        });

        it('remove head', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            list.append('1', 1).append('2', 2);

            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('2');
            expect(list.nodes.size).toBe(2);

            list.remove('1');

            expect(list.head.id).toBe('2');
            expect(list.tail.id).toBe('2');
            expect(list.nodes.size).toBe(1);

            list.prepend('1', 1).append('3', 3);

            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('3');
            expect(list.nodes.size).toBe(3);

            list.remove('1');

            expect(list.head.id).toBe('2');
            expect(list.tail.id).toBe('3');
            expect(list.nodes.size).toBe(2);

            disposer()
        });

        it('remove middle', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            list
                .append('1', 1)
                .append('2', 2)
                .append('3', 3);

            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('3');
            expect(list.nodes.size).toBe(3);

            list.remove('2');

            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('3');
            expect(list.nodes.size).toBe(2);

            disposer()
        });

        it('remove tail', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            list
                .append('1', 1)
                .append('2', 2)
                .append('3', 3);

            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('3');
            expect(list.nodes.size).toBe(3);

            list.remove('3');
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('2');
            expect(list.nodes.size).toBe(2);

            list.remove('2');
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('1');
            expect(list.nodes.size).toBe(1);

            list.remove('1');
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            disposer()
        });

        it('fromArray', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            list.fromArray([['1', 1]]);
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('1');
            expect(list.nodes.size).toBe(1);

            list.fromArray([['2', 2], ['3', 3]]);
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('3');
            expect(list.nodes.size).toBe(3);

            disposer()
        });

        it('deleteTail', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            list.append('1', 1);
            list.deleteTail();
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            list.append('1', 1).append('2', 2);
            list.deleteTail();
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('1');
            expect(list.nodes.size).toBe(1);

            list.append('2', 2).append('3', 3);
            list.deleteTail();
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('2');
            expect(list.nodes.size).toBe(2);

            disposer()
        });

        it('deleteHead', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            list.append('1', 1);
            list.deleteHead();
            expect(list.head).toBeNull();
            expect(list.tail).toBeNull();
            expect(list.nodes.size).toBe(0);

            list.append('2', 2).append('1', 1);
            list.deleteHead();
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('1');
            expect(list.nodes.size).toBe(1);

            list.append('2', 2).append('3', 3);
            list.deleteHead();
            expect(list.head.id).toBe('2');
            expect(list.tail.id).toBe('3');
            expect(list.nodes.size).toBe(2);

            disposer()
        });

        it('reverse', () => {
            const list = LinkedList('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            list.append('1', 1);
            list.reverse();
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('1');

            list.append('2', 2)
            list.reverse();
            expect(list.head.id).toBe('2');
            expect(list.tail.id).toBe('1');

            list.reverse();
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('2');

            list.append('3', 3)
            list.reverse();
            expect(list.head.id).toBe('3');
            expect(list.tail.id).toBe('1');

            list.reverse();
            expect(list.head.id).toBe('1');
            expect(list.tail.id).toBe('3');

            disposer()
        });
    });
});
