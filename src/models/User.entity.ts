import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Role } from './Role.entity';
import { School } from './School.entity';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, unique: true, comment: '가입한 이메일' })
    email: string;

    @Column({ length: 255, nullable: false, comment: '비밀번호' })
    password: string;

    @Column({ length: 50, nullable: false, comment: '이름' })
    name: string;

    @OneToOne(() => Role, (role) => role.user)
    @JoinColumn()
    role: Role;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToOne(() => School, (school) => school.user)
    school: School;
}
