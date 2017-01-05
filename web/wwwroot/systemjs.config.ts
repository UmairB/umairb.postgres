((global) => {
	System.config({
		paths: {
			"lib:": "lib/"
		},
		map: {
			// app
			"app": "app",
			// angular bundles
			"@angular/core": "lib:angular/core/core.umd.js",
			"@angular/common": "lib:angular/common/common.umd.js",
			"@angular/compiler": "lib:angular/compiler/compiler.umd.js",
			"@angular/platform-browser": "lib:angular/platform-browser/platform-browser.umd.js",
			"@angular/platform-browser-dynamic": "lib:angular/platform-browser-dynamic/platform-browser-dynamic.umd.js",
			"@angular/http": "lib:angular/http/http.umd.js",
			"@angular/router": "lib:angular/router/router.umd.js",
			"@angular/forms": "lib:angular/forms/forms.umd.js",
			// other libraries
			"rxjs": "lib:rxjs"
		},
		meta: {
		},
		packages: {
			"app": {
				main: "./main.js",
				defaultExtension: "js"
			},
			"rxjs": {
				defaultExtension: "js"
			}
		}
	});
})(this);
