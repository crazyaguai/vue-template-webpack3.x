/*
    gulp将dist的文件传到dev服务器上面
*/
const gulp = require('gulp');
const scp2 = require('gulp-scp2');



const SERVER_HOST_TEST = '172.16.33.230';
const PORT = 9422;
const USERNAME = 'root';
const PASSWORD = '123456';

gulp.task('scp:dev', () => {
    // 对应地址: http://www.dev.gpdax.com
    return gulp.src('./dist/**/*')
        .pipe(scp2({
            host: SERVER_HOST_TEST,
            port: PORT,
            username: USERNAME,
            password: PASSWORD,
            dest: '/data/app/static/exchange_manager',
            watch(client) {
                client.on('write', function(o) {
                    console.log('正在上传的文件：        ' + o.destination);
                });
                client.on('end', function(o) {
                    console.log(`[scp:dev 上传完成`);
                });
            }
        }))
        .on('error', function(err) {
            console.error(err);
        });
});
