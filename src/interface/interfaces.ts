
export interface responseServer {
    msg:string,
    token?: string,
    instance?:string,
}
export interface Iuser {
    id:number,
    username: string,
    profileUrl: string|null
    email: string,
    password: string
}
export interface Igallery {
    id:number,
    title:string,
    urlImg:string,
    idCloudinary:string,
}
export interface Ipayload {
    id:number,
    iat:number,
    expr:number;
}