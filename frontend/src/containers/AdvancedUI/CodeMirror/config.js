const switchOptions = [
  {
    id: 'lineNumbers',
    title: 'Line Numbers',
    trueValue: true,
    falseValue: false,
    value: true,
  },
  {
    id: 'readOnly',
    title: 'Read Only',
    trueValue: false,
    falseValue: true,
    value: true,
  },
];
const selectOptions = [
  {
    id: 'tabSize',
    title: 'Tab Size',
    options: ['2', '4', '6', '8'],
    value: 2,
  },
  {
    id: 'mode',
    title: 'Language',
    options: ['javascript', 'xml', 'markdown', 'php', 'python', 'ruby'],
    value: 'javascript',
  },
  {
    id: 'theme',
    title: 'Select themes',
    options: [
      'default',
      'zenburn',
      'solarized',
      'rubyblue',
      'paraiso-dark',
      'midnight',
      'material',
      'hopscotch',
      'twilight',
    ],
    value: 'zenburn',
  },
];

const defaultValues = {
  basic: `const component = {
    name: 'DevPlus',
    author: 'DEVPLUS team',
    website: 'https://devplus.asia/'
};`,
  javascript: `const component = {
    name: 'DevPlus',
    author: 'DEVPLUS team',
    website: 'https://devplus.asia/'
};`,
  markdown: `# DevPlus
###This is a DEVPLUS team production
[have a look](https://devplus.asia/)
  `,
  xml: `<isomprphic>
    <to>Tove</to>
    <name>DevPlus</name>
    <author>DEVPLUS team</author>
    <website>devplus.asia</website>
</isomprphic>`,
  php: `<html>
 <head>
  <title> v</title>
 </head>
 <body>
 <h1>https://devplus.asia/</h1>
 <p>This is a DEVPLUS team production</p>
 <a href="https://devplus.asia/">visit ou site</a>
 </body>
</html>
`,
  python: `
print("DevPlus")
print("This is a DEVPLUS team production")
print("visit us https://devplus.asia ")
`,
  ruby: `rint "DevPlus"
print "This is a DEVPLUS team production"
print "visit us https://devplus.asia "
`,
};

export { switchOptions, selectOptions, defaultValues };
