import { Component} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EmployeeResponseModel } from '../_models/response/register-employee.response.model';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.page.html',
  styleUrls: ['./admin-panel.page.scss'],
})

export class AdminPanelPage {
  public employees : EmployeeResponseModel[];

  constructor(
    private adminService: AdminService, 
    public alertController: AlertController,
  ) { 
  }

  ngOnInit(){
    this.retriveEmployees();
  }

  errorMessage: any;


  public retriveEmployees(){
    this.adminService.getAllEmployees().subscribe(data =>{
      this.employees = data;
    });
  }

  public banUser(email: string){
    this.adminService.banEmployee(email).subscribe();
  }

  public discardBanEmployee(email: string){
    this.adminService.discardBanEmployee(email).subscribe();
  }

  async discardBanAlert(email: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Do you want to discard ban of user' + email +'?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            return;
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.discardBanEmployee(email);
          }
        }
      ]
    });

    await alert.present();
  }

  async banUserAlert(email: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm',
      message: 'Do you want to ban the user?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            return;
          }
        }, {
          text: 'Confirm',
          handler: () => {
            this.banUser(email);
          }
        }
      ]
    });

    await alert.present();
  }
}
