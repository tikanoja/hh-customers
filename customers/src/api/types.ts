// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// customer Type
export interface Customer {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  streetaddress: string;
  postcode: string;
  city: string;
  _links?: {
    self: {
      href: string;
    };
    [key: string]: {
      href: string;
    };
  };
}

// training Type
export interface Training {
  id?: number;
  date: string;
  activity: string;
  duration: number;
  _links?: {
    self: {
      href: string;
    };
    training: {
      href: string;
    };
    customer: {
      href: string;
    };
  };
}

// training with Customer Info (from /gettrainings)
export interface TrainingWithCustomer {
  id?: number;
  date: string;
  duration: number;
  activity: string;
  customer: Customer;
  _links?: {
    self: {
      href: string;
    };
    [key: string]: {
      href: string;
    };
  };
}
