Package.describe({
  summary: "Emoji unicode to twitter-style image converter",
  version: "1.6.0",
  git: "https://github.com/mastastealth/meteor-twemoji.git",
  name: "mastastealth:twemoji"
});

Package.on_use(function (api) {
  api.versionsFrom("METEOR@0.9.2.1");
  api.add_files('emoji.js', ['client']);
  // var files = loop through all the images
  files.forEach(function (name) {
      api.add_files('img/' + name + '.svg', 'client');
  });
  api.export('Emoji');

  api.use('templating', 'client', {weak: true});
});
