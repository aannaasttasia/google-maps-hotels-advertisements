export interface MarkerType{
    id: number,
    title: string,
    imgUrl: string,
    price: number,
    position:{
        lat: number,
        lng: number
    }
}

export interface CoordinatesType{
    lat: number,
    lng: number
}