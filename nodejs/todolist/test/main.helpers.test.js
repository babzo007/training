import fs from 'node:fs';
import { addTask, getTasks } from '../src/main.helpers.js';

const testFilePath = './test.json';

beforeEach(() => {
  // Ensure a clean test file before each test
  fs.writeFileSync(testFilePath, JSON.stringify([]));

  const fixedDate = new Date('2024-12-17T23:08:19');
  jest.spyOn(global, 'Date').mockImplementation(() => fixedDate);
});

afterAll(() => {
  // Clean up test file after all tests
  if (fs.existsSync(testFilePath)) {
    fs.unlinkSync(testFilePath);
  }
});

describe('getTasks', () => {
  it('should return an empty array when the file is empty', () => {
    const tasks = getTasks(testFilePath);
    expect(tasks).toEqual([]);
  });

  it('should return tasks from the file', () => {
    const date = new Date();
    const sampleTasks = [
      {
        id: 1,
        description: 'Test task',
        status: 'todo',
        createdAt: date,
        updatedAt: date,
      },
    ];
    fs.writeFileSync(testFilePath, JSON.stringify(sampleTasks));

    const tasks = getTasks(testFilePath);
    expect(tasks[0].description).toEqual('Test task');
    expect(tasks[0].id).toEqual(1);
  });
});

describe('addTask', () => {
  it('should add a new task to an empty file', () => {
    addTask('New Task', testFilePath);

    const tasks = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));

    expect(tasks.length).toBe(1);
    expect(tasks[0]).toMatchObject({
      id: 1,
      description: 'New Task',
      status: 'todo',
      createdAt: '2024-12-17T22:08:19.000Z',
      updatedAt: '2024-12-17T22:08:19.000Z',
    });
  });
});
