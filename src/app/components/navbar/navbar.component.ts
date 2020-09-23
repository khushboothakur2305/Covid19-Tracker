import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private http: HttpClient) {}
  aray: any[] = [];
  ngOnInit(): void {
    // let header = new HttpHeaders({
    //   "x-rapidapi-host": "livescore6.p.rapidapi.com",
    //   "x-rapidapi-key": "0afffbcfb4msh151e32a1bd8a873p133d65jsn392ba09aba88",
    //   useQueryString: "true"
    // });
    // this.http
    //   .get(
    //     "https://livescore6.p.rapidapi.com/news/list?category=cricket",
    //     {
    //       headers: header,
    //     }
    //   )
    //   .subscribe((re) => {
    //     console.log(re);
    //   },ree=>{
    //     console.log(ree);

    //   });
  }
}
