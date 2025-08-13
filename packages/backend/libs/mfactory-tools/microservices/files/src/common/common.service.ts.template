import { IEnvironment } from '@mfactory-be/commonTypes/global';
import { Dependencies, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Dependencies(ConfigService)
@Injectable()
export class CommonService {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Get the value of a configuration variable with the given name from the
   * environment, cast to type T.
   *
   * @template T The type to cast the configuration variable to
   * @param {IEnvironment} name The name of the configuration variable to get
   * @returns {T} The value of the configuration variable cast to type T
   */
  getEnv<T>(name: keyof IEnvironment): T {
    return this.configService.get<T>(name.toString());
  }
}
