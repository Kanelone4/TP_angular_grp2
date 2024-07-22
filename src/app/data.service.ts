import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface UserData {
  id:number;
  username: string;
  userStatus: string;
  paymentStatus: string;
  amount: any;
  email: string;
  menu:any;
  selected?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private data: UserData[] = [
    { id: 1, username: 'John Doe', userStatus: 'Active', paymentStatus: 'Paid', amount: 100, email: 'john.doe@gmail.com', menu: '' },
    { id: 2, username: 'Jane Doe', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 200, email: 'jane.doe@gmail.com', menu: '' },
    { id: 3, username: 'Alice Smith', userStatus: 'Active', paymentStatus: 'Paid', amount: 150, email: 'alice.smith@gmail.com', menu: '' },
    { id: 4, username: 'Max Steel', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 650, email: 'max.steel@gmail.com', menu: '' },
    { id: 5, username: 'Yves Jayson', userStatus: 'Active', paymentStatus: 'Paid', amount: 150, email: 'yves.jayson@gmail.com', menu: '' },
    { id: 6, username: 'Henry Berne', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 300, email: 'henry.berne@gmail.com', menu: '' },
    { id: 7, username: 'Matys Ange', userStatus: 'Active', paymentStatus: 'Paid', amount: 250, email: 'matys.ange@gmail.com', menu: '' },
    { id: 8, username: 'Laura Green', userStatus: 'Active', paymentStatus: 'Paid', amount: 120, email: 'laura.green@gmail.com', menu: '' },
    { id: 9, username: 'Robert Brown', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 175, email: 'robert.brown@gmail.com', menu: '' },
    { id: 10, username: 'Olivia Johnson', userStatus: 'Active', paymentStatus: 'Paid', amount: 300, email: 'olivia.johnson@gmail.com', menu: '' },
    { id: 11, username: 'James Wilson', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 220, email: 'james.wilson@gmail.com', menu: '' },
    { id: 12, username: 'Sophia Lee', userStatus: 'Active', paymentStatus: 'Paid', amount: 180, email: 'sophia.lee@gmail.com', menu: '' },
    { id: 13, username: 'Liam White', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 160, email: 'liam.white@gmail.com', menu: '' },
    { id: 14, username: 'Isabella Taylor', userStatus: 'Active', paymentStatus: 'Paid', amount: 210, email: 'isabella.taylor@gmail.com', menu: '' },
    { id: 15, username: 'William Harris', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 275, email: 'william.harris@gmail.com', menu: '' },
    { id: 16, username: 'Mia Anderson', userStatus: 'Active', paymentStatus: 'Paid', amount: 300, email: 'mia.anderson@gmail.com', menu: '' },
    { id: 17, username: 'Noah Martinez', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 140, email: 'noah.martinez@gmail.com', menu: '' },
    { id: 18, username: 'Ava Thomas', userStatus: 'Active', paymentStatus: 'Paid', amount: 230, email: 'ava.thomas@gmail.com', menu: '' },
    { id: 19, username: 'Ethan Jackson', userStatus: 'Inactive', paymentStatus: 'Paid', amount: 190, email: 'ethan.jackson@gmail.com', menu: '' },
    { id: 20, username: 'Charlotte Moore', userStatus: 'Active', paymentStatus: 'Paid', amount: 210, email: 'charlotte.moore@gmail.com', menu: '' },
];


  constructor() {}

  getData(): Observable<UserData[]> {
    return of(this.data);
  }
}
