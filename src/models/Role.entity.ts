import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';

@Entity({ name: 'role' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 30, nullable: false, comment: '권한 이름 (admin / user' })
    name: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToOne(() => User, (user) => user.role)
    user: User;
}
