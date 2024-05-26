# Services

The `services` folder contains modules that handle business logic and interactions with external systems, such as APIs, databases, or other services. These modules encapsulate the core functionalities of the application and often coordinate multiple helper and utility functions to perform complex tasks.

## What is a Service?

Services are components that provide a specific functionality within an application. They are responsible for implementing business logic, interacting with external systems, and managing data. Services typically encapsulate one or more operations that are essential for the application’s workflow.

## Examples

### User Service and Email Service

```typescript
// services/userService.ts

import { isValidEmail } from '../helpers/emailValidator';
import { readFile, writeFile } from '../utils/fileManager';

interface User {
  id: number;
  name: string;
  email: string;
}

export class UserService {
  private users: User[] = [];
  private filePath: string = 'users.json';

  constructor() {
    this.loadUsers();
  }

  private loadUsers() {
    try {
      const data = readFile(this.filePath);
      this.users = JSON.parse(data);
    } catch (error) {
      console.error('Could not load users:', error);
    }
  }

  private saveUsers() {
    try {
      writeFile(this.filePath, JSON.stringify(this.users, null, 2));
    } catch (error) {
      console.error('Could not save users:', error);
    }
  }

  public addUser(name: string, email: string): User | null {
    if (!isValidEmail(email)) {
      console.error('Invalid email address');
      return null;
    }

    const newUser: User = {
      id: this.users.length + 1,
      name,
      email,
    };

    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  public getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}

// services/emailService.ts

import nodemailer from 'nodemailer';

export class EmailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  public async sendEmail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'your-email@gmail.com',
      to,
      subject,
      text,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
```

## Usage

To use a service, import it into your main code file:

```typescript
import { UserService } from './services/userService';
import { EmailService } from './services/emailService';

const userService = new UserService();
const emailService = new EmailService();

// Adding a user
const newUser = userService.addUser('John Doe', 'john.doe@example.com');
if (newUser) {
  console.log('Added user:', newUser);
}

// Getting a user by ID
const user = userService.getUserById(1);
if (user) {
  console.log('User found:', user);
}

// Sending an email
emailService
  .sendEmail('recipient@example.com', 'Test Subject', 'Test email body')
  .then(() => console.log('Email sent successfully'))
  .catch((error) => console.error('Failed to send email:', error));
```
