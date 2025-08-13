import { CoreMSCall } from './core';

export type CoreMSCallPayloads = {
  [CoreMSCall.CoreGetOne]: { id: string };
};
