import axios from 'axios';
import {
  ApplicationLanguage,
  TranslationServiceAPIs,
  TranslationServiceMethods,
  TranslationServicePaths,
  TranslationServicePayload,
  TranslationServiceResponse,
} from './translation-types';

export class TranslationService {
  private path = 'https://libretranslate.com/translate';

  private makeRequest = async <API extends TranslationServiceAPIs>(
    api: API,
    payload?: TranslationServicePayload[API],
  ) => {
    try {
      console.info('Make request to translate service');
      const response = await axios.request({
        baseURL: this.path,
        url: TranslationServicePaths[api],
        method: TranslationServiceMethods[api],
        headers: { 'Content-Type': 'application/json' },
        data: JSON.stringify(payload),
      });
      return response.data.translatedText;
    } catch (error) {
      console.error('Error in translate service request', error);
      throw error;
    }
  };

  translateText = async (payload: {
    text: string;
    source: ApplicationLanguage;
    target: ApplicationLanguage;
  }): Promise<TranslationServiceResponse[TranslationServiceAPIs.TRANSLATE_TEXT]> => {
    return await this.makeRequest(TranslationServiceAPIs.TRANSLATE_TEXT, {
      q: payload.text,
      source: payload.source,
      target: payload.target,
    });
  };
}
