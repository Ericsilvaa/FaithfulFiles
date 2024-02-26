export type RepositoryString = 'Book' | 'UserEntity' | 'Author' | 'AddressEntity' | 'Publisher' | 'Role' | 'Permissions'

export type RepositoryStringType = {
  Book: 'Book',
  UserEntity: 'UserEntity',
  Author: 'Author',
  AddressEntity: 'AddressEntity',
  Publisher: 'Publisher',
  Role: 'Role',
  Permissions: 'Permissions'
}

export type RepositoryStringT = keyof RepositoryStringType;