import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { LeftsidebarComponent } from './leftsidebar/leftsidebar.component';
import { ThemeComponent } from './theme/theme.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    LeftsidebarComponent,
    ThemeComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderComponent,
    LeftsidebarComponent,
    ThemeComponent
  ]
})
export class LayoutModule { }