import { IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskStatus } from "../tasks.model";

export class GetTasksFilter {
    //instead of using ? for optional, yet at run time TS is unavailable, use IsOptional() Checks if value is missing and if so, ignores all validators.
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}