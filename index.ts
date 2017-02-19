import {ModuleWithProviders, NgModule} from "@angular/core";
import {MdPagination} from "./pagination";
import {NumberToArray} from "./numberToArrayPipe";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";

@NgModule({
	imports: [BrowserModule, FormsModule],
	exports: [MdPagination],
	declarations: [MdPagination, NumberToArray],
})
export class MdPaginationModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: MdPaginationModule,
			providers: []
		};
	}
}
