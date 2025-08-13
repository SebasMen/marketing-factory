import { CoreMSCall } from './core';
import * as J from 'joi';

export const CoreMSCallContracts = {
  [CoreMSCall.CoreGetOne]: J.object({
    id: J.string().uuid()
  })
};
