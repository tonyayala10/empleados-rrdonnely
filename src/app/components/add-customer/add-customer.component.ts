import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import swal from 'sweetalert2';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styles: []
})
export class AddCustomerComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private service: CustomerService, private datePipe: DatePipe) { }

  addForm: FormGroup;

  ngOnInit() {

    var ddMMyyyy = this.datePipe.transform(new Date(),"dd/MM/yyyy");
    console.log(ddMMyyyy); //output - 14-02-2019

    this.addForm = this.formBuilder.group({
      empleadoId: [],
      primerNombre: ['', [Validators.required]],
      segundoNombre: [''],
      primerApellido: ['', [Validators.required]],
      segundoApellido: [''],
      apellidoCasada: [''],
      correo: ['', [Validators.required]],
      telefono: [''],
      celular: [''],
      fechaIngreso: [ddMMyyyy, [Validators.required]],
      activo: ['', [Validators.required]],
      comentario: ['']
    });
  }

  onSubmit() {
    let obj = this.addForm.value;

    if(obj.primerNombre === "" || obj.primerApellido === "" || obj.correo === "" || obj.activo === "")
    return swal.fire({position: 'top',
                type: 'error',
                text:  'Debe completar los siguientes campos para poder guardar la información: Primer Nombre, Primer Apellido, Correo Electrónico, Activo'
            });
                this.service.createCustomer( this.addForm.value )
      .subscribe(data => {
        this.router.navigate(['list-customer']);
        swal.fire({
          position: 'top',
          type: 'success',
          text:  'Registro creado con éxito',
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

}