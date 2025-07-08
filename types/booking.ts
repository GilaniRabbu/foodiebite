export interface IBooking {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email?: string;
  };
  mealIds: {
    _id: string;
    title: string;
    price: number;
  }[];
  type?: string;
  total: number;
  status: string;
  reservationDate?: string;
}

export interface IPaginationMeta {
  page: number;
  limit: number;
  total: number;
}

export interface IGenericResponse<T> {
  meta: IPaginationMeta;
  data: T;
}
