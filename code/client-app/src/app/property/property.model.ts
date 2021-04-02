import { formatDate } from '@angular/common';
export class Property {
  id_property: number;
  property_name:string;
  property_type:string;
  property_description:string;
  address:string;
  city:string;
  state:string;
  country:string;
  zip_code:string;
  unitcount:string;
  hallcount:string;
  bedcount:string;
  gallerycount:string;
  kitchencount:string;
  bathroomcount:string;
  entrygatenum: string;
  toiletcount: string;
  otherInfo: string;


  constructor(property) {
    {
      this.property_name = property.property_name || '';
      this.property_type = property.property_type || '';
      this.property_description = property.property_description || '';
      this.address = property.address || '';
      this.city = property.city || '';
      this.state = property.state || '';
      this.country = property.country || '';
      this.zip_code = property.zip_code || '';
      this.unitcount = property.unitcount || '';
      this.hallcount = property.hallcount || '';
      this.bedcount = property.bedcount || '';
      this.gallerycount = property.gallerycount || '';
      this.kitchencount = property.kitchencount || '';
      this.bathroomcount = property.bathroomcount || '';
      this.toiletcount = property.toiletcount || '';
      this.entrygatenum = property.entrygatenum || '';
      this.otherInfo = property.otherInfo || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
