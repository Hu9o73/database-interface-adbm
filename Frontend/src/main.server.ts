import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/components/baseComponent/app.component';
import { config } from './app/Config/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
