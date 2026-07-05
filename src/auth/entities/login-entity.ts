import { userEntity } from '../../users/entities/user-entity';

export interface loginEntity extends userEntity {
  access_token: string;
}
