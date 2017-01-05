import { Gulpclass, Task } from "gulpclass/Decorators";
import * as path from "path";
import * as gulp from "gulp";
import * as sass from "gulp-sass";

let paths = {
	webroot: "./wwwroot/",
	npm: "./node_modules/",
	gulp: path.join(__dirname, "gulp/"),
	get lib() {
		return `${this.webroot}lib/`;
	},
	get sass() {
		return `${this.webroot}**/*.scss`;
	}
};

const libs = {
	'core-js': {
		libs: [
			paths.npm + 'core-js/client/shim.min.js'
		]
	},
	'zone.js': {
		libs: [
			paths.npm + 'zone.js/dist/zone.js'
		]
	},
	'reflect-metadata': {
		libs: [
			paths.npm + 'reflect-metadata/Reflect.js'
		]
	},
	'systemjs': {
		libs: [
			paths.npm + 'systemjs/dist/system.src.js'
		]
	},
	'rxjs': {
		libs: [
			paths.npm + 'rxjs/**/*.js'
		]
	},
	'angular': {
		libs: [
			paths.npm + '@angular/**/bundles/*.umd.{min.js,js}'
		],
		removeFolder: 'bundles'
	}
};

@Gulpclass()
export class GulpClass {
	@Task()
	public libs(done: Function) {
		let count = Object.keys(libs).length;
		for (var lib in libs) {
			var libObj = libs[lib],
				dest = paths.lib + lib;

			let stream: NodeJS.ReadWriteStream | null = null;

			if (libObj.libs) {
				let destStream: NodeJS.ReadWriteStream;
				if (libObj.removeFolder) {
					destStream = gulp.dest(f => {
						f.path = f.path.replace(path.sep + libObj.removeFolder, "");
						return dest;
					});
				} else {
					destStream = gulp.dest(dest);
				}

				stream = gulp.src(libObj.libs)
							 .pipe(destStream);
			} else if (libObj.executor) {
				stream = libObj.executor();
			}

			if (stream !== null) {
				stream.on('end', () => {
					if (--count === 0) {
						done();
					}
				});
			} else {
				--count;
			}
		}
    }

	@Task("build:sass")
	public buildSass() {
		return gulp.src(paths.sass)
			//.pipe(sourcemaps.init())
			.pipe(sass().on('error', sass.logError))
			//.pipe(cssmin())
			//.pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: '/app' }))
			.pipe(gulp.dest(function (file) { return file.base; }));
	}
}
