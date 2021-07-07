import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChatIndexComponent} from "@app/chat/chat-index/chat-index.component";
import {AppRouteGuard} from "@shared/auth/auth-route-guard";
import {AccountLoginComponent} from "@app/account/account-login/account-login.component";
import {AccountRegisterComponent} from "@app/account/account-register/account-register.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'chat'
  },
  {
    path: 'chat',
    canActivate: [AppRouteGuard],
    canActivateChild: [AppRouteGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ChatIndexComponent
      }
    ]
  },
  {
    path: 'login',
    component: AccountLoginComponent
  },
  {
    path: 'register',
    component: AccountRegisterComponent
  }
  // {
  //   path: '**',
  //   component: PageNotFoundComponent
  // }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
