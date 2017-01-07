/*
 * !!!! ATTENTION !!!!
 * WHEN YOU MODIFY THIS FILE RESTART WEBPACK (NPM START)
 * */

const _ = require('lodash');

// Css variables for colors
const colors = {
  cMain: '#2E3440',
  cMainHover: 'color(var(--cMain) a(45%))',
  cMainFocus: 'color(var(--cMain) a(45%))',
  cSup: '#db5461', // supplementary color
  cSupHover: 'color(var(--cSup) a(75%));',
  cSupFocus: 'color(var(--cSup) a(35%));',
  cSupActive: 'color(var(--cSup) a(35%));',
  cSupDark: 'color(var(--cSup) a(50%));',
  cHeading: '#C0C5CE',
  cText: '#7B818B',
};

// Css variables for fonts
const fonts = {
  fsText: '1.6rem',            // Font-size Text (1.6rem === 16px)
};

const variables = _.merge(
  colors,
  fonts
);
module.exports = variables;
