import { Component, OnInit } from '@angular/core';
import { Empleados } from '../../model/empleados';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import {first} from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styles: []
})
export class EditCustomerComponent implements OnInit {

  customer: Empleados;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private service: CustomerService) { }

  ngOnInit() {

    const customerId = localStorage.getItem('editCustomerId');

    if ( !customerId ) {
      alert('Acci&oacute;n inv&aacute;lida');
      this.router.navigate(['list-customer']);
      return;
    }

    this.editForm = this.formBuilder.group({
      empleadoId: [],
      primerNombre: ['', Validators.required],
      segundoNombre: [''],
      primerApellido: ['', Validators.required],
      segundoApellido: [''],
      apellidoCasada: [''],
      correo: ['', Validators.required],
      telefono: [''],
      celular: [''],
      fechaIngreso: ['', Validators.required],
      activo: ['', Validators.required],
      comentario: ['']
    });

    this.service.getCustomer(+customerId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.service.updateCustomer(this.editForm.value)
      .pipe(first())
      .subscribe( data => {
        this.router.navigate(['list-customer']);
        swal.fire({
          position: 'top',
          type: 'success',
          text: `Registro modificado con éxito`,
          showConfirmButton: false,
          timer: 1500
        });
      },
      error => {
        alert(error);
      });
  }

}