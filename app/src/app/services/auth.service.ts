import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoged = new BehaviorSubject<boolean>(false);
  private readonly apiUrl = 'http://localhost:3005/api';
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<boolean> {
    // Perform login logic here
    // 127.0.0.1:3005/api/login
    // {
    //   "username":"user",
    //   "password":"password"
    //   }

    return this.http
      .post<{ token: string }>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map((response) => {
          // If the login was successful, save the JWT token in local storage
          const token = response.token;
          if (token) {
            localStorage.setItem(
              'currentUser',
              JSON.stringify({ username, token })
            );
            this.isLoged.next(true);
            return true;
          }
          this.isLoged.next(false);
          return false;
        })
      );
  }

  logout(): void {
    // Perform logout logic here
    // Set isLoggedIn to false
    this.isLoged.next(false);
  }
}
