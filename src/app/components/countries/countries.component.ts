import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/GlobalData';
import { DateWiseData } from 'src/app/models/date-wise-data';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  data: GlobalDataSummary[];
  countries: string[] = [];
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  selectCountryData: DateWiseData[];
  dateWiseData;
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getDatewiseData().subscribe((res) => {
      this.dateWiseData = res;
    });
    this.dataService.getGlobalData().subscribe((result) => {
      this.data = result;
      this.data.forEach((cs) => {
        this.countries.push(cs.country);
      });
    });
  }
  updateValues(country: string) {
    console.log(country);
    this.data.forEach((cs) => {
      if (cs.country == country) {
        console.log(cs.country);
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });
    this.selectCountryData = this.dateWiseData[country];
    console.log(this.selectCountryData);
  }
}
