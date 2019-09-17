import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { GraphPageComponent } from './graph-page/graph-page.component';


const routes: Routes = [
  { path: 'home', component: HomepageComponent },
  { path: 'graph', component: GraphPageComponent },
  { path: '404', component: NotfoundpageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/404', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
