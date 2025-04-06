export interface Activity{
    title: string;
    description: string;
    genre: string;
    tag: string;
    date: Date;
    image: string;
    language: string;
    price: number[];
    showtimes: Showtime[];
    location: Location;
    createdAt?: Date;
    updatedAt?: Date;
    _id:string
}

export interface Showtime {
    startTime: Date;
    endTime: Date;
  }
  
 export interface Location {
    latitude: number;
    longitude: number;
  }
