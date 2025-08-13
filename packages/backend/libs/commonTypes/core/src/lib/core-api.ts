import { MS } from '@mfactory-be/commonTypes/global';
import { MSCallHandler, MSCallMiddleware } from '@mfactory-be/utils/ms-call';
import { CoreMSCallContracts } from './contracts';
import { CoreMSCall } from './core';
import { CoreMSCallPayloads } from './payloads';
import { CoreMSCallResponses } from './responses';

const CoreMSCallApi = {
  [CoreMSCall.CoreGetOne]: new MSCallHandler<
    CoreMSCallPayloads[CoreMSCall.CoreGetOne],
    CoreMSCallResponses[CoreMSCall.CoreGetOne]
  >({
    path: '/',
    contract: CoreMSCallContracts[CoreMSCall.CoreGetOne],
  }),
};

export const coreMSCallInvoke = new MSCallMiddleware(MS.CORE, CoreMSCallApi);
