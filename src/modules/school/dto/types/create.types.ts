import { Location } from 'src/models/School.entity';
import { User } from 'src/models/User.entity';

export class CreateSchoolPageType {
    location: Location;
    name: string;
    user: User;
}
