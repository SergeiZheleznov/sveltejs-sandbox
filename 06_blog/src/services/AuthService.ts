import type { IAuthService } from "src/interfaces";

export class AuthService implements IAuthService {

  public login(): Promise<void> {
    throw new Error("Method not implemented.");
  }
  
  public logout(): Promise<void> {
    throw new Error("Method not implemented.");
  }

}