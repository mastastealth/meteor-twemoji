![meteor-twemoji](https://gc.david.tools/meteor-twemoji.svg)

A Meteor package to convert [emoji codes](http://www.emoji-cheat-sheet.com/) (like the ones used by GitHub and Slack) into [twitter-style emoji](http://twitter.github.io/twemoji/) images. This is a fork of [meteor-emoji](https://github.com/SeriousM/meteor-emoji) that keeps the same API but has graphics from Twitter.

### Installation

Using the Meteor Package System, add the emoji package from [Atmosphere](https://atmosphere.meteor.com/):

```
npm install git+ssh://git@github.com:mastastealth/meteor-twemoji.git --save
```

### Usage

#### Javascript

In your app, use `Emoji.convert(text)` to emojify strings. All substrings of the general form `:emoji_name:` will be replaced with `<img>` tags that *should* [just work](http://codinghorror.typepad.com/.a/6a0120a85dcdae970b0128776ff992970c-pi). The converter isn't smart about emoji that don't actually exist.

#### HTML

If you wish to insert an emoji inside your HTML you can use the `emoji` helper followed by the name of the emoji you wish to display:

```
{{> emoji ":alien:"}}
```

Alternatively, you can emojify a whole block:

```
{{#emoji}}:smile:, not :cry:{{/emoji}}
```

You can also use this in combination with the `showdown` Meteor package:

```
{{#markdown}}{{#emoji}}your_raw_markdown_text{{/emoji}}{{/markdown}}
```

### Styling

The generated `<img>` tags are conveniently adorned with the `emoji` class, so you can set emoji-specific styling through that. Juts as instructed in [Twemoji](https://github.com/twitter/twemoji#inline-styles), if you'd like to size the emoji according to the surrounding text, you can use the following CSS:

```css
img.emoji {
  height: 1em;
  width: 1em;
  margin: 0 .05em 0 .1em;
  vertical-align: -0.1em;
}
```

## Authors

This code comes from a Meteor package created by [@AlarmingCow](https://github.com/AlarmingCow/meteor-emoji), now maintained by [@SeriousM](https://github.com/SeriousM/meteor-emoji). All graphics were created by [Twitter](https://github.com/twitter/twemoji) and are licensed under CC-BY 4.0.
