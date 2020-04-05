import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { NotfoundpageComponent } from './notfoundpage/notfoundpage.component';
import { GraphPageComponent } from './graph-page/graph-page.component';
import { LoaderHackForApolloComponent } from './loader-hack-for-apollo/loader-hack-for-apollo.component';
import { GenericGuard } from './_utils/generic.guard';


const routes: Routes = [
  { path: 'init', component: LoaderHackForApolloComponent },
  { path: 'home', loadChildren: () => import('./graphql/graphql.module').then(m => m.GraphQLModule), component: HomepageComponent, canActivate: [GenericGuard] },
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
