import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { School } from './School.entity';

@Entity({ name: 'notice' })
export class Notice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false, comment: '소식 제목' })
    title: string;

    @Column({ length: 1000, nullable: false, comment: '소식 내용' })
    content: string;

    @Column({ default: true, comment: '활성화 여부' })
    enable: boolean;

    @ManyToOne(() => School, (school) => school.notice, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    @JoinColumn()
    school: School;

    @Column({ type: 'timestamp', default: null })
    deletedAt: Date | null;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
