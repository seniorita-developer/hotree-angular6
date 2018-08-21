import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  public addEvent(data): void {

    const durationInSec = Number(data.when.duration) * 60 * 60;

    let format24H = data.when.start_time;
    if (data.when.start_time_format === 'PM') {
      const hours = (Number(data.when.start_time.match(/^(\d+)/)[1]) + 12).toString();
      const minutes = data.when.start_time.match(/:(\d+)/)[1];
      format24H = (hours + ':' + minutes).toString();
    }

    const date = data.when.start_date + 'T' + format24H;
    const event = {
      title: data.about.title,
      description: data.about.description,
      category_id: Number(data.about.category),
      paid_event: Boolean(data.about.paid_event),
      event_fee: Number(data.about.event_fee),
      reward: Number(data.about.reward),
      date: date,
      duration: durationInSec,
      coordinator: {
        email: data.coordinator.email,
        id: data.coordinator.responsible,
      }
    };
    console.log(event);
  }
}

