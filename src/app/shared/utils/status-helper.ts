import { UserRegisterStatus, UserRegisterStatusClasses } from '@shared/enums';

export function getClassByStatus(status: UserRegisterStatus): string
{
  return `badge-light-${UserRegisterStatusClasses[status]}`
}
