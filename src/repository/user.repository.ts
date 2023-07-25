import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/models/User.entity';
import { SignInRequestDto } from 'src/modules/user/dto/request/signIn.request.dto';
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

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository
            .createQueryBuilder('u')
            .where('email = :email', { email })
            .getOne();
    }
}
