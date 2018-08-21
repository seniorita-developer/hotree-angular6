import { Injectable } from '@angular/core';
import { Category } from './category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categories: Category[] =  [
    {
      'id': 0,
      'name': 'Cycling'
    },
    {
      'id': 1,
      'name': 'Hiking'
    },
    {
      'id': 2,
      'name': 'Cooking'
    },
    {
      'id': 3,
      'name': 'Rock climbing'
    },
    {
      'id': 4,
      'name': 'Yoga'
    },
    {
      'id': 5,
      'name': 'Fencing'
    },
    {
      'id': 6,
      'name': 'Swimming'
    },
    {
      'id': 7,
      'name': 'Badminton'
    },
    {
      'id': 8,
      'name': 'Running'
    },
    {
      'id': 9,
      'name': 'Dance'
    }
  ];

  constructor() { }

  public getCategories(): Category[] {
    return this.categories;
  }
}
