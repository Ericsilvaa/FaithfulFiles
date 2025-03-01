import { Repository } from "typeorm";
import { User } from "../../entities/users/users.entity";

export default class UserRepository {
  private userRepository: Repository<User>;

  constructor(userRepository: Repository<User>) {
    this.userRepository = userRepository;
  }
}
