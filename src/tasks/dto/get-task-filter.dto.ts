import { TaskStatus } from "../task-status.enum";

export class GetTaskWithFilter {
    status: TaskStatus;
    search:string;
}
