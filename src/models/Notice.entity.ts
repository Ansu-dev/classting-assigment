import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'notice' })
export class Notice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 100, nullable: false, comment: '소식 제목' })
    title: string;

    @Column({ length: 1000, nullable: false, comment: '소식 내용' })
    content: string;

    @Column({ default: false, comment: '활성화 여부' })
    enable: boolean;

    @Column({ type: 'timestamp' })
    deletedAt: Date | null;
}
