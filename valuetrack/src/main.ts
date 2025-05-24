// import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
// below bootstarp will be used when we follow each component is a standloe.
// bootstrapApplication(AppComponent, appConfig)
//   .catch((err) => console.error(err));

// This kind of startup will be used to load module way of initialization. with this all included comonents will be renderd on screen
platformBrowserDynamic().bootstrapModule(AppModule);