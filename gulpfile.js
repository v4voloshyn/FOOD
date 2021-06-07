const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const imagemin = require("gulp-imagemin");

// Static server
gulp.task("server", function () {
   browserSync.init({
      server: {
         baseDir: "dist/",
      },
   });
});

gulp.task("styles", function () {
   return gulp
      .src("src/scss/**/*.+(scss|sass)")
      .pipe(sass({
         outputStyle: "compressed"
      }).on("error", sass.logError))
      .pipe(
         rename({
            prefix: "",
            suffix: ".min",
         })
      )
      .pipe(gulp.dest("./src/css"))

      .pipe(sass({
         outputStyle: "compressed"
      }).on("error", sass.logError))
      .pipe(
         rename({
            prefix: "",
            suffix: "",
         })
      )
      .pipe(
         autoprefixer({
            cascade: false,
         })
      )
      .pipe(cleanCSS({
         compatibility: "ie8"
      }))
      .pipe(gulp.dest("dist/css"))
      .pipe(browserSync.stream());
});

gulp.task("watch", function () {
   gulp.watch("src/scss/**/*.+(scss|sass|css)", gulp.parallel("styles"));
   gulp.watch("src/js/**/*.+(js|json)").on("change", browserSync.reload);
   gulp.watch("src/js/**/*.+(js|json)").on("change", gulp.parallel("scripts"));
   gulp.watch("src/*.html").on("change", browserSync.reload);
   gulp.watch("src/*.html").on("change", gulp.parallel("html"));
});
// Таска на минимизацию ХТМЛ файла и копированием его в папку dist
gulp.task("html", function () {
   return gulp
      .src("src/*.html")
      .pipe(htmlmin({
         collapseWhitespace: true
      }))
      .pipe(gulp.dest("dist/"));
});

// Перемещение всех скриптовых файлов в папку dist
gulp.task("scripts", function () {
   return gulp.src("src/js/**/*.+(js|json)").pipe(gulp.dest("dist/js"));
});
// Перемещение всех шрифтовых файлов в папку dist
gulp.task("fonts", function () {
   return gulp.src("src/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});
// Перемещение всех icons файлов в папку dist
gulp.task("icons", function () {
   return gulp.src("src/img/**/*").pipe(gulp.dest("dist/img"));
});
// Перемещение  и минимизация img файлов в папку dist
gulp.task("imagemin", function () {
   return gulp.src("src/img/**/*").pipe(imagemin()).pipe(gulp.dest("dist/img"));
});

gulp.task(
   "default",
   gulp.parallel(
      "watch",
      "server",
      "styles",
      "html",
      "scripts",
      "fonts",
      "icons",
      "imagemin"
   )
);