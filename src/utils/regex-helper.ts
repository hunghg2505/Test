/* eslint-disable max-classes-per-file */
export class RegexUtils {
  static RegexConstants = class {
    static REGEX_EMAIL =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static REGEX_NUMBER = /^\+?([1-9]\d*)$/;

    //eslint-disable-next-line
    static REGEX_PHONE = /^[0-9\+]{10,12}$/;

    static REGEX_PASSWORD = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

    static REGEX_VERSION = /^(\d+)\.{1}(\d+)$/;

    static REGEX_MOBILE_NUMBER = /^(66)[6|8|9][0-9]{9}$/g;

    static REGEX_PASSPORT = /^(AA)[0-9]{7}$/g;

    static REGEX_LASER_CODE = /^(AA)[0-9]{10}$/g;
  };

  static isEmail(input: string): boolean {
    const re = new RegExp(RegexUtils.RegexConstants.REGEX_EMAIL);
    return re.test(input);
  }

  static isNumber(input: string): boolean {
    const re = new RegExp(RegexUtils.RegexConstants.REGEX_NUMBER);
    return re.test(input);
  }
}
