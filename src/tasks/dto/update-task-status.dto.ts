import { IsEnum } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class UpdateTaskStatusDto {
    //Checks if a given value is the member of the provided enum.
    @IsEnum(TaskStatus)
    status: TaskStatus
}

// passing a not enum of type status reuslts to an error 
// {
//     "message": [
//         "status must be one of the following values: OPEN, IN_PROGRESS, DONE"
//     ],
//     "error": "Bad Request",
//     "statusCode": 400
// }