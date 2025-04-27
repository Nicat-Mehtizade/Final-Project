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
    ageLimit: number,
    location: Location;
    createdAt?: Date;
    updatedAt?: Date;
    _id:string,
    seats:Seat[][],
}

export interface Seat {
  _id: string;
  activityId: string;
  zone: string;
  row: string;
  type:string,
  number: number;
  seatNumber: string;
  price: number;
  isBooked: boolean;
}
export interface SeatBookingProps {
  activityId: string;
  userId: string;
}


export interface Showtime {
    startTime: Date;
    endTime: Date;
  }
  
 export interface Location {
    latitude: number;
    longitude: number;
  }
