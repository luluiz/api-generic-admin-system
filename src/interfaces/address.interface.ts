export interface Address extends Document {
    street: string;
    complement: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;
    latitude: number;
    longitude: number;
}