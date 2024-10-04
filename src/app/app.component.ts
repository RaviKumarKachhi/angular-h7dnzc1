import { Component } from '@angular/core';
import { SeatService } from './seat.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular';
  seats: boolean[] = [];
  bookedSeats: number[] = [];
  seatCount: number = 0;

  constructor(private seatService: SeatService) {
    this.seats = this.seatService.getSeats();
  }

  reserveSeats() {
    this.bookedSeats = this.seatService.reserveSeats(this.seatCount);
    if (this.bookedSeats.length === 0) {
      alert('Not enough seats available or invalid seat count.');
    } else {
      this.seats = this.seatService.getSeats(); // Update seat status
    }
  }
}

// import { Component } from '@angular/core';
// import { SeatService } from './seat.service';

// @Component({
//   selector: 'my-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css'],
// })
// export class AppComponent {
//   name = 'Angular';
//   seats: boolean[] = [];
//   bookedSeats: number[] = [];
//   seatCount: number = 0;

//   constructor(private seatService: SeatService) {
//     this.seats = this.seatService.getSeats();
//   }

//   // Handle reservation on user input
//   reserveSeats() {
//     this.bookedSeats = this.seatService.reserveSeats(this.seatCount);
//     if (this.bookedSeats.length === 0) {
//       alert('Not enough seats available or invalid seat count.');
//     } else {
//       this.seats = this.seatService.getSeats(); // Update seat status
//     }
//   }
// }
