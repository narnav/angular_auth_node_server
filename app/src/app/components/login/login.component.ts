import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  username = 'user';
  password = 'password';
  ngOnInit() {
    // get the returnUrl query parameter
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  login() {
    this.auth.login(this.username, this.password).subscribe((result) => {
      if (result) {
        this.router.navigate(['/products']);
      } else {
        alert('Invalid username or password!');
      }
    });
    // this.auth.login();
    // this.router.navigateByUrl(this.returnUrl);
  }
  logout() {
    this.auth.logout();
  }
}
