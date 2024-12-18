# Task CLI - README

## Overview

**Task CLI** is a command-line interface (CLI) tool to manage a to-do list. It supports adding, updating, deleting, marking tasks as in-progress or done, and listing tasks by various criteria.

This document explains how to install, configure, and use the tool effectively.

---

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory:

   ```bash
   cd todolist
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Make the CLI globally executable:

   ```bash
   npm link
   ```

   This will make the `task-cli` command available globally.

---

## Usage

The CLI supports the following commands to manage tasks:

### Adding a New Task

Add a new task with a description:

```bash
task-cli add "Buy groceries"
```

**Output:**

```bash
Task added successfully (ID: 1)
```

### Updating and Deleting Tasks

- Update a task description:

  ```bash
  task-cli update <task-id> "New task description"
  ```

- Delete a task:

  ```bash
  task-cli delete <task-id>
  ```

**Example:**

```bash
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1
```

---

### Marking Task Status

- Mark a task as **in-progress**:

  ```bash
  task-cli mark-in-progress <task-id>
  ```

- Mark a task as **done**:

  ```bash
  task-cli mark-done <task-id>
  ```

**Example:**

```bash
task-cli mark-in-progress 1
task-cli mark-done 1
```

---

### Listing Tasks

#### List All Tasks

To list all tasks:

```bash
task-cli list
```

#### List Tasks by Status

- List tasks marked as **done**:

  ```bash
  task-cli list done
  ```

- List tasks marked as **to-do**:

  ```bash
  task-cli list todo
  ```

- List tasks marked as **in-progress**:

  ```bash
  task-cli list in-progress
  ```

**Example:**

```bash
task-cli list done
task-cli list todo
task-cli list in-progress
```

---

## Development

### Scripts

The following scripts are available in the `package.json`:

- **Test the project:**

  ```bash
  npm run test
  ```

- **Lint the code:**

  ```bash
  npm run lint
  ```

- **Format the code:**

  ```bash
  npm run format
  ```

### Project Structure

The main CLI entry point is defined in `package.json` under the `bin` field:

```json
"bin": {
  "task-cli": "./src/main.js"
}
```

Ensure all CLI logic is implemented in `./src/main.js`.

---

## Dependencies

The project uses the following dependencies:

- **commander**: For parsing CLI commands.
- **globals**: Provides shared configurations.
- **jest**: For testing.
- **prettier**: For code formatting.

### DevDependencies

- **@babel/core, @babel/preset-env, babel-jest**: For transpiling and testing modern JavaScript.
- **eslint, eslint-config-prettier, eslint-plugin-prettier**: For linting and maintaining code quality.

---

## Author

Created by **Ababacar Niang**.

---

## License

This project is licensed under the ISC License.

---

### Notes

For further customization, edit the `main.js` file to enhance CLI functionality or add more commands.
