import API from './api';

export default class BookService {

    static bookAppointment = (payload) =>
    {
       return API.post('/api/book/bookappointment', payload);
    }

}