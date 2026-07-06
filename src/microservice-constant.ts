import { PatternMetadata } from '@nestjs/microservices';

//User
export const USER_SERVICE = 'USER_SERVICE';
export const UserPattern: Record<string, PatternMetadata> = {
  getUserById: {
    method: 'GET',
    path: 'get_user_by_id',
  },
  getUserByUsername: {
    method: 'GET',
    path: 'get_user_by_username',
  },
};
