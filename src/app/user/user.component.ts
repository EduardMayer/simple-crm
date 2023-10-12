import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TooltipPosition } from '@angular/material/tooltip';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from 'src/models/user.class';
import { Firestore, collection, onSnapshot,} from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  user = new User();
  allUsers: any[] = [];

  positionOptions: TooltipPosition[] = ['after', 'before', 'above', 'below', 'left', 'right'];
  position = new FormControl(this.positionOptions[2]);

  constructor(public dialog: MatDialog, private firestore: Firestore) {}

  ngOnInit(): void {
    onSnapshot(collection(this.firestore, 'users'), changes => {
      console.log('Received changes from DB', changes);
      this.allUsers = changes.docs.map(doc => ({ userId: doc.id, ...doc.data() }));
      console.log('All Users:', this.allUsers); // Log the allUsers array with IDs to console
    });
  }

  openDialog(): void {
    this.dialog.open(DialogAddUserComponent);
  }

}