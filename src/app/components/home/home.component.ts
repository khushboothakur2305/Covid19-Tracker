import { Component, OnInit } from '@angular/core';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GlobalDataSummary } from 'src/app/models/GlobalData';
import { GoogleChartInterface } from 'ng2-google-charts';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
   pie:boolean=null;
   column:boolean=null;
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };
  columnChart: GoogleChartInterface = {
    chartType: 'ColumnChart',
  };
  constructor(private dataService: DataServiceService) {}
  initChart(caseType: string) {
    let data = [];
    data.push(['Country', 'Cases']);

    this.globalData.forEach((cs) => {
      let value: number;
      if (caseType == 'con') {
        if (cs.confirmed > 0) {
          value = cs.confirmed;
        }
      }
      if (caseType == 'dea') {
        if (cs.deaths > 0) {
          value = cs.deaths;
        }
      }
      if (caseType == 'rec') {
        if (cs.recovered > 0) {
          value = cs.recovered;
        }
      }
      if (caseType == 'act') {
        if (cs.active > 0) {
          value = cs.active;
        }
      }
      data.push([cs.country, value]);
    });
    console.log(data);
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: data,
      options: {
        height: 500,
      },
    };
    this.columnChart = {
      chartType: 'ColumnChart',
      dataTable: data,
      options: {
        height: 500,
        hAxis: {
          title: 'Cases',
        },
        vAxis: {
          minValue: 0,
          title: 'Country',
        },
      },
    };
  }
  ngOnInit() {
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        console.log(result);
        this.globalData = result;
        result.forEach((cs) => {
          if (!Number.isNaN(cs.confirmed)) {
            this.totalActive += cs.active;
            this.totalConfirmed += cs.confirmed;
            this.totalDeaths += cs.deaths;
            this.totalRecovered += cs.recovered;
          }
        });

        this.initChart('con');
      },
    });
  }
      onpie(){
        this.pie=true;
        this.column=false;
      }
    oncolumn(){
      this.pie=false;
      this.column=true;
    }
  updateChart(input: HTMLInputElement) {
    console.log(input.value);
    this.initChart(input.value);
  }
}
