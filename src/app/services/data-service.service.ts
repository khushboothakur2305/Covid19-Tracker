import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from 'src/app/models/GlobalData';
import { DateWiseData } from '../models/date-wise-data';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private globalDataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/08-29-2020.csv';
  private datewiseDataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv';
  constructor(private http: HttpClient) {}
  getDatewiseData() {
    return this.http.get(this.datewiseDataUrl, { responseType: 'text' }).pipe(
      map((re) => {
        let rows = re.split('\n');
        let main = {};
        //console.log(rows);
        let header = rows[0];

        let date = header.split(/,(?=\S)/);

        date.splice(0, 4);
        //  console.log(date);
        rows.splice(0, 1);
        rows.forEach((re) => {
          let col = re.split(/,(?=\S)/);
          let con = col[1];
          col.splice(0, 4);

          //console.log(con, col);
          main[con] = [];
          col.forEach((value, index) => {
            let dateWise: DateWiseData = {
              cases: +value,
              country: con,
              date: new Date(Date.parse(date[index])),
            };
            main[con].push(dateWise);
          });
        });

        return main;
      })
    );
  }
  getGlobalData() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        let data: GlobalDataSummary[] = [];
        let raw = {};
        let rows = result.split('\n');
        rows.splice(0, 1);
        rows.forEach((rows) => {
          let cols = rows.split(/,(?=\S)/);
          let cs = {
            country: cols[3],
            confirmed: +cols[7],
            deaths: +cols[8],
            recovered: +cols[9],
            active: +cols[10],
          };
          let temp: GlobalDataSummary = raw[cs.country];
          if (temp) {
            temp.active = cs.active + temp.active;
            temp.confirmed = cs.active + temp.active;
            temp.deaths = cs.active + temp.active;
            temp.recovered = cs.active + temp.active;
            raw[cs.country] = temp;
          } else {
            raw[cs.country] = cs;
          }
        });
        return <GlobalDataSummary[]>Object.values(raw);
      })
    );
  }
}
