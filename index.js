#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
let todos = [];
let nextId = 1;
function displayTodoList() {
    console.clear();
    console.log(chalk.blue('========================='));
    console.log(chalk.blue('        TODO LIST        '));
    console.log(chalk.blue('-------------------------'));
    if (todos.length) {
        todos.forEach(todo => {
            const status = todo.completed ? chalk.green('[✓]') : chalk.red('[ ]');
            console.log(`${status} ${todo.id}. ${todo.task}`);
        });
    }
    else {
        console.log(chalk.yellow('Your Todo list is empty.'));
    }
    console.log(chalk.blue('=========================\n'));
}
function addTodoItem(task) {
    console.clear();
    todos.push({ id: nextId++, task, completed: false });
    console.log(chalk.green('Todo item added successfully!'));
}
function completeTodoItem(id) {
    console.clear();
    const todoIndex = todos.findIndex(item => item.id === id);
    if (todoIndex !== -1) {
        todos[todoIndex].completed = true;
        console.log(chalk.green(`Todo item number ${todoIndex} is marked as completed!`));
    }
    else {
        console.log(chalk.red('Todo item not found!'));
    }
}
console.log(chalk.yellow('Welcome to the Todo List.'));
function main() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: ['View Todo List', 'Add Todo Item', 'Complete Todo Item', 'Exit']
        }
    ]).then(({ choice }) => {
        switch (choice) {
            case 'View Todo List':
                console.clear();
                displayTodoList();
                main();
                break;
            case 'Add Todo Item':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'task',
                        message: 'Enter the task: '
                    }
                ]).then(({ task }) => {
                    console.clear();
                    addTodoItem(task);
                    main();
                });
                break;
            case 'Complete Todo Item':
                displayTodoList();
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'id',
                        message: 'Enter the ID of the todo item to complete: '
                    }
                ]).then(({ id }) => {
                    console.clear();
                    completeTodoItem(parseInt(id));
                    main();
                });
                break;
            case 'Exit':
                console.log(chalk.yellow('Exiting Todo List.'));
                break;
        }
    });
}
main();
