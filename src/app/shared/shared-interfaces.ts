export interface Dictionary<T> {
  [Key: string]: T;
}

export class Deferred {
  public promise: Promise<void>;
  public reject: (reason?: any) => void;
  public resolve: (value?: (PromiseLike<any> | any)) => void;
  constructor() {
    console.log('[App.Init] Create Hooks');
    this.promise = new Promise<void>((resolve, reject) => {
      this.reject = reject;
      this.resolve = resolve;
    });
  }
}

export interface Language {
  displayName?: string;
  icon?: string;
  isDefault?: boolean;
  isDisabled?: boolean;
  isRightToLeft?: boolean;
  name?: string;
}

export interface LanguageSource {
  name?: string;
  type?: string;
}
