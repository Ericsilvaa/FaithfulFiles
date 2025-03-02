import { AppDataSource } from "../../database/dataSource";
import { Member } from "../../entities/users/members.entity";
import { Repository } from "typeorm";
import { User } from "../routes/user.routes";

export class MemberService {
  private memberRepository: Repository<Member>;

  constructor() {
    this.memberRepository = AppDataSource.getRepository(Member);
  }

  async registerMember(userId: string, churchId: string): Promise<Member> {
    const userReference = new User();
    userReference.id = userId;

    const newMember = this.memberRepository.create({
      user: userReference,
      church_id: churchId,
    });

    return this.memberRepository.save(newMember);
  }
}
