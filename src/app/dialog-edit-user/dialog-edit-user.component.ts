import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-dialog-edit-user',
  templateUrl: './dialog-edit-user.component.html',
  styleUrls: ['./dialog-edit-user.component.scss']
})
export class DialogEditUserComponent {
  userId!: string;
  user: User = new User();
  loading = false;
  birthDate!: Date;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, private firestore: Firestore) {}

  async updateUser() {
    try {
      const userDocRef = doc(this.firestore, 'users', this.userId);
      const updatedUserData = {
        ...this.user.toJSON(),
      };
      await updateDoc(userDocRef, updatedUserData);
      this.loading = false;
      this.dialogRef.close();
      this.refreshPage();
    } catch (error) {
      console.error('Error updating user:', error);
      this.loading = false;
    }
   
  }
  
  refreshPage() {
    window.location.reload();
  }
}
