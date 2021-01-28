import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpInterceptor, HTTP_INTERCEPTORS} from '@angular/common/http'
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzModalModule } from 'ng-zorro-antd/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuestionsComponent } from './questions/questions.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { QuestionDetailComponent } from './questions/question-list/question-detail/question-detail.component';
import { UsersComponent } from './users/users.component';
import { UserLoginComponent } from './users/user-login/user-login.component';
import { QuestionEditComponent } from './questions/question-list/question-edit/question-edit.component';
import { QuestionCreateComponent } from './questions/question-list/question-create/question-create.component';
import { FormsModule } from '@angular/forms';
import {QuestionService} from './services/question.service';
import { SearchFilterPipe } from './questions/pipes/search-filter.pipe';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData, DatePipe } from '@angular/common';
import en from '@angular/common/locales/en';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { HeaderComponent } from './header/header.component'
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserService } from './services/user.service';
import { UserRegisterComponent } from './users/user-register/user-register.component';
import { ChartsComponent } from './charts/charts.component';
import { StackedBarChartComponent } from './charts/stacked-bar-chart/stacked-bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { QuestionIdPipe } from './questions/pipes/question-id.pipe';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    QuestionsComponent,
    QuestionListComponent,
    QuestionDetailComponent,
    UsersComponent,
    UserLoginComponent,
    QuestionEditComponent,
    QuestionCreateComponent,
    SearchFilterPipe,
    HeaderComponent,
    PieChartComponent,
    UserRegisterComponent,
    ChartsComponent,
    StackedBarChartComponent,
    QuestionIdPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NzButtonModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzDropDownModule,
    NzModalModule
  ],
  providers: [
    QuestionService,
    UserService,
     AuthGuard, 
     DatePipe ,
     { provide: NZ_I18N, useValue: en_US },
     {provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
