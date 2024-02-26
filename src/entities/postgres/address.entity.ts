import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumBrazilianStates } from "../../utils/AddressEnum";

@Entity()
export default class AddressEntity {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column()
  cep: string;
  @Column()
  logradouro: string;
  @Column()
  bairro: string;
  @Column()
  localidade: string;
  @Column({ nullable: true })
  complemento?: string;
  @Column({ nullable: true })
  uf: EnumBrazilianStates;
  @Column({ nullable: true })
  ibge?: string;
  @Column({ nullable: true })
  gia?: string;
  @Column({ nullable: true })
  ddd?: string;
  @Column({ nullable: true })
  siafi?: string;

  constructor(cep: string, logradouro: string, bairro: string, localidade: string, uf: EnumBrazilianStates) {
    this.cep = cep
    this.logradouro = logradouro
    this.bairro = bairro
    this.localidade = localidade
    this.uf = uf
  }
}
