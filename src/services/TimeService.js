import TimeSlot from './../models/TimeSlot';
import API from './api';

export default class TimeService{

     static getFirstAvailableDay =  () =>
    {
        return API.get('/api/time/getfirstavaiableday');
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

    static getFullyBookedDays = () =>
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
        return new Promise( (resolve, reject) =>
        {
            const SampleArray = [
                new TimeSlot('09:00 AM', true),
                new TimeSlot('09:15 AM', true),
                new TimeSlot('09:30 AM', true),
                new TimeSlot('10:00 AM', true),
                new TimeSlot('10:15 AM', true),
                new TimeSlot('10:30 AM', true),
                new TimeSlot('11:00 AM', true),
                new TimeSlot('11:15 AM', true),
                new TimeSlot('11:30 AM', true),
                new TimeSlot('12:00 AM', true),
                new TimeSlot('12:15 PM', true),
                new TimeSlot('12:30 PM', false),
                new TimeSlot('01:00 PM', true),
                new TimeSlot('01:15 PM', true),
                new TimeSlot('01:30 PM', true),
                new TimeSlot('02:00 PM', true),
                new TimeSlot('02:15 PM', true),
                new TimeSlot('02:30 PM', true),
                new TimeSlot('03:00 PM', false),
                new TimeSlot('03:15 PM', true),
                new TimeSlot('03:30 PM', true),
                new TimeSlot('04:00 PM', true),
                new TimeSlot('04:15 PM', true),
                new TimeSlot('04:30 PM', false),
                new TimeSlot('05:00 PM', true),
                new TimeSlot('05:15 PM', true),
                new TimeSlot('05:30 PM', true),
                new TimeSlot('05:45 PM', true),
            ];

            setTimeout(() => {
                resolve(SampleArray);
            }, 1000);
        });
    }


}