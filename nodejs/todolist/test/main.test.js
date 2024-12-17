import { execSync } from 'child_process';
import fs from 'node:fs';

const cliPath = './src/main.js';
const testFilePath = './test.json';

beforeEach(() => {
  // Reset the test file
  fs.writeFileSync(testFilePath, JSON.stringify([]));
});

afterAll(() => {
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath);
  }
});

describe('task-cli', () => {
  it('should add a task successfully', () => {
    const command = `node ${cliPath} add "Test CLI Task"`;
    const output = execSync(command, { env: { NODE_ENV: 'test' } }).toString();

    expect(output).toContain('Task added successfully');
    const tasks = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(tasks.length).toBe(1);
    expect(tasks[0].description).toBe('Test CLI Task');
  });

  it('should list tasks', () => {
    fs.writeFileSync(testFilePath, JSON.stringify([{ id: 1, description: 'Test Task', status: 'todo' }]));

    const command = `node ${cliPath} list`;
    const output = execSync(command, { env: { NODE_ENV: 'test' } }).toString();

    expect(output).toContain('Test Task');
  });

  it('should update a task description', () => {
    fs.writeFileSync(testFilePath, JSON.stringify([{ id: 1, description: 'Old Task', status: 'todo' }]));

    const command = `node ${cliPath} update 1 "Updated Task"`;
    const output = execSync(command, { env: { NODE_ENV: 'test' } }).toString();

    expect(output).toContain('Task updated successfully');
    const tasks = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(tasks[0].description).toBe('Updated Task');
  });

  it('should delete a task', () => {
    fs.writeFileSync(testFilePath, JSON.stringify([{ id: 1, description: 'Task to Delete', status: 'todo' }]));

    const command = `node ${cliPath} delete 1`;
    const output = execSync(command, { env: { NODE_ENV: 'test' } }).toString();

    expect(output).toContain('Task deleted successfully');
    const tasks = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(tasks.length).toBe(0);
  });

  it('should mark a task as done', () => {
    fs.writeFileSync(testFilePath, JSON.stringify([{ id: 1, description: 'Task to Complete', status: 'todo' }]));

    const command = `node ${cliPath} mark-done 1`;
    const output = execSync(command, { env: { NODE_ENV: 'test' } }).toString();

    expect(output).toContain('Task status updated successfully to done');
    const tasks = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));
    expect(tasks[0].status).toBe('done');
  });
});
