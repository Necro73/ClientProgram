import {Injectable} from '@angular/core';
import {Query, Store, StoreConfig} from '@datorama/akita';
import {Deferred} from '@shared/shared-interfaces';

export interface BootstrapState {
  load: Deferred;
  api: string;
}

export function createInitialState(): BootstrapState {
  return {
    load: new Deferred(),
    api: 'http://localhost:21021'
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'bootstrap' })
export class BootstrapStore extends Store<BootstrapState> {

  constructor() {
    super(createInitialState());
  }
}
@Injectable({ providedIn: 'root' })
export class BootstrapQuery extends Query<BootstrapState> {
  get api(): string {
    return this.getValue().api;
  }
  get load(): Deferred {
    return this.getValue().load;
  }
  constructor(protected store: BootstrapStore) {
    super(store);
  }
}
