import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { School } from './School.entity';
import { User } from './User.entity';

@Entity({ name: 'subscribe' })
export class Subscribe {
    @PrimaryColumn()
    schoolId: number;

    @PrimaryColumn()
    userId: number;

    @ManyToOne(() => School, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    school: School;

    @ManyToOne(() => User, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
    user: User;

    @Column({ default: true, comment: '구독여부(최초 구독시 생성, 구독을 취소해도 삭제되지 않음' })
    subscribe: boolean;

    @Column({ type: 'timestamp', nullable: true, comment: '구독시작 시간, 취소후 새로 구독하면 갱신됨' })
    subscribeDate: Date;

    @Column({ type: 'timestamp', nullable: true, comment: '구독취소 시간, 취소하지않았다면 null' })
    unsubscribeDate: Date | null;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
