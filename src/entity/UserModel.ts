export interface UserApiResponse {
  created_at: string;
  id_user: number;
  lastaccess_at: string;
  lastinteraction_at: string;
  user_login: string;
}

export type User = {
  id: number;
  userLogin: string;
  createdAt: Date;
  lastAccessAt: Date;
  lastInteractionAt: Date;
};

export const mapResponseToUser = (data: UserApiResponse): User => {
  return {
    id: data.id_user,
    userLogin: data.user_login,
    createdAt: new Date(data.created_at),
    lastAccessAt: new Date(data.lastaccess_at),
    lastInteractionAt: new Date(data.lastinteraction_at),
  };
};
