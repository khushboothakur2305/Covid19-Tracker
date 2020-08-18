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
  totalConfirmed = 0;
  totalActive = 0;
  totalDeaths = 0;
  totalRecovered = 0;
  globalData: GlobalDataSummary[];
  pieChart: GoogleChartInterface = {
    chartType: 'PieChart',
  };

  constructor(private dataService: DataServiceService) {}
  initChart() {
    let datatable = [];
    datatable.push(['Country', 'Cases']);
    this.globalData.forEach((cs) => {
      datatable.push([cs.country, cs.confirmed]);
    });
    console.log(datatable);
    this.pieChart = {
      chartType: 'PieChart',
      dataTable: datatable,
      options: { 'Country': 'Cases' },
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
        this.initChart();
      },
    });
  }
}
