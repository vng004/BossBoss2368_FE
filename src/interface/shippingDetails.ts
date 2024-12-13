interface Address {
  province: string;
  district: string;
  ward: string;
  streetAddress: string;
}

export interface ShippingDetails {
  name: string;
  address: Address; 
  phone: string;
  email: string;
}
