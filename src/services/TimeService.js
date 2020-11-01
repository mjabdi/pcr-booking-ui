import TimeSlot from './../models/TimeSlot';
import API from './api';

export default class TimeService{

     static getFirstAvailableDate =  () =>
    {
        return API.get('/api/time/getfirstavaiabledate');
    }

    static dayIsBooked =  (date) =>
    {
       /// check if this date is booked or not
       return new Promise( (resolve, reject) =>
       {
            setTimeout(() => {
                resolve(false);
            }, 1000);
       });
    }

    static getFullyBookedDates = () =>
    {
       /// check if this date is booked or not
       return new Promise( (resolve, reject) =>
       {
            var someDate = new Date();
            var duration = 5; //In Days
            someDate.setTime(someDate.getTime() +  (duration * 24 * 60 * 60 * 1000));
            setTimeout(() => {
                resolve([someDate]);
            }, 0);
       });
    }

    static getTimeSlots = (date) =>
    {
        return API.get(`/api/time/gettimeslots?date=${date}`);
    }


}