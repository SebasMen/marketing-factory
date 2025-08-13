import { Chance } from 'chance';

export const randomUUID = () => new Chance().guid({ version: 4 });
