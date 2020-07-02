import intl from 'react-intl-universal';
import { LOCALES,  LOCALE_STORAGE_KEY} from '../constants/index';


const IntlSafe = function(this:any) {
  this.safeGet = intl.get;
  this.get = function(key: any) {
      if (typeof key !== 'string' || key === '') {
        console.warn(`国际化入参有问题,传入的 key 为 ${key} ,类型为 ${typeof key}`);
        return '';
      }
      return this.safeGet(key);
    }
} as any

IntlSafe.prototype = intl;

export default new IntlSafe();

export const isZhCN = () => {
  const { currentLocale } = intl.getInitOptions();
  return currentLocale === LOCALES.zh;
} 

export const getInitialLocale = () => {
  const storage = localStorage.getItem(LOCALE_STORAGE_KEY);
  const navigatorLanguage = navigator.language || 'zh';
  const hasStorage = storage && Object.values(LOCALES).indexOf(storage) > -1;

  let locale = LOCALES.zh;
  if (hasStorage) {
    let typeLocale = storage as string;
    locale = typeLocale;
  } else if (navigatorLanguage.substr(0, 2) !== 'zh') {
    locale = LOCALES.en;
  }

  initLocale(locale);
  return locale;
}

export function initLocale(locale:string) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}

export function setInitialLocale(locale:string) {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
}