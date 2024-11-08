import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilter } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService) {

    }


    //     Assume a route like /tasks, with optional query parameters:

    // /tasks: Fetches all tasks.
    // /tasks?status=IN_PROGRESS: Fetches tasks with the status IN_PROGRESS.
    // /tasks?search=meeting: Fetches tasks that contain "meeting" in either title or description.
    // /tasks?status=IN_PROGRESS&search=meeting: Fetches tasks with the status IN_PROGRESS and containing "meeting" in title or description.
    // //http://localhost:3000/tasks?status=OPEN
    @Get()
    getTaks(@Query() filterDto: GetTasksFilter): Task[] {
        //if we have any filters defined, calls tasksService.getTasksWithFilters
        // otherwise , just get all tasks
    
        // check if any key filters were passed
        if (Object.keys(filterDto).length) {
            return this.taskService.getTasksWithFilters(filterDto)
        } else {
            return this.taskService.getAllTaks()
        }
    }

    @Get('/:id')
    getSingleTask(@Param('id') id: string) {
        return this.taskService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.taskService.createTask(createTaskDto)
    }


    @Delete('/:id')
    deleteTask(@Param('id') id: string) {
        return this.taskService.deleteTask(id)
    }

    @Patch('/:id/status')
    updateTask(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Task {
        const {status}  = updateTaskStatusDto
        return this.taskService.updateTask(id, status)
    }
}
