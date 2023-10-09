import { Component, inject} from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent {
  firestore: Firestore = inject(Firestore);
  user = new User();
  birthDate!: Date;
  loading = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { };

  addUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    console.log('Add user', this.user);
    // Add the user to the 'users' collection in Firestore
    addDoc(collection(this.firestore, 'users'), this.user.toJSON())
      .then((result: any) => {
        this.loading = false;
        console.log('Adding user finished', result);
        this.dialogRef.close();
      });
  }
}
