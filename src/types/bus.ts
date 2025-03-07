export interface Counter {
  name: string;
  place: string;
  phone: string;
}

export interface Bus {
  id: string;
  name: string;
  image: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  returnDepartureTime: string;
  returnArrivalTime: string;
  type: "AC" | "NON-AC";
  supervisorNumber: string;
  counters: Counter[];
  route: "SHERPUR_TO_DHAKA" | "DHAKA_TO_SHERPUR" | "SHERPUR_TO_OTHER";
}

export type RouteFilter =
  | "SHERPUR_TO_DHAKA"
  | "DHAKA_TO_SHERPUR"
  | "SHERPUR_TO_OTHER"
  | "ALL";
