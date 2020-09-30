import { types } from 'mobx-state-tree';
import { onSnapshotAggregation, createMSTSnapshot } from '@mst-ds/mst-jest';
import Queue from '../src/index';

describe('Queue', () => {
    describe('model', () => {
        it('create(int)', () => {
            const list = Queue('Int', types.integer).create();

            createMSTSnapshot(list)
        });
        it('create in model(int)', () => {
            const rootStore = types.model('RootStore', {
                numbers: Queue('Int', types.integer),
            }).create()

            createMSTSnapshot(rootStore)
        });
        it('create in model(Todo)', () => {
            const Todo = types.model('Todo', {
                name: types.string,
                active: types.boolean,
            })

            const rootStore = types.model('RootStore', {
                todos: Queue('Todo', Todo),
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
            const list = Queue('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.isEmpty).toBe(true);

            list.enqueue('1', 1);
            expect(list.peekId).toBe('1');

            list.enqueue('2', 2)
            expect(list.peekId).toBe('1');

            list.enqueue('3', 3)
            expect(list.peekId).toBe('1');

            disposer()
        });
        it('dequeue', () => {
            const list = Queue('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.isEmpty).toBe(true);

            list.enqueue('1', 1)
                .enqueue('2', 2)
                .enqueue('3', 3)
                .dequeue()

            expect(list.peekId).toBe('2');

            disposer()
        });
    });
});
