const enRegex = /\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/;
const uaRegex = /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ',\s]+$/u;

export function validateAddWord(en: string, ua: string) {
  const errors: { en?: string; ua?: string } = {};

  if (!en.trim()) errors.en = "Обов’язкове поле";
  else if (!enRegex.test(en.trim()))
    errors.en = "Тільки латиниця, апостроф, дефіс і пробіли";

  if (!ua.trim()) errors.ua = "Обов’язкове поле";
  else if (!uaRegex.test(ua.trim()))
    errors.ua = "Тільки українські літери і пробіли";

  return errors;
}
