import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

    downloadPDF(url: string)  {
        const options = { responseType: 'blob' as 'json' };
       // return this.http.get(url, options).subscribe((result: any)=>{
       //     return new Blob([result.blob()], { type: 'application/pdf' });
       // })

        return this.http.get(url, options).pipe(map(
            (res: any) => {
                return new Blob([res], { type: 'application/pdf' });
            }));
    }
}
