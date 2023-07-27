import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './User.entity';
import { Notice } from './Notice.entity';

export enum Location {
    seoul = '서울',
    inchoen = '인천',
    daegu = '대구',
    busan = '부산',
    daejeon = '대전',
    gwangsu = '광주',
    ulsan = '울산',
    jeju = '제주',
}

@Entity({ name: 'school' })
export class School {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50, nullable: false, comment: '학교명' })
    name: string;

    @Column({ type: 'enum', enum: Location, nullable: false, comment: '지역' })
    location: Location;

    @OneToOne(() => User, (user) => user.school)
    @JoinColumn()
    user: User;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @OneToMany(() => Notice, (notice) => notice.school, { cascade: true })
    notice: Notice;
}
