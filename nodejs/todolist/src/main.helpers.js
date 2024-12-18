import fs from 'node:fs';

export function getTasks(path) {
  try {
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    return data;
  } catch (error) {
    console.error('Error reading tasks file:', error.message);
  }
}

export function addTask(description, filePath) {
  const date = new Date().toISOString();
  const data = getTasks(filePath);
  const id = data.length + 1;
  const dataToSave = [...data, { id, description, status: 'todo', createdAt: date, updatedAt: date }];

  fs.writeFileSync(filePath, JSON.stringify(dataToSave));
  console.log(`Task added successfully: ID: ${id}`);
}

export function rewriteIndexes(data) {
  for (let index = 0; index < data.length; index++) {
    const task = data[index];
    task.id = index + 1;
  }
}
