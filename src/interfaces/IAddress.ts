import { EnumBrazilianStates } from "../utils/enums/AddressEnum";

export interface IAddress {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  complemento?: string;
  uf: EnumBrazilianStates;
  ibge?: string;
  gia?: string;
  ddd?: string;
  siafi?: string;
}