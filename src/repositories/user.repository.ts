import { Repository } from "typeorm";
import { UserEntity } from "../entities/postgres/user.entity";

export default class UserRepository {
  private userRepository: Repository<UserEntity>

  constructor(userRepository: Repository<UserEntity>) {
    this.userRepository = userRepository;
  }

}
