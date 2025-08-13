import axios from 'axios';
import {
  ApplicationSecret,
  SecretServiceAPIs,
  SecretServiceMethods,
  SecretServicePaths,
  SecretServicePayload,
  SecretServiceResponse,
} from './secret-service-types';

export class SecretService {
  private path = process.env.VAULT_URL;

  private authenticate = async () => {
    try {
      const response = await axios.request({
        baseURL: this.path,
        url: SecretServicePaths[SecretServiceAPIs.LOGIN],
        method: SecretServiceMethods[SecretServiceAPIs.LOGIN],
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify({
          role_id: process.env.VAULT_ROLE_ID,
          secret_id: process.env.VAULT_SECRET_ID,
        }),
      });
      return response.data;
    } catch (error) {
      console.error('Error in secrets service authentication request', error);
      throw error;
    }
  };

  private makeRequest = async <API extends SecretServiceAPIs>(
    api: API,
    payload?: SecretServicePayload[API],
  ) => {
    try {
      console.info('Make request to secrets service');

      const authResponse = await this.authenticate();

      const response = await axios.request({
        baseURL: this.path,
        url: SecretServicePaths[api],
        method: SecretServiceMethods[api],
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(payload),
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Error in translate service request', error);
      throw error;
    }
  };

  /**
   * Retrieves a secret from the secret service.
   * @param {ApplicationSecret} secret - The secret to retrieve.
   * @returns {Promise<SecretServiceResponse[SecretServiceAPIs.GET_SECRET]>} - The value of the secret.
   */
  getSecret = async (
    secret: ApplicationSecret,
  ): Promise<SecretServiceResponse[SecretServiceAPIs.GET_SECRET]> => {
    const response = await this.makeRequest(SecretServiceAPIs.GET_SECRET);
    return response.data[secret] ?? null;
  };
}
