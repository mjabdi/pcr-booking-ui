
import API from './api';
import axiosRetry from 'axios-retry';

export default class TimeService{

     static getFirstAvailableDate =  () =>
    {
        axiosRetry( API, { retries: 3,  retryDelay: (retryCount) => {
            return retryCount * 1000;
          } });
        return API.get('/api/time/getfirstavaiabledate');
    }

    static getFullyBookedDates = () =>
    {        
        axiosRetry( API, { retries: 3,  retryDelay: (retryCount) => {
            return retryCount * 1000;
          } });
       return API.get('/api/time/getfullybookeddays');
    }

    static getTimeSlots = (date) =>
    {
        axiosRetry( API, { retries: 3,  retryDelay: (retryCount) => {
            return retryCount * 1000;
          } });
        return API.get(`/api/time/gettimeslots?date=${date}`);
    }


}