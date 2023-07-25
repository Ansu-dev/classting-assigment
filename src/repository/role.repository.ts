import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/models/Role.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RoleRepository {
    constructor(
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {}

    async findOneByName(name: string): Promise<Role | null> {
        return await this.roleRepository.createQueryBuilder('r').where('name = :name', { name }).getOne();
    }
}
