#!/usr/bin/env node
import { Command } from 'commander';
import fs from 'node:fs';
import { addTask, getTasks, rewriteIndexes } from './main.helpers.js';

const taskFile = process.env.NODE_ENV === 'test' ? './test.json' : './tasks.json';
const program = new Command();

program.name('task-cli').description('A simple task manager').version('1.0.0');

if (!fs.existsSync(taskFile)) {
  fs.writeFileSync(taskFile, JSON.stringify([]));
}

// Adding a new task
program
  .command('add')
  .description('Add a task')
  .argument('<description>', 'description of the task')
  .action(description => {
    addTask(description, taskFile);
  });

// Listing all tasks
program
  .command('list')
  .argument('[filter]', 'filters list of tasks that are done, todo or in progress')
  .description('List all tasks')
  .action(filter => {
    const data = getTasks(taskFile);

    if (filter) {
      switch (filter) {
        case 'done':
          {
            const filterDoneTasks = data.filter(task => task.status === 'done');
            console.log(filterDoneTasks);
          }
          break;
        case 'todo':
          {
            const filterTodoTasks = data.filter(task => task.status === 'todo');
            console.log(filterTodoTasks);
          }
          break;
        case 'in-progress':
          {
            const filterinProgressTasks = data.filter(task => task.status === 'in-progress');
            console.log(filterinProgressTasks);
          }
          break;

        default:
          console.log(`No tasks found with status ${filter}.`);
          break;
      }
    } else {
      console.log(data);
    }
  });

// Updating and deleting tasks
program
  .command('update')
  .description('Updating a task')
  .argument('<id>', 'id of the task to update')
  .argument('<description>', 'id of the task to update')
  .action((id, description) => {
    const data = getTasks(taskFile);
    const taskToUpdate = data.find(task => task.id === parseInt(id));

    if (!taskToUpdate) {
      throw new Error('Element with id ' + id + 'does not exist');
    }

    const index = data.findIndex(taskToUpdate => taskToUpdate.id === parseInt(id));
    const newTaskToUpdate = { ...taskToUpdate, description, updatedAt: new Date() };

    data.splice(index, 1, newTaskToUpdate);

    fs.writeFileSync(taskFile, JSON.stringify(data));
    console.log(`Task updated successfully: ID: ${id}`);
  });

program
  .command('delete')
  .description('Delete a task')
  .argument('<id>', 'id of the task to delete')
  .action(id => {
    const data = getTasks(taskFile);
    const taskToDelete = data.find(task => task.id === parseInt(id));
    if (!taskToDelete) {
      throw new Error('Element with id ' + id + ' does not exist');
    }
    const index = data.findIndex(taskToDelete => taskToDelete.id === parseInt(id));
    data.splice(index, 1);

    rewriteIndexes(data);

    fs.writeFileSync(taskFile, JSON.stringify(data));
    console.log(`Task deleted successfully: ID: ${id}`);
  });

program
  .command('mark-in-progress')
  .description('Update a task status to in progress')
  .argument('<id>', 'id of the task to update')
  .action(id => {
    const data = getTasks(taskFile);
    const taskToUpdate = data.find(task => task.id === parseInt(id));
    if (!taskToUpdate) {
      throw new Error('Element with id ' + id + ' does not exist');
    }
    const index = data.findIndex(taskToUpdate => taskToUpdate.id === parseInt(id));
    const newTaskToUpdate = { ...taskToUpdate, status: 'in-progress' };
    data.splice(index, 1, newTaskToUpdate);
    fs.writeFileSync(taskFile, JSON.stringify(data));
    console.log(`Task status updated successfully to in-progress: ID: ${id}`);
  });

program
  .command('mark-done')
  .description('Update a task status to done')
  .argument('<id>', 'id of the task to update')
  .action(id => {
    const data = getTasks(taskFile);
    const taskToUpdate = data.find(task => task.id === parseInt(id));
    if (!taskToUpdate) {
      throw new Error('Element with id ' + id + ' does not exist');
    }
    const index = data.findIndex(taskToUpdate => taskToUpdate.id === parseInt(id));
    const newTaskToUpdate = { ...taskToUpdate, status: 'done' };
    data.splice(index, 1, newTaskToUpdate);
    fs.writeFileSync(taskFile, JSON.stringify(data));
    console.log(`Task status updated successfully to done: ID: ${id}`);
  });

// if (import.meta.url === `file://${process.argv[1]}`) {
program.parse();
// }
