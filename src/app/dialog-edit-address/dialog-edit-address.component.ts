import { Component, OnInit} from '@angular/core';
import { User } from 'src/models/user.class';
import { Firestore, doc, updateDoc} from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent implements OnInit {
  user: User = new User();
  userId!: any;
  loading = false;
  allUsers: any[] = [];

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: Firestore) {}

  ngOnInit(): void {
  }

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
