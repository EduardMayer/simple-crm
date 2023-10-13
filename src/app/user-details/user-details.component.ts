import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  userId!: string | null;
  user: User = new User(); 
  trigger: any;

  constructor(private route: ActivatedRoute, private firestore: Firestore) {}

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log('ID IS ', this.userId);

    if (this.userId) {
      this.getUser(this.userId);
    }
  }

  getUser(userId: string) {
    const userDocRef = doc(this.firestore, 'users', userId);
  
    getDoc(userDocRef)
      .then((docSnapshot) => {
        const userData = docSnapshot.exists() ? { userId: docSnapshot.id, ...docSnapshot.data() } : null;
        if (userData) {
          this.user = new User(userData);
          console.log('User Data:', this.user);
        }
      })
  }

  editUserDetail(){
  }

  editMenu(){
  }
}