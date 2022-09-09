/* eslint-disable max-classes-per-file */
export class RegexUtils {
  static RegexConstants = class {
    static REGEX_EMAIL =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static REGEX_NUMBER = /^\+?([1-9]\d*)$/;

    //eslint-disable-next-line
    static REGEX_PHONE = /^[0-9\s]*$/;

    static REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$ %^&*-]).{8,}$/;

    static REGEX_VERSION = /^(\d+)\.{1}(\d+)$/;

    static REGEX_MOBILE_NUMBER = /^(66)[6|8|9]\d{8}$/g;

    static REGEX_PASSPORT = /^[aA-zZ0-9-]+$/g;

    static REGEX_LASER_CODE = /^(AA)\d{10}$/g;

    static REGEX_NATIONAL_ID_CARD = /^([0-8]{1})(-\d{2})(\d{2})(-\d{5})(-\d{2})(-\d)$/g;
  };

  static isEmail(input: string): boolean {
    const re = new RegExp(RegexUtils.RegexConstants.REGEX_EMAIL);
    return re.test(input);
  }

  static isNumber(input: string): boolean {
    const re = new RegExp(RegexUtils.RegexConstants.REGEX_NUMBER);
    return re.test(input);
  }

  static isNationalIdCard(input: string): boolean {
    const re = new RegExp(RegexUtils.RegexConstants.REGEX_NATIONAL_ID_CARD);
    return re.test(input);
  }
}
