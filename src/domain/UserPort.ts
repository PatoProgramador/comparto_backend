import { User } from "./User";

export interface UserPort {
  createUser(user:Omit<User,"id">, contrasena: string):Promise<string>;
  updateUser(id:string, user:Partial<User>): Promise<boolean>;
  deleteUser(id:string):Promise<User | boolean>;
  getUserById(id:string): Promise<User | null>;
  getUserByEmail(email:string):Promise<User | null>;
  getAllUsers(): Promise<User[]>;
}
