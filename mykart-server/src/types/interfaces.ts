export interface NewUserRequestBody {
  _id: string;
  name: string;
  email: string;
  photo: string;
  gender: string;
  dob: Date;
}

export interface NewProductRequestBody {
  name: string;
  photo: string;
  price: number;
  stock: number;
  category: string;
}

export interface SearchProductRequestQuery {
  search?: string;
  price?: string;
  category?: string;
  sort?: string;
  page?: string;
}
