import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    create(): User {
        return this.userRepository.create();
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
}
