import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Category } from 'src/app/services/categories/category';
import { FormService } from 'src/app/services/form/form.service';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { EmployeeService } from 'src/app/services/employee/employee.service';
import { Employee } from 'src/app/services/employee/employee';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public about: FormGroup;
  public coordinator: FormGroup;
  public when: FormGroup;
  public loggedUserId = '3';
  public loggedUser: string;

  public categories: Category[] = [];
  public employees: Employee[]  = [];
  public description_length = 0;
  public today: string;

  public form: FormGroup = this.fb.group({
    about: this.fb.group({
      title: ['', Validators.required],
      description: ['', [
        Validators.maxLength(140),
        Validators.required
      ]],
      category: [''],
      paid_event: [false],
      event_fee: [''],
      reward: ['']
    }),
    coordinator: this.fb.group({
      responsible: [this.loggedUserId, Validators.required],
      email: ['', Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]
    }),
    when: this.fb.group({
      start_date: ['', Validators.required],
      start_time: ['', Validators.required],
      start_time_format: ['AM'],
      duration: ['']
    })
  });

  constructor(
    private fb: FormBuilder,
    private formService: FormService,
    private categoriesService: CategoriesService,
    private employeesService: EmployeeService,
    private router: Router) {}

  onSubmit() {
    const dataForm = this.form.value;
    this.formService.addEvent(dataForm);
    this.router.navigate(['/message']);
  }

  ngOnInit() {
    this.categories = this.categoriesService.getCategories();
    this.employees = this.employeesService.getEmployees();

    this.about = this.form.get('about') as FormGroup;
    this.coordinator = this.form.get('coordinator') as FormGroup;
    this.when = this.form.get('when') as FormGroup;

    this.about.get('paid_event').valueChanges
      .subscribe((isPaid: boolean) => {
        const control = this.about.get('event_fee') as FormControl;
        if (isPaid) {
          control.enable();
          control.setValidators([Validators.required, Validators.min(1)]);
        } else {
          control.clearValidators();
          control.reset();
          control.disable();
        }
    });

    this.loggedUser = this.employees[this.loggedUserId].name + ' ' + this.employees[this.loggedUserId].lastname;

    this.today = new Date().toJSON().split('T')[0];

    this.about.get('description').valueChanges
    .subscribe(value => {
      this.description_length = value.length;
    });
  }

}
