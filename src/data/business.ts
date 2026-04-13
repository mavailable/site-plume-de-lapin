/**
 * Technical business data — NOT editable via CMS
 * For editable content, see src/content/ (managed via CMS)
 */

export const legal = {
  registrationNumber: 'SIRET : XXX XXX XXX XXXXX', // PLACEHOLDER
  vatNumber: '',
  tradeRegister: 'RCS Briey',
} as const;

export const geo = {
  lat: 49.222,  // Lantefontaine — à vérifier sur Google Maps
  lon: 5.935,
} as const;

export const social = {
  facebook: 'https://www.facebook.com/profile.php?id=61576018496272',
} as const;

export const analytics = {
  umamiWebsiteId: '', // À remplir après création du site Umami
} as const;

// Web3Forms API key — cascade: CMS content → env var → cle Marc (defaut agence)
const WEB3FORMS_DEFAULT = '9667fcf8-c7da-4b7a-8432-0ec25215c75e';
export const web3formsDefault = WEB3FORMS_DEFAULT;
export const web3formsKey = import.meta.env.WEB3FORMS_KEY || WEB3FORMS_DEFAULT;
