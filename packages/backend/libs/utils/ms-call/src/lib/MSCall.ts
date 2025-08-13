import { MS } from '@mfactory-be/commonTypes/global';
import axios from 'axios';
import { Schema } from 'joi';

const ApiURLs = {
  [MS.CORE]: 'http://localhost:3000/core',
  [MS.TEMPLATES]: 'http://localhost:3001/templates',
}

export class MSCallHandler<P = any, R = any> {
  path: string;
  contract: Schema;

  constructor(args: MSCallHandler<P, R>) {
    this.path = args.path;
    this.contract = args.contract;
  }
}

export class MSCallMiddleware<MSCall extends string = string, P = any, R = any> {
  private ms: MS;
  private config: Record<MSCall, MSCallHandler<P, R>>;

  constructor(ms: MS, config: Record<MSCall, MSCallHandler<P, R>>) {
    this.ms = ms;
    this.config = config;
  }

  call = async (call: MSCall, payload: P): Promise<R> => {
    try {
      const url = `${ApiURLs[this.ms]}${this.config[call].path}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new Error('System error');
    }
  };
}
