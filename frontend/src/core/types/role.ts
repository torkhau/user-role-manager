export interface IRole {
  id: string;
  roleName: string;
}

export interface IEffectiveRole extends IRole {
  disabled?: boolean;
}