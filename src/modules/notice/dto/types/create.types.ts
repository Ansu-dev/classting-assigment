import { School } from '../../../../models/School.entity';

export class CreateNoticeType {
    title: string;
    content: string;
    school: School;
}
