import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeatService {
  private totalSeats: number = 80; // Total seats
  private bookedSeats: boolean[] = new Array(this.totalSeats).fill(false); // All seats are initially free

  // Get available seats
  getSeats(): boolean[] {
    return this.bookedSeats;
  }

  // Reserve seats logic
  reserveSeats(count: number): number[] {
    if (count < 1 || count > 7) return []; // Invalid count
    const booked: number[] = [];

    // First, try to book in a single row
    for (let i = 0; i < this.totalSeats; i += 7) {
      if (this.canBookInRow(i, count)) {
        for (let j = 0; j < count; j++) {
          this.bookedSeats[i + j] = true; // Mark as booked
          booked.push(i + j + 1); // Store seat number (1-based index)
        }
        return booked; // Seats booked
      }
    }

    // If not enough seats in a single row, book nearby seats
    for (let i = 0; i < this.totalSeats; i++) {
      if (!this.bookedSeats[i] && booked.length < count) {
        this.bookedSeats[i] = true; // Mark as booked
        booked.push(i + 1); // Store seat number (1-based index)
      }
    }

    return booked.length === count ? booked : []; // Return booked seats or empty if not successful
  }

  // Check if we can book in a specific row
  private canBookInRow(startIndex: number, count: number): boolean {
    let available = 0;
    for (let j = 0; j < 7 && startIndex + j < this.totalSeats; j++) {
      if (!this.bookedSeats[startIndex + j]) {
        available++;
      } else {
        break; // Stop counting when a booked seat is found
      }
    }
    return available >= count; // Enough available seats in this row
  }
}
