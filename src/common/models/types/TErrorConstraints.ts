export enum ErrorConstraintKey {
  IsString = 'isString',
  Length = 'isLength',
}

export type TErrorConstraints = Record<ErrorConstraintKey, string>;
