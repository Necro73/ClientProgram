import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
//import { NgxPaginationModule } from 'ngx-pagination';

import { AppSessionService } from './session/app-session.service';
import { AppUrlService } from './nav/app-url.service';
import { AppAuthService } from './auth/app-auth.service';
import { AppRouteGuard } from './auth/auth-route-guard';
import { LocalizePipe } from '@shared/pipes/localize.pipe';

import { LayoutStoreService } from './layout/layout-store.service';

import { BusyDirective } from './directives/busy.directive';
import { EqualValidator } from './directives/equal-validator.directive';
import {AbpModule} from "@shared/abp/abp.module";
import {ServiceProxyModule} from "@shared/service-proxies/service-proxy.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AbpModule,
    ServiceProxyModule
  ],
  declarations: [
    LocalizePipe,
    BusyDirective,
    EqualValidator
  ],
  exports: [
    LocalizePipe,
    BusyDirective,
    EqualValidator
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard,
        LayoutStoreService
      ]
    };
  }
}
