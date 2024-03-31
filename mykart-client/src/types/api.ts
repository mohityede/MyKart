import { User } from "./types";

export interface MassageResponse {
  success: boolean;
  massage: string;
  data: User;
}

export interface GetUserResponse {
  success: boolean;
  data: User;
}
