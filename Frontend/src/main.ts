import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/Config/app.config';
import { AppComponent } from './app/components/baseComponent/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
