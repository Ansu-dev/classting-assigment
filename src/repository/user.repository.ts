import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/User.entity';
import { Repository } from 'typeorm';
import { CreateType } from '../modules/auth/dto/types/create.type';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(body: CreateType): Promise<User> {
        const { email, password, name, role } = body;
        const user = this.userRepository.create();
        user.email = email;
        user.password = password;
        user.name = name;
        user.role = role;
        return this.userRepository.save(user);
    }
    async save(user: User): Promise<User> {
        return await this.userRepository.save(user);
    }

    async findOneById(userId: number): Promise<User | null> {
        return await this.userRepository
            .createQueryBuilder('u')
            .innerJoinAndSelect('u.role', 'r')
            .where('u.id = :userId', { userId })
            .getOne();
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository
            .createQueryBuilder('u')
            .where('email = :email', { email })
            .getOne();
    }
}
