import { formatDate } from '@angular/common';
export class Owners {
    id: number;
    firstName:string;
    lastName:string;
    companyName:string;
    companyStatus:boolean;
    DOB:string
    startDate:string;
    endDate:string;
    primaryEmail:string;
    alternateEmail:string;
    mobileNumber:string;
    homeNumber:string;
    officeNumber:string;
    number:string;
    streetAddress:string;
    city:string;
    state:string;
    zip:string;
    country:string;
    comments:string;
    taxpayerID:string;
    taxIndentityType:string;
  constructor(owners) {
    {
      this.firstName = owners.firstName || '';
      this.lastName = owners.lastName || '';
      this.companyName = owners.companyName || '';
      this.companyStatus = owners.companyStatus || 0;
      this.DOB = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.startDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.endDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.primaryEmail = owners.primaryEmail || '';
      this.alternateEmail = owners.alternateEmail || '';
      this.mobileNumber = owners.mobileNumber || '';
      this.homeNumber = owners.homeNumber || '';
      this.officeNumber = owners.officeNumber || '';
      this.number = owners.number || '';
      this.streetAddress = owners.streetAddress || '';
      this.city = owners.city || '';
      this.state = owners.state || '';
      this.zip = owners.zip || '';
      this.country = owners.country || '';
      this.comments = owners.comments || '';
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
