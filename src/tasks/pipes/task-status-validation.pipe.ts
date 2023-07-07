import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../task-status.enum';

export class TaskValidationPipe implements PipeTransform {
  readonly allowedStatus = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRES,
    TaskStatus.OPEN,
  ];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isValideStatus(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isValideStatus(status: any) {
    const idx = this.allowedStatus.indexOf(status);
    return idx !== -1;
  }
}
