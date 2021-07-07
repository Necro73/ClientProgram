import {Injectable} from '@angular/core';
import {Query, Store, StoreConfig} from '@datorama/akita';
import {ApplicationInfoDto, TenantLoginInfoDto, UserLoginInfoDto} from '@shared/service-proxies/service-proxies';

export interface SessionState {
  application: ApplicationInfoDto | undefined;
  user: UserLoginInfoDto | undefined;
  tenant: TenantLoginInfoDto | undefined;
}

export function createInitialState(): SessionState {
  return {
    application: undefined,
    user: undefined,
    tenant: undefined
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {

  constructor() {
    super(createInitialState());
  }
}

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
  get user(): UserLoginInfoDto | undefined {
    return this.getValue().user;
  }
  get application(): ApplicationInfoDto | undefined {
    return this.getValue().application;
  }
  get tenant(): TenantLoginInfoDto | undefined {
    return this.getValue().tenant;
  }

  constructor(protected store: SessionStore) {
    super(store);
  }
}
