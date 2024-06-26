import {TASKS} from "./data";
import TaskManager from "./TaskManager";





const taskManager = new TaskManager(TASKS);
taskManager.showStatistics()

taskManager.addTask({
  assignee: 'Nancy',
  title: 'TEST',
  description: 'TEST',
  status: 'open',
  dueDate: new Date(2023, 4, 13)
})

taskManager.showStatistics()
