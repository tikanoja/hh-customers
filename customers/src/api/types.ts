// HTTP methods
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// customer Type
export interface Customer {
  firstname: string;
  lastname: string;
  streetaddress: string;
  postcode: string;
  city: string;
  email: string;
  phone: string;
  _links: {
    self: { href: string };
    customer: { href: string };
    trainings: { href: string };
  };
}

// training Type
export interface Training {
  date: string;
  duration: number; // in minutes
  activity: string;
  _links: {
    self: { href: string };
    training: { href: string };
    customer: { href: string };
  };
}

// training with Customer Info (from /gettrainings)
export interface TrainingWithCustomer {
  id: number;
  date: string;
  duration: number;
  activity: string;
  customer: {
    id: number;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
  };
}
