### README for Utils Folder

````markdown
# Utils

The `utils` folder contains utility functions and classes that perform general-purpose operations, often involving more complex logic than helpers. Utilities are typically used to handle tasks that are too specific to be considered helpers but are still reusable across multiple parts of the project.

## What is a Utils?

Utilities are broader in scope compared to helpers and often encapsulate a set of related functionalities. They are used to manage more complex operations and can sometimes include business logic specific to the application.

## Examples

### File Manager and Configuration Loader

```typescript
// utils/fileManager.ts

import * as fs from 'fs';

export function readFile(filePath: string): string {
  if (!fs.existsSync(filePath)) {
    throw new Error(`The file at ${filePath} does not exist.`);
  }

  return fs.readFileSync(filePath, 'utf-8');
}

export function writeFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content, 'utf-8');
}

// utils/configLoader.ts

import * as fs from 'fs';

export function loadConfig(filePath: string): object {
  if (!fs.existsSync(filePath)) {
    throw new Error(`The file at ${filePath} does not exist.`);
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(fileContent);
}
```
````

## Usage

To use a utility function, import it into your main code file:

```typescript
import { readFile, writeFile } from './utils/fileManager';
import { loadConfig } from './utils/configLoader';

// Reading and writing files
writeFile('example.txt', 'Hello, World!');
const content = readFile('example.txt');
console.log(content); // Outputs: Hello, World!

// Loading configuration
const config = loadConfig('config.json');
console.log(config); // Outputs: content of config.json as a dictionary
```
