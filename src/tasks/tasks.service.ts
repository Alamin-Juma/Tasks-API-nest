import { Injectable } from '@nestjs/common';

@Injectable() // a singleton to make it sharable across the app 
export class TasksService {
    private tasks = [] //make it private to minimize errors like mutations

    constructor() {}

    getAllTaks() {
        return this.tasks
    }
}
