import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import CodeWindowComponent from "./code-window.component";

const routes: Routes = [
	{	
		path: '',
		component: CodeWindowComponent
	}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    declarations: [CodeWindowComponent]
})
export default class CodeWindowModule { }
