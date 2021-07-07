import {Injectable} from '@angular/core';
import {Query, Store, StoreConfig} from '@datorama/akita';
import {Dictionary, Language} from '@shared/shared-interfaces';

export interface LocalizationState {
  lang: string;
  defaultSourceName: string;
  currentLanguage: Language;
  currentCulture: Language;
  // todo
  languages: Language[];
  values: Dictionary<Dictionary<string>>;
  sources: Language[];
}

export function createInitialState(): LocalizationState {
  return {
    lang: 'ru',
    currentCulture: {},
    currentLanguage: {},
    defaultSourceName: '',
    languages: [],
    sources: [],
    values: {}
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'localization' })
export class LocalizationStore extends Store<LocalizationState> {

  constructor() {
    super(createInitialState());
  }
}

@Injectable({ providedIn: 'root' })
export class LocalizationQuery extends Query<LocalizationState> {

  constructor(protected store: LocalizationStore) {
    super(store);
  }
}
