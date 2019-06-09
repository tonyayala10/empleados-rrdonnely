import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../model/empleados';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styles: []
})
export class ListCustomerComponent implements OnInit {
  customers: Empleados[];

  constructor(private router: Router, private service: CustomerService) {}

  ngOnInit() {
    this.service.getCustomers().subscribe(data => (this.customers = data));
  }

  deleteCustomer(customer: Empleados): void {
    swal.fire({
      text: `¿Seguro que desea eliminar el registro ${customer.primerNombre} ${customer.primerApellido}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this.service.deleteCustomer(customer.empleadoId).subscribe(data => {
          this.customers = this.customers.filter(c => c !== customer);
        });

        swal.fire('', 'El registro ha sido eliminado', 'success');
      }
    });
  }

  editCustomer(customer: Empleados): void {
    localStorage.removeItem('editCustomerId');
    localStorage.setItem('editCustomerId', customer.empleadoId.toString());
    this.router.navigate(['edit-customer']);
  }

  addCustomer(): void {
    this.router.navigate(['add-customer']);
  }
}