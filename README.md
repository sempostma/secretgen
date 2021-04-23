# secgen

A utility that makes generating secrets (or any random value) easy.

## Usage

```bash
npm i -g secgen
secgen 20 # for a 20 character long string
secgen 20bits # for a 20 bit secret
secgen 20b # for a 20 byte secret
secgen 10kb # for a 10kb secret (this utility is not designed for these giant secrets, so generating anything larger than this may take a VERY long time)
secgen 50 -o AZ # use a different output character set than the default (az09)
secgen 50 -o HEX # use a different output character set than the default (az09)
secgen 50 -o BINARY # use a different output character set than the default (az09)
secgen 50 -o OCTAL # use a different output character set than the default (az09)
secgen 50 -o TERNARY # use a different output character set than the default (az09)
secgen 50 -o azAZ09 # use a different output character set than the default (az09)

# Feel free to clone this project and add your own output character sets

secgen 50 -c xyz  # or use this command to inject your own character set
# which outputs:
xxyyxyyxyzyzzyzxzxxzzyyzzzxxyzxyxyzyxyzzzzyxxxzyyx

```

## LICENSE

MIT
