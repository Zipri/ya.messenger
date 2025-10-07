function omit<T extends object>(obj: T, fields: (keyof T)[]): Omit<T, keyof T> {
  const result = {} as Omit<T, keyof T>;

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && !fields.includes(key)) {
      (result as any)[key] = obj[key];
    }
  }

  return result;
}

export default omit;
