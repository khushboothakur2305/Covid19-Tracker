import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/GlobalData';
import { DateWiseData } from 'src/app/models/date-wise-data';
import { GoogleChartInterface } from 'ng2-google-charts';
import { merge } from 'rxjs';
import { map } from 'rxjs/operators';

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
  lineChart:GoogleChartInterface={
    chartType:'LineChart'
  }
  constructor(private dataService: DataServiceService) {}

  ngOnInit(): void {
    this.dataService.getDatewiseData().subscribe((result) => {
      this.dateWiseData = result;
      this.updateChart();
    });
    this.dataService.getGlobalData().subscribe((result) => {
      this.data = result;
      this.data.forEach((cs) => {
        this.countries.push(cs.country);
      });
    });
  }
  updateChart(){
    let data=[];
    data.push(['Date','Cases'])
    this.selectCountryData.forEach(cs=>{
      data.push([cs.date,cs.cases])
    })
    this.lineChart = {
      chartType: 'LineChart',
      dataTable: data,
      options: {
        height: 500,
        hAxis: {
          title: 'Cases',
        },
        vAxis: {
          minValue: 0,
          title: 'Date',
        },
      },
    };
  }
  updateValues(country: string) {
    console.log(country);
    this.data.forEach((cs) => {
      if(cs.country == country) {
        console.log(cs.country);
        this.totalActive = cs.active;
        this.totalConfirmed = cs.confirmed;
        this.totalDeaths = cs.deaths;
        this.totalRecovered = cs.recovered;
      }
    });
    this.selectCountryData = this.dateWiseData[country];
    this.updateChart();
  }
}
