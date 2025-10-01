import { User } from 'src/database/entities';
import { EffectiveRoleDTO } from './effectiveRole.dto';

export interface UserDTO extends Omit<User, 'password' | 'roles'> {
  roles: Omit<EffectiveRoleDTO, 'disabled'>[];
  effectiveRoles: EffectiveRoleDTO[];
}
