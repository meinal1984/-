#!/bin/sh
set -e

if [ -z "$1" ]; then
  echo "Usage: $0 <path/to/hello.exe.b64> [output-path]"
  exit 1
fi

INFILE="$1"
OUTFILE="${2:-bin/hello.exe}"

# Try common base64 options
if base64 --help >/dev/null 2>&1 && base64 --help 2>&1 | grep -q -- '--decode'; then
  base64 --decode "$INFILE" > "$OUTFILE"
elif base64 -d "$INFILE" >/dev/null 2>&1; then
  base64 -d "$INFILE" > "$OUTFILE"
elif command -v openssl >/dev/null 2>&1; then
  openssl base64 -d -in "$INFILE" -out "$OUTFILE"
else
  echo "No compatible base64 decoder found (tried base64 and openssl)."
  exit 2
fi

chmod +x "$OUTFILE" || true
echo "Wrote $OUTFILE"
