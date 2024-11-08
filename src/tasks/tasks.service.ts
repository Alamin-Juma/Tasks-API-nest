import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid'
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';

@Injectable() // a singleton to make it sharable across the app 
export class TasksService {
    private tasks: Task[] = [] //make it private to minimize errors like mutations by outside implementation

    constructor() { }

    getAllTaks(): Task[] {
        return this.tasks
    }

    getTasksWithFilters(filterDto: GetTasksFilter): Task[] {
        const { status, search } = filterDto
        //define a temporary array to hold the result 
        let tasks = this.getAllTaks()
        // do something with status 
        if (status) {
            tasks = tasks.filter((task) => task.status === status)
        }
        // do something woth search
        if (search) {
            tasks = tasks.filter((task) => {
                if (task.title.toLowerCase().includes(search) || task.description.toLowerCase().includes(search)) {
                    return true
                }

                return false
            })
        }
        // return final result 
        return tasks
    }

    getTaskById(id: string): Task {
        //try to get task 
        // if not found throw an error 404 - not found 
        // otherwise return the found task 
        const foundTask = this.tasks.find((task) => task.id === id)
        if(!foundTask) {
            throw new NotFoundException(`Task with ${id} not found`)
        }
        return foundTask
    }

    createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto
        const task = {
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN
        }

        this.tasks.push(task)
        return task
    }

    deleteTask(id: string) {
        const foundTask = this.getTaskById(id)
        const findIndex = this.tasks.findIndex((task) => foundTask.id === id)
        this.tasks.splice(findIndex, 1)

        //this.tasks = this.tasks.filter((task) => task.id !== id)
    }

    updateTask(id: string, status: TaskStatus) {
        const task = this.getTaskById(id)
        task.status = status
        return task
    }



}
