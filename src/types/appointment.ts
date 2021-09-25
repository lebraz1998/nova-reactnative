export class Appointment {
  status: "wating" | "accpeted" | "rejacted";
  _id: string;
  createDate: number;

  startAppointmentTime: number;

  endAppointmentTime: number;
}
