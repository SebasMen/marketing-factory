export enum ApplicationLanguage {
    EN = 'en',
    ES = 'es',
}

export enum TranslationServiceAPIs {
  TRANSLATE_TEXT = 'TRANSLATE_TEXT',
}

export const TranslationServicePaths = {
  [TranslationServiceAPIs.TRANSLATE_TEXT]: '/',
};

export const TranslationServiceMethods = {
  [TranslationServiceAPIs.TRANSLATE_TEXT]: 'POST',
};

export type TranslationServicePayload = {
  [TranslationServiceAPIs.TRANSLATE_TEXT]: {
    q: string;
    source: ApplicationLanguage;
    target: ApplicationLanguage;
  };
};

export type TranslationServiceResponse = {
  [TranslationServiceAPIs.TRANSLATE_TEXT]: string;
};
