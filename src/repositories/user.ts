import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';

// @EntityRepository(User)
// export class UserRepository extends Repository<User> {
//     async findByEmail(email: string): Promise<User | undefined> {
//         return this.findOne({ where: { email } });
//     }
// }


@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.findOne({ where: { email } });
        if (!user) {
            return undefined;
        }
        return user;
    }
}
