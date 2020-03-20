import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)},
    {path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)},
    {path: 'relationship', loadChildren: () => import('./pages/relationship/relationship.module').then(m => m.RelationshipPageModule)},
    {path: 'settings', loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
