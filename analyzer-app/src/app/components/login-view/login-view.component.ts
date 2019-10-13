import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { OnDestroy } from "@angular/core";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit, OnDestroy {

  hide: boolean = true;
  loginForm: FormGroup;
  submitted: boolean = false;
  loading = false;

  subscriptions: Subscription = null;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.authService.logout();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    const sub = this.authService.login(this.loginForm.controls.username.value,
      this.loginForm.controls.password.value)
      .subscribe(
        data => {
          this.router.navigate(['/chart']);
        },
        error => {
          this.loading = false;
          this.snackBar.open('Username or password is incorrect', 'Understood', {
            duration: 2000,
          });
        });
    this.subscriptions == null ? this.subscriptions = sub : this.subscriptions.add(sub);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }



}
