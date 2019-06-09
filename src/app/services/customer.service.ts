import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Empleados } from '../model/empleados';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseUrl = 'https://test-rrdonnelly.herokuapp.com/empleado/';
  //private baseUrl = 'http://localhost:8080/empleado/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor( private http: HttpClient ) {
    console.log('Servicio Customer Funcionando');
  }

  getCustomers(): Observable<any[]> {
    return this.http.get(this.baseUrl).pipe(
      map(
        data =>data['content'] as Empleados[]
        )
    );
  }

  getCustomer(id: number): Observable<any[]> {
    return this.http.get(this.baseUrl + id).pipe(
      map(
        data =>data['content'] as Empleados[]
        )
    );
  }

  createCustomer(customer: Empleados): Observable<Empleados> {
    return this.http.post<Empleados>(this.baseUrl, customer, {headers: this.httpHeaders});
  }

  updateCustomer(customer: Empleados): Observable<Empleados> {
    return this.http.put<Empleados>(this.baseUrl, customer, {headers: this.httpHeaders});
  }

  deleteCustomer(id: number): Observable<Empleados> {
    return this.http.delete<Empleados>(`${this.baseUrl}${id}`, {headers: this.httpHeaders});
  }
}