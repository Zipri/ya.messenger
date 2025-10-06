function classNames(...args: any[]): string {
  const classes: string[] = [];

  function processArg(arg: any): void {
    if (!arg) return; // null, undefined, false, 0, ''

    if (typeof arg === 'string' || typeof arg === 'number') {
      classes.push(String(arg));
    } else if (Array.isArray(arg)) {
      arg.forEach(processArg);
    } else if (typeof arg === 'object') {
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key);
        }
      });
    }
  }

  args.forEach(processArg);

  return classes.join(' ');
}

export default classNames;
