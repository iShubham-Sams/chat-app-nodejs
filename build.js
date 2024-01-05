import ncp from 'ncp'

ncp('./src/views', './dist/views', function (err) {
  if (err) {
    return console.error(err);
  }
  console.log('EJS files copied successfully!');
});
