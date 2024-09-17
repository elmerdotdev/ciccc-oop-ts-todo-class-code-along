// Class todo item
class Todo {
  constructor(description) {
    this.description = description
    this.isComplete = false
  }

  toggleComplete() {
    this.isComplete = !this.isComplete
  }
}

// Class TodoList
class TodoList {
  constructor() {
    this.tasks = []

    // Bind DOM elements
    this.taskListElement = document.querySelector('#task-list')
    this.addTaskButton = document.querySelector('#add-task-btn')
    this.taskInput = document.querySelector('#task-input')

    // Bind the event listener
    this.addTaskButton.addEventListener('click', () => this.addTask())
  }

  addTask() {
    const description = this.taskInput.value.trim() // trim removes spaces at the beginning and end of the input value
    if (description) {
      const task = new Todo(description)
      this.tasks.push(task)
      this.render() // Render the list to the DOM
      this.taskInput.value = ''
    }
  }

  completeTask(index) {
    if (this.tasks[index]) {
      this.tasks[index].toggleComplete()
      this.render() // Rebuild the todo list after marking task as complete
    }
  }

  removeTask(index) {
    if (this.tasks[index]) {
      this.tasks.splice(index, 1)
      this.render() // Rebuilt the todo list after removing task
    }
  }

  render() {
    // Clear todo list
    this.taskListElement.innerHTML = ''

    // Render each todo item
    this.tasks.forEach((task, index) => {
      const li = document.createElement('li')
      const span = document.createElement('span')
      span.textContent = task.description
      li.className = task.isComplete ? 'completed' : ''

      // Complete button
      const completeBtn = document.createElement('button')
      completeBtn.textContent = task.isComplete ? 'Undo' : 'Complete'
      completeBtn.addEventListener('click', () => this.completeTask(index))

      // Remove button
      const removeBtn = document.createElement('button')
      removeBtn.textContent = 'Remove'
      removeBtn.addEventListener('click', () => this.removeTask(index))

      // Add elements to li
      li.appendChild(span)
      li.appendChild(completeBtn)
      li.appendChild(removeBtn)

      // Append li to task list ul
      this.taskListElement.prepend(li)
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const myTodoList = new TodoList()
})