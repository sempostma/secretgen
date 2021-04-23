#!/usr/bin/env node

const package = require('../package.json')
const { program, Option } = require('commander');
const bytes = require('bytes')
const { encode, decode } = require('num-encode')
program.version(package.version);

const byteAbbreviations = [
  'b',
  'kb',
  'mb',
  'gb',
  'tb',
  'pb'
]

const CHARACTER_SETS = {
   az09: 'abcdefghijklmnopqrstuvwxyz0123456789',
   az: 'abcdefghijklmnopqrstuvwxyz',
   AZ09: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
   AZ: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0',
   azAZ90: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
   hex: '0123456789abcdef',
   HEX: '0123456789ABCDEF',
   BINARY: '01',
   TERNARY: '012',
   OCTAL: '01234567'
}

const outputOption = new Option('-o, --output <set>', 'character set to use for the output')
outputOption.choices(Object.keys(CHARACTER_SETS))

program
  .name(package.name)
  .description(package.description)
  .arguments('<length>')
  .option('-B, --bytes', 'input length is in bytes')
  .option('-b, --bits', 'input length is in bits')
  .option('-c, --characters <characters>', 'output characters string')
  .addOption(outputOption)
  .action((length, options, command) => {
    const isBytes = options.bytes || byteAbbreviations.some(ba => length.toLowerCase().endsWith(ba))
    const isBits = !isBytes && (options.bits || length.toLowerCase().endsWith('bits'))
    const isString = !isBits && !isBytes

    let characterSet = CHARACTER_SETS.az09
    if (options.output  && Object.prototype.hasOwnProperty.call(CHARACTER_SETS, options.output)) {
      characterSet = CHARACTER_SETS[options.output]
    } else if (options.characters) {
      characterSet = options.characters
    }
    let output

    if (isBytes) {
      const bits = bytes(length) * 8
      const secretBits = generateRandomBits(bits)
      const randomDecimal = decode(secretBits, '01')
      output = encode(randomDecimal, characterSet)
    } else if (isBits) {
      const bits = parseInt(length)
      const secretBits = generateRandomBits(bits)
      const randomDecimal = decode(secretBits, '01')
      output = encode(randomDecimal, characterSet)
    } else if (isString) {
      output = new Array(parseInt(length)).fill(1).map(() => characterSet[Math.floor(Math.random() * characterSet.length)]).join('')
    } else {
      throw new Error('Unrecognized length type')
    }

    console.log(output)
  })

program.parse(process.argv);

function generateRandomBits(length) {
  return new Array(length).fill(1).map((x, i) => Math.random() < 0.5 ? '0' : '1').join('')
}

