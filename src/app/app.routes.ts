import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ModerationComponent } from './components/moderation/moderation.component';

export const routes: Routes = [
{path: '', component: LoginComponent},
{path: 'moderation', component: ModerationComponent}
];
