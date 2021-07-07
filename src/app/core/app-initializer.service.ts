import {Injectable, Injector} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {
  API_BASE_URL,
  GetCurrentLoginInformationsOutput,
  SessionServiceProxy
} from '@shared/service-proxies/service-proxies';
import {BootstrapQuery, BootstrapStore} from "@shared/store/bootstrap.store";
import {LocalizationStore} from "@shared/store/localization.store";
import {TokenService} from "@shared/abp/services/auth/token.service";
import {AppConsts} from "@shared/AppConsts";
import {SessionStore} from "@shared/store/session.store";
import {AppSessionService} from "@shared/session/app-session.service";

declare var jQuery: any;
declare var abp: any;

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {

  constructor(public injector: Injector) {
  }

  initApp(): Promise<any> {

    // const appBaseUrl = this.injector.get<string>('ORIGIN_URL' as any);
    const apiBaseUrl = this.injector.get<string>(API_BASE_URL);
    const bootStore = this.injector.get(BootstrapStore);
    bootStore.update({
      api: apiBaseUrl
    });
    AppConsts.remoteServiceBaseUrl = apiBaseUrl;
    //
    console.log('[App.Init] Api base url', apiBaseUrl);
    //
    // const icon = this.injector.get(IconRegistrationService);
    const query = this.injector.get(BootstrapQuery);
    // const breadcrumb = this.injector.get(BreadcrumbService);
    const loadHook = query.load;
    console.log('[App.Init] Init');
    this.initAll().then(() => {
      // this.injector.get(LocalizeRouterService).init();
      loadHook.resolve();
    });
    return loadHook.promise;
  }

  initAll() {
    return Promise.all([
      this.initLocalize(),
      this.initSession()
    ]);
  }

  initLocalize(): Promise<any> {
    const http = this.injector.get(HttpClient);
    const bootstrapQuery = this.injector.get(BootstrapQuery);
    const localizationStore = this.injector.get(LocalizationStore);
    const auth = this.injector.get(TokenService);
    // const cookie = this.injector.get(CookieService);
    // const translateService = this.injector.get(TranslateService);
    // translateService.currentLang
    // const lang = this.injector.get(LocalizationService);
    // const culture = lang.getPredictedLang(isLoadedFirstTime);

    console.log('[App.Init] UserConfig Start');
    return http.get(bootstrapQuery.api + '/AbpUserConfiguration/GetAll', {
      headers: {
        Authorization: 'Bearer ' + auth.getToken(),
        // '.AspNetCore.Culture': cookie.get('Abp.Localization.CultureName') || 'ru',
        'Abp.TenantId': '1'
      }
    }).toPromise().then(result => {
      const data = (result as any).result;
      const locData = data.localization;
      locData.defaultSourceName = "ClusterCompanyChat";
      localizationStore.update(locData);

      jQuery.extend(true, abp, JSON.parse(JSON.stringify(data)));

      // const session = this.injector.get(AbpSessionService);
      // const sData = data.session;
      // session.userId = sData.userId;
      // session.tenantId = sData.tenantId;
      // session.impersonatorUserId = sData.impersonatorUserId;
      // session.impersonatorTenantId = sData.impersonatorTenantId;
      // session.multiTenancySide = sData.multiTenancySide;

      //const authData = data.auth;
      // auth.allPermissions = authData.allPermissions;
      // auth.grantedPermissions = authData.grantedPermissions;

      console.log('[App.Init] UserConfig Ready', data);
    });
  }

  initSession(): Promise<void> {
    const sessionService = this.injector.get(SessionServiceProxy);
    const sessionStore = this.injector.get(SessionStore);
    const sessionLegacy = this.injector.get(AppSessionService);

    return sessionService.getCurrentLoginInformations().toPromise()
      .then((result: GetCurrentLoginInformationsOutput) => {
        sessionStore.update(result);
        sessionLegacy.initFields(result);
        console.log('[App.Init] Session Ready', sessionStore.getValue());
      });
  }

  // getShownLoginName(): string {
  //   const sessionStore = this.injector.get(SessionQuery);
  //   return sessionStore.user.userName;
  // }
  //
  // resetUser(): void {
  //   const sessionStore = this.injector.get(SessionStore);
  //   sessionStore.update({user: undefined});
  // }
}
