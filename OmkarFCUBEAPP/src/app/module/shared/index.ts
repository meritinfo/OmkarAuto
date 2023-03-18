import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftsidebarComponent,
    ThemeComponent
  ],
  imports: [
  ],
  exports:[
    HeaderComponent,
    LeftsidebarComponent,
    ThemeComponent
  ]
})
export class LayoutModule { }