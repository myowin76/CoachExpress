import { Component, OnInit } from '@angular/core';

import { Company } from '../shared/models/company';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
