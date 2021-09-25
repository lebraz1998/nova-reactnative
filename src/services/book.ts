import axios from 'axios';
import {Appointment} from '../types/appointment';
import {Book} from '../types/book';

export default class DashboardServices {
  constructor() {
    axios.defaults.withCredentials = true;
  }
  async getAppointment(): Promise<{
    statusCode: number;
    result: Array<Appointment>;
  }> {
    return await (
      await axios.get('http://192.168.0.100:3000/api/appointment')
    ).data;
  }
  async getBook(): Promise<{statusCode: number; result: Array<Book>}> {
    return await (
      await axios.get('http://192.168.0.100:3000/api/book/user')
    ).data;
  }
  async addBook(body: {
    startAppointmentTime: number;
    endAppointmentTime: number;
  }): Promise<{statusCode: number; result: Book}> {
    return await (
      await axios.post('http://192.168.0.100:3000/api/book', body)
    ).data;
  }
  async deleteBook(_id: string): Promise<{statusCode: number; result: Book}> {
    return await (
      await axios.delete('http://192.168.0.100:3000/api/book/' + _id)
    ).data;
  }
  async addAppointment(args: {
    id: string;
    admin: string;
    price: number;
    startAppointmentTime: number;
    endAppointmentTime: number;
    title: string;
  }): Promise<{
    statusCode: number;
    result: Appointment;
  }> {
    return await (
      await axios.post('http://192.168.0.100:3000/api/appointment', args)
    ).data;
  }
}
