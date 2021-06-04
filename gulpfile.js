const {series, src, dest, watch} = require("gulp");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const concat = require("gulp-concat");

const paths = {
    cssSrc: "src/scss/app.scss",
    cssDest: "build/css",
    imgSrc: "src/img/**/*",
    imgDest: "build/img",
    jsSrc: "src/js/**/*.js",
    jsDest: "build/js"
}

function css(){
    return src(paths.cssSrc)
    .pipe(sass({
        outputStyle: "expanded"
    }))
    .pipe(dest(paths.cssDest));
}

function js(){
    return src(paths.jsSrc)
    .pipe(concat("bundle.js"))
    .pipe(dest(paths.jsDest));
}

function watchFiles(){
    watch("src/scss/*/**.scss", css);
    watch("src/js/*.js", js);
}

exports.default = series(css, js, watchFiles);