# Helpers

# Helpers

The `helpers` folder contains auxiliary functions and classes that support the main operations of the project. These are designed to handle repetitive or general-purpose tasks that are commonly needed throughout the codebase.

## What is a Helper?

Helpers are small, reusable pieces of code that perform specific tasks. They are used to simplify complex operations, improve code readability, and promote code reuse. Helpers do not contain business logic but rather support it.

## Examples

### Date Formatter and Email Validator

```typescript
// helpers/dateFormatter.ts

export function formatDate(date: Date, format: string = 'yyyy-MM-dd'): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const parts = new Intl.DateTimeFormat('en-US', options).formatToParts(date);
  const formattedDate = parts.map((part) => part.value).join('-');
  return format
    .replace('yyyy', formattedDate.substring(6, 10))
    .replace('MM', formattedDate.substring(0, 2))
    .replace('dd', formattedDate.substring(3, 5));
}

// helpers/emailValidator.ts

export function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}
```

## Usage

To use a helper function, simply import it into your main code file:

```typescript
import { formatDate } from './helpers/dateFormatter';
import { isValidEmail } from './helpers/emailValidator';

const date = formatDate(new Date());
console.log(date); // Outputs: 2024-06-03

const email = 'example@test.com';
console.log(isValidEmail(email)); // Outputs: true
```
