import { UserPort } from "../domain/UserPort";
import { User } from "../domain/User";

export class UserApplicationService{
  private port: UserPort;
  constructor(port:UserPort){
    this.port = port;
  }
  async createUser(user: Omit<User, "id">, contrasena: string): Promise<string> {
    const existingUser = await this.port.getUserByEmail(user.email);
    if(!existingUser){
      return this.port.createUser(user, contrasena);
    }
    throw new Error("User already exists");
  }

  async getUserById(id:string): Promise<User | null>{
    return await this.port.getUserById(id);
  }

  async getUserByEmail(email:string): Promise<User | null>{
    return await this.port.getUserByEmail(email);
  }

  async getAllUsers(): Promise <User[]>{
    return await this.port.getAllUsers();
  }
  async updateUser(id:string, user:Partial<User>):Promise<boolean>{
    const existingUser = await this.port.getUserById(id);
    if(!existingUser){
      throw new Error("User not found");
    }
    if(user.email){
      const emailTaken = await this.port.getUserByEmail(user.email);
      if(emailTaken && emailTaken.id_usuario !== id){
        throw new Error("Email already taken");
      }
    }
    return await this.port.updateUser(id,user);
  }

  async deleteUser(id: string): Promise<boolean> {
    const existingUser = await this.port.getUserById(id);
    if(!existingUser){
      throw new Error("User not found");
    }
    const deletedUser = await this.port.deleteUser(id);
    return deletedUser !== null;
  }
}
