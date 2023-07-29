import { Role } from '../../../../models/Role.entity';

export class CreateType {
    email: string;
    password: string;
    name: string;
    role: Role;
}
