## `mst-jest`

#### API

##### `createMSTSnapshot(node)` - created jest snapshot from model
##### `getEnvMock({...})` - mocked for `getEnv`'
##### `getRootMock({...})` - mocked for `getRoot`'
##### `onPatchesAggregation(node)` - aggregate all model patches, and take a jest snapshot'
##### `onSnapshotAggregation(node)` - aggregate all model snapshots, and take a jest snapshot'

#### Usage
```js
import { types } from "mobx-state-tree"
import { createMSTSnapshot, onPatchesAggregation, onSnapshotAggregation } from "@mst-ds/mst-jest"

describe('Tests', () => {
    it('snapshot test', () => {
        const rootStore = types.model({
            ...,
        })
        .actions(() => {...});

        createMSTSnapshot(list) // create jest snapshot
    });
it('snapshots test', () => {
        const rootStore = types.model({
            ...,
        })
        .actions(() => {...});

        const disposer = onPatchesAggregation(list)

        rootStore.action1();
        rootStore.action2();
        rootStore.action3();

        disposer() // create jest snapshot
    });
    it('patches test', () => {
        const rootStore = types.model({
            ...,
        })
        .actions(() => {...});

        const disposer = onSnapshotAggregation(list)

        rootStore.action1();
        rootStore.action2();
        rootStore.action3();

        disposer() // create jest snapshot
    });
});
```