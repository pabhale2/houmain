import { formatDate } from '@angular/common';
export class User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  type: string;
  constructor(user) {
    {
      this.firstName = user.firstName || '';
      this.lastName = user.lastName || '';
      this.username = user.username || '';
      this.password = user.password || '';
      this.type = user.type || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
