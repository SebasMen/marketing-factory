import { CoreMSCall, coreMSCallInvoke } from '@mfactory-be/commonTypes/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API Template' };
  }

  async getOneData(id: string): Promise<{ message: string }> {
    const value = await coreMSCallInvoke.call(CoreMSCall.CoreGetOne, {id});
    return value;
  }
}
