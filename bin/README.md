# hello.exe (base64)

This directory contains the source for a tiny Windows "Hello, world!" program
and a placeholder for a base64-encoded Windows executable.

What is included:
- bin/hello.c — C source that prints "Hello, world!"
- bin/hello.exe.b64 — placeholder text file. Replace with real base64 content after building
- scripts/decode.sh — Bash script to decode a .b64 file into bin/hello.exe
- scripts/decode.ps1 — PowerShell script to decode a .b64 file into bin/hello.exe

How to build and produce base64 locally

1) Build the native Windows executable (choose one):
   - With Mingw-w64 on Linux/macOS/Windows (MSYS2):
       x86_64-w64-mingw32-gcc -O2 -static -o bin/hello.exe bin/hello.c
   - With MSVC (Developer Command Prompt) on Windows:
       cl /Fe:bin\hello.exe bin\hello.c

2) Create the base64 file:
   - On Linux/macOS:
       base64 bin/hello.exe > bin/hello.exe.b64
   - On Windows PowerShell:
       [Convert]::ToBase64String([IO.File]::ReadAllBytes('bin\\hello.exe')) | Out-File -Encoding ascii bin\\hello.exe.b64

3) Commit the produced bin/hello.exe.b64 to the repository (or paste the content to me
   and I will commit it for you).

How to decode (after bin/hello.exe.b64 is present in the repo):

- On Linux/macOS:
    bash scripts/decode.sh bin/hello.exe.b64
- On Windows PowerShell:
    pwsh -File scripts/decode.ps1 -Input bin/hello.exe.b64

After decoding, run the exe on Windows:
  .\\bin\\hello.exe
