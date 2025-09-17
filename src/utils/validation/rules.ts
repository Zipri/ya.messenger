export type RuleName =
  | 'required'
  | 'name'
  | 'login'
  | 'email'
  | 'password'
  | 'phone'
  | 'message';

export const messages: Record<RuleName, string> = {
  required: 'Поле обязательно',
  name: 'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
  login:
    'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)',
  email:
    'Латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы',
  password:
    'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
  phone: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса',
  message: 'Сообщение не должно быть пустым',
};

export const rules: Record<RuleName, (value: string) => boolean> = {
  required: (v) => v.trim().length > 0,
  name: (v) => /^[A-ZА-Я][a-zа-я-]*$/.test(v),
  login: (v) => {
    if (v.length < 3 || v.length > 20) return false;
    if (!/^[a-zA-Z0-9_-]+$/.test(v)) return false;
    if (/^\d+$/.test(v)) return false;
    return true;
  },
  email: (v) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z]+(?:[-.]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/.test(v),
  password: (v) => {
    if (v.length < 8 || v.length > 40) return false;
    if (!/[A-Z]/.test(v)) return false;
    if (!/\d/.test(v)) return false;
    return true;
  },
  phone: (v) => /^\+?\d{10,15}$/.test(v),
  message: (v) => v.trim().length > 0,
};
