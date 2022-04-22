const TODO_LIST_ID = 'TODO_LIST_ID';
const TODO_ID = 'TODO_ID';

const generateTodoListId = () => {
  let id = +localStorage.getItem(TODO_LIST_ID) || 0;
  id++;
  localStorage.setItem(TODO_LIST_ID, id);

  return id;
}

const generateTodoId = () => {
  let id = +localStorage.getItem(TODO_ID) || 0;
  id++;
  localStorage.setItem(TODO_ID, id);

  return id;
}

const TodoRepository = {
  async getTodos() {
    const maxTodoId = +localStorage.getItem(TODO_ID) || 0;
    const todos = {};

    for (let i = maxTodoId; i > 0 ; i--) {
      const todoJson = localStorage.getItem(`${TODO_ID}-${i}`);
      if (todoJson) {
        const todo = JSON.parse(todoJson);
        if (todos[todo.todoListId]) {
          todos[todo.todoListId].push(todo);
        } else {
          todos[todo.todoListId] = [todo];
        }
      }
    }
    return todos;
  },

  async getLists() {
    const lists = [];
    const maxListId = +localStorage.getItem(TODO_LIST_ID) || 0;
    const todos = await this.getTodos();
    for (let i = 1; i <= maxListId; i++) {
      const todoListJson = localStorage.getItem(`${TODO_LIST_ID}-${i}`);
      if (todoListJson) {
        const todoList = JSON.parse(todoListJson);
        todoList.todos = todos[todoList.id] || [];
        lists.push(todoList);
      }
    }
    return lists;
  },

  async addList({ name }) {
    const id = generateTodoListId();
    const newTodoList = {
      id,
      name
    }
    localStorage.setItem(`${TODO_LIST_ID}-${id}`, JSON.stringify(newTodoList));
    return newTodoList;
  },

  async deleteList(id) {
    localStorage.removeItem(`${TODO_LIST_ID}-${id}`);
  },

  async addTodo({ todoListId, content }) {
    const id = generateTodoId();
    const todo = {
      id,
      todoListId: todoListId,
      content,
      isComplete: false
    }

    localStorage.setItem(`${TODO_ID}-${id}`, JSON.stringify(todo));

    return todo;
  },

  async getTodoById(id) {
    const todoJson = localStorage.getItem(`${TODO_ID}-${id}`);
    if (!todoJson) {
      throw new Error('TODO does not exist!'); // TODO handle error
    }

    return JSON.parse(todoJson);
  },

  async changeTodoState(id, isComplete) {
    const todo = await this.getTodoById(id);
    todo.isComplete = isComplete;
    localStorage.setItem(`${TODO_ID}-${id}`, JSON.stringify(todo));
    return todo;
  },

  async saveTodoContent(id, content) {
    if (content) {
      const todo = await this.getTodoById(id);
      todo.content = content;
      localStorage.setItem(`${TODO_ID}-${id}`, JSON.stringify(todo));
      return todo;
    } else {
      localStorage.removeItem(`${TODO_ID}-${id}`);
      return null;
    }
  }
}

export default TodoRepository;
