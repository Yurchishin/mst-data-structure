import { types } from 'mobx-state-tree';
import { onSnapshotAggregation, createMSTSnapshot } from '@mst/mst-jest';
import Stack from '../src/index';

describe('Stack', () => {
    describe('model', () => {
        it('create(int)', () => {
            const list = Stack('Int', types.integer).create();

            createMSTSnapshot(list)
        });
        it('create in model(int)', () => {
            const rootStore = types.model('RootStore', {
                numbers: Stack('Int', types.integer),
            }).create()

            createMSTSnapshot(rootStore)
        });
        it('create in model(Todo)', () => {
            const Todo = types.model('Todo', {
                name: types.string,
                active: types.boolean,
            })

            const rootStore = types.model('RootStore', {
                todos: Stack('Todo', Todo),
            }).create()

            rootStore.todos
                .push('1', {
                    name: 'name1',
                    active: false,
                })
                .push('2', {
                    name: 'name2',
                    active: true,
                })
                .push('3', {
                    name: 'name2',
                    active: false,
                })
                .pop()

            createMSTSnapshot(rootStore)
        });
    })
    describe('actions', () => {
        it('push', () => {
            const list = Stack('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.isEmpty).toBe(true);

            list.push('3', 3);
            expect(list.peekId).toBe('3');

            list.push('2', 2)
            expect(list.peekId).toBe('2');

            list.push('1', 1)
            expect(list.peekId).toBe('1');

            disposer()
        });
        it('pop', () => {
            const list = Stack('Int', types.integer).create();

            const disposer = onSnapshotAggregation(list)

            expect(list.isEmpty).toBe(true);

            list.push('3', 3)
                .push('2', 2)
                .push('1', 1)
                .pop()

            expect(list.peekId).toBe('2');

            disposer()
        });
    });
});
