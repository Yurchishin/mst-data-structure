import { types } from 'mobx-state-tree';
import { onSnapshotAggregation, createMSTSnapshot } from '@mst-ds/mst-jest';
import { Queue, QueueNode } from '../src/index';

describe('Queue', () => {
    describe('model', () => {
        it('create(int)', () => {
            const IntQueueNode = QueueNode('Int', types.integer);
            const list = Queue('Int', IntQueueNode).create();

            createMSTSnapshot(list)
        });
        it('create in model(int)', () => {
            const IntQueueNode = QueueNode('Int', types.integer);

            const rootStore = types.model('RootStore', {
                numbers: Queue('Int', IntQueueNode),
            }).create()

            createMSTSnapshot(rootStore)
        });
        it('create in model(Todo)', () => {
            const Todo = types.model('Todo', {
                name: types.string,
                active: types.boolean,
            })

            const TodoQueueNode = QueueNode('Int', Todo);

            const rootStore = types.model('RootStore', {
                todos: Queue('Todo', TodoQueueNode),
            }).create()

            rootStore.todos
                .enqueue('3', {
                    name: 'name1',
                    active: false,
                })
                .enqueue('2', {
                    name: 'name2',
                    active: true,
                })
                .enqueue('1', {
                    name: 'name3',
                    active: false,
                })
                .dequeue()

            createMSTSnapshot(rootStore)
        });
    })
    describe('actions', () => {
        it('enqueue', () => {
            const IntQueueNode = QueueNode('Int', types.integer);
            const list = Queue('Int', IntQueueNode).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.isEmpty).toBe(true);

            list.enqueue('1', 1);
            expect(list.peekNode.id).toBe('1');

            list.enqueue('2', 2)
            expect(list.peekNode.id).toBe('1');

            list.enqueue('3', 3)
            expect(list.peekNode.id).toBe('1');

            disposer()
        });
        it('dequeue', () => {
            const IntQueueNode = QueueNode('Int', types.integer);
            const list = Queue('Int', IntQueueNode).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.isEmpty).toBe(true);

            list.enqueue('1', 1)
                .enqueue('2', 2)
                .enqueue('3', 3)
                .dequeue()

            expect(list.peekNode.id).toBe('2');

            disposer()
        });
    });
});
