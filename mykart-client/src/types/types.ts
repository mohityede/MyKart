export type User = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  dob: string;
  role: string;
};

export type Product = {
  _id: string;
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
};
