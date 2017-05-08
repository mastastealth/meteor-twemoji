Emoji = {};

Emoji.baseImagePath = '/packages/mastastealth_twemoji/img/';

function dec2hex( str ) { return (str+0).toString(16); }

function emoji2Unicode(str) { 
  let haut = 0, 
      n = 0,
      cp,
      emojiCode = '';

  for (let i=0; i<str.length; i++) {
    let b = str.charCodeAt(i); 

    if (b < 0 || b > 0xFFFF) emojiCode += `Error: byte out of range ${dec2hex(b)}!`;

    if (haut != 0) {
      if (0xDC00 <= b && b <= 0xDFFF) {
        emojiCode += '-' + dec2hex(0x10000 + ((haut - 0xD800) << 10) + (b - 0xDC00));
        haut = 0;
        continue;
      } else {
        emojiCode += `Error: surrogate out of range ${dec2hex(haut)}!`;
        haut = 0;
      }
    }

    if (0xD800 <= b && b <= 0xDBFF) {
      haut = b;
    } else {
        cp = dec2hex(b); 
        emojiCode += `-${cp}`; 
    }
  }

  return emojiCode.substring(1);
}

Emoji.convert = function (str) {
  if (typeof str !== 'string') {
    return '';
  } else {
    str = emoji2Unicode(str);
  }

  return str.replace(/:[\+\-a-z0-9_]+:/gi, function(match) {
    let imgName = match.slice(1, -1),
        path = `${Emoji.baseImagePath}${imgName}.png`;
    return `<img class="emoji" alt="${match}" src="${path}" draggable="false" />`;
  });
};

// borrowed code from https://github.com/meteor/meteor/blob/devel/packages/showdown/template-integration.js
if (Package.templating) {
  let Template = Package.templating.Template,
      Blaze = Package.blaze.Blaze; // implied by `templating`
      HTML = Package.htmljs.HTML; // implied by `blaze`

  Blaze.Template.registerHelper('emoji', new Template('emoji', function () {
    let view = this,
        content = '';

    if (view.templateContentBlock) {
      // this is for the block usage eg: {{#emoji}}:smile:{{/emoji}}
      content = Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING);
    }
    else {
      // this is for the direct usage eg: {{> emoji ':blush:'}}
      content = view.parentView.dataVar.get();
    }
    return HTML.Raw(Emoji.convert(content));
  }));
}