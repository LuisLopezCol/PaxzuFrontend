import { Component, OnInit } from '@angular/core';
import { VideoGamesService } from 'src/app/services/video-games.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Maintenance } from 'src/app/models/maintenance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  creation: string | null;

  constructor(private VideoGamesService:VideoGamesService, private fb: FormBuilder, private router: Router,  private idRoute: ActivatedRoute) { 
    this.workerForm = this.fb.group({
			nameworker: ['', Validators.required],
			lastnameworker: ['', Validators.required],
		})
    this.creation  = this.idRoute.snapshot.paramMap.get("createDate");
  }
  
  ngOnInit(): void {
    this.updateForm();
    this.getMaintenances();
  }
  
  //--------------------Fetch data from DB--------------------//
  listMainteance: any= [];
  getMaintenances(){
    this.VideoGamesService.getMaintenances().subscribe((MaintenanceDB) => {  
      this.listMainteance = MaintenanceDB;
      console.log(MaintenanceDB);
    }, error =>{
      console.log(error);
    })
  }
  //---Save a data in the DB
  workerForm: FormGroup;
	valorNumerico = /^[0-9]+$/;
	modal_title = 'Create Worker';
  postMaintenance(){
    const MAINTENANCE: Maintenance = {
			name: this.workerForm.get('nameworker')?.value,
			lastname: this.workerForm.get('lastnameworker')?.value
		}
		if(this.creation == null){
			this.VideoGamesService.postMaintenance(MAINTENANCE).subscribe( data => {
				this.router.navigate(['/admin'])
				Swal.fire({
					icon: 'success',
					title: 'Worker added',
					text: 'The worker is now registerd on the database'
				})
			})
		}else{
			this.VideoGamesService.putMaintenance(this.creation, MAINTENANCE).subscribe( data => {
				this.router.navigate(['/admin'])
				Swal.fire({
					icon: 'success',
					title: 'CRUD information updated',
					text: 'The database was updated'
				})
			})
		}
    setTimeout(() => {
      this.getMaintenances();
      this.workerForm.reset();
    }, 2000);

  }
  updateForm(){
    this.creation = this.idRoute.snapshot.paramMap.get("id");
    setTimeout(() => {
      if(this.creation !== null){
        this.modal_title = "Update CRUD";
        this.VideoGamesService.getMaintenance(this.creation).subscribe(data =>{
          this.workerForm.setValue({
            nameworker: data.name,
            lastnameworker: data.lastname,
          })
        })
      }
          console.log(this.creation);

      setTimeout(() => {
        this.getMaintenances();
      }, 2000);
  }, 200);
	}
  triggerModal(){
    this.updateForm();
    setTimeout(() => {
      this.updateForm();
    }, 200);
    this.getMaintenances();
  }
  //---Delete a worker in the DB
  deleteMaintenance(id: any) {
		Swal.fire({
			title: 'Are you sure yo want to delete it?',
			text: "You can not recover the data afterwards",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Yes, delete it!'
		}).then((result: any) => {
			if (result.isConfirmed) {
				this.VideoGamesService.deleteMaintenance(id).subscribe( data => {
					Swal.fire({
						icon: 'success',
  					title: 'Data deleted',
					})
					this.getMaintenances();
				}, error => {
					console.log(error)
				})
			}
		})
	}
}
