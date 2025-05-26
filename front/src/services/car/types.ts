export interface CreateCar {
    model: string,
    brand: string,
    year: number,
    price: number,
    gearbox: string,
    color: string,
    manufacture: string,
    images: File[]
}

export interface Car {
    id: string,
    model: string,
    brand: string,
    year: number,
    price: number,
    gearbox: string,
    color: string,
    manufacture: string,
    images: string[]
}

export interface ListResponse {
    cars: Car[];
    totalCount: number;
    page: number;
    pageCount: number;
}

export interface ListParams {
    page: number;
    pageSize: number;
    manufacture: ""
}