import { formatDate } from '@angular/common';
export class Tenants {
    id: number;
    firstName:string;
    lastName:string;
    primaryEmail:string;
    alternateEmail:string;
    mobileNumber:string;
    taxpayerID:string;
    taxIndentityType:string;
  constructor(owners) {
    {
      this.firstName = owners.firstName || '';
      this.lastName = owners.lastName || '';
      this.primaryEmail = owners.primaryEmail || '';
      this.alternateEmail = owners.alternateEmail || '';
      this.mobileNumber = owners.mobileNumber || '';
      this.taxpayerID = owners.taxpayerID || '';
      this.taxIndentityType = owners.taxIndentityType || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
