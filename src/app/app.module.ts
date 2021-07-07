import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatIndexComponent } from './chat/chat-index/chat-index.component';
import { AccountLoginComponent } from './account/account-login/account-login.component';
import {MatFormFieldModule} from "@node_modules/@angular/material/form-field";
import {MatInputModule} from "@node_modules/@angular/material/input";
import {MatCardModule} from "@node_modules/@angular/material/card";
import {AppInitializerService} from "@app/core/app-initializer.service";
import {API_BASE_URL} from "@shared/service-proxies/service-proxies";
import {BrowserAnimationsModule} from "@node_modules/@angular/platform-browser/animations";
import {MatButtonModule} from "@node_modules/@angular/material/button";
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from "@node_modules/@angular/material/snack-bar";
import {MatSidenavModule} from '@angular/material/sidenav';
import {ChatUserComponent} from "@app/chat/chat-user/chat-user.component";
import {ChatChannelComponent} from "@app/chat/chat-channel/chat-channel.component";
import {MatExpansionModule} from "@node_modules/@angular/material/expansion";
import {MatListModule} from "@node_modules/@angular/material/list";
import {ChatMessageComponent} from "@app/chat/chat-message/chat-message.component";
import {MatIconModule} from "@node_modules/@angular/material/icon";
import {MatDialogModule} from "@node_modules/@angular/material/dialog";
import {ChatCreateChannelComponent} from "@app/chat/chat-create-channel/chat-create-channel.component";
import {ChatAddUserComponent} from "@app/chat/chat-add-user/chat-add-user.component";
import {MatSelectModule} from "@node_modules/@angular/material/select";
import {MatMenuModule} from "@node_modules/@angular/material/menu";
import {PickerModule} from "@node_modules/@ctrl/ngx-emoji-mart";
import {EmojiModule} from "@node_modules/@ctrl/ngx-emoji-mart/ngx-emoji";
import {ChatPickEmojiComponent} from "@app/chat/chat-pick-emoji/chat-pick-emoji.component";
import {MatChipsModule} from "@node_modules/@angular/material/chips";
import {ChatTaskPickerComponent} from "@app/chat/chat-task-picker/chat-task-picker.component";
import {AccountRegisterComponent} from "@app/account/account-register/account-register.component";
import {MatTooltipModule} from "@node_modules/@angular/material/tooltip";
import {ChatTaskComponent} from "@app/chat/chat-task/chat-task.component";

export function appInitializerFactory(appInitializerService: AppInitializerService): () => Promise<any> {
  return () => {
    return appInitializerService.initApp();
  };
}
export function appApiFactory(injector: Injector): string {
  return 'https://fqw.forwardsoft.org';
  //return 'http://localhost:21021';
}

@NgModule({
  declarations: [
    AppComponent,
    ChatIndexComponent,
    AccountLoginComponent,
    ChatUserComponent,
    ChatChannelComponent,
    ChatMessageComponent,
    ChatCreateChannelComponent,
    ChatAddUserComponent,
    ChatPickEmojiComponent,
    ChatTaskPickerComponent,
    AccountRegisterComponent,
    ChatTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatMenuModule,
    EmojiModule,
    PickerModule,
    MatChipsModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [AppInitializerService],
      multi: true
    },
    {
      provide: API_BASE_URL,
      useFactory: appApiFactory,
      deps: [Injector]
    },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 3000
      }
    },
  ],
  entryComponents: [ChatCreateChannelComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
