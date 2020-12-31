declare type OptionalKeys<T> = { [key in keyof T]?: T[key]; };
declare type Assign<T, K extends string, KT> = {
  [P in (K | keyof T)]: P extends keyof T ? T[P] : KT;
};
