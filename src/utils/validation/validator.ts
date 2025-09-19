import { rules, messages, type RuleName } from './rules';

export type ValidateResult = {
  valid: boolean;
  errors: string[];
  firstError?: string;
};

export function validateValue(
  value: string,
  ruleNames: RuleName[] = []
): ValidateResult {
  const errors: string[] = [];

  ruleNames.forEach((name) => {
    const ok = rules[name](value);
    if (!ok) errors.push(messages[name]);
  });

  return { valid: errors.length === 0, errors, firstError: errors[0] };
}

export function parseRulesAttr(attr?: string | null): RuleName[] {
  if (!attr) return [];
  return attr
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean) as RuleName[];
}
