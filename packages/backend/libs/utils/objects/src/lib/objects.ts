/* eslint-disable @typescript-eslint/no-explicit-any */
import * as _ from 'lodash';

/** Aux type to mark N properties as optional, but one of them as required */
export type RequireAtLeastOne<T, Keys extends keyof T = keyof T> = Pick<T, Exclude<keyof T, Keys>> &
  {
    [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>;
  }[Keys];

/**
 * Omits some of the keys from a type and makes others optional
 * @param firstParameter Base type
 * @param secondParameter keys to be omitted from the object
 * @param thirdParameter keys that are converted to optional
 */
export type OmitPartial<T, O extends keyof T, P extends keyof T = any> = Omit<T, O | P> & Partial<Pick<T, P>>;

/**
 * Omits some of the keys from a type and makes others optional, and makes others require one or another
 * @param firstParameter Base type
 * @param secondParameter keys to be omitted from the object
 * @param thirdParameter keys that are converted to optional
 */
export type OmitPartialRequireOne<
  T,
  K1 extends keyof T,
  K2 extends keyof T,
  K3 extends K2 | Exclude<keyof T, K1 | K2>,
> = RequireAtLeastOne<OmitPartial<T, K1, K2>, K3>;

/**
 * Makes all keys from a type optional except the given in K
 * @param firstParameter Base type
 * @param secondParameter keys to be required from the object
 */
export type PickPartial<T, K extends keyof T> = Partial<T> & Pick<T, K>;

/**
 * Like Record but all key are optional.
 */
export type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};

export const isValid = (value: string | number | boolean | object): boolean => {
  if (typeof value === 'string') return !_.isEmpty(value);
  if (typeof value === 'number') return _.isNumber(value) && (!_.isNaN(value) || (!value && value !== 0));
  if (typeof value === 'boolean') return _.isBoolean() && !_.isEmpty(value);
  return !_.isEmpty(value);
};
