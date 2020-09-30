import * as mobxStateTree from 'mobx-state-tree';
import {onPatch, onSnapshot, getSnapshot } from 'mobx-state-tree';

export {
    protect,
    unprotect,
    isProtected,
} from 'mobx-state-tree';

export const createMSTSnapshot = (model, ...options) => {
    expect(getSnapshot(model)).toMatchSnapshot(...options);
};

export const getEnvMock = (value = {}) => {
    jest.spyOn(mobxStateTree, 'getEnv').mockReturnValue(value);
};

export const getRootMock = (value = {}) => {
    jest.spyOn(mobxStateTree, 'getRoot').mockReturnValue(value);
};

export const mockMiddleware = (call, next) => next(call);

export const onPatchesAggregation = (model, ...options) => {
    const patches = [];

    const disposer = onPatch(model, patch => {
        patches.push(patch);
    });

    return () => {
        expect(patches).toMatchSnapshot(...options);
        disposer();
    };
};

export const onSnapshotAggregation = (model, ...options) => {
    const snapshots = [];

    const disposer = onSnapshot(model, patch => {
        snapshots.push(patch);
    });

    return () => {
        expect(snapshots).toMatchSnapshot(...options);
        disposer();
    };
};
