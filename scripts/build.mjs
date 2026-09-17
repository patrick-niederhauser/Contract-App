import { cp, mkdir, readFile } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await cp('public', 'dist', {recursive:true});
new Function(await readFile('dist/app.js','utf8'));
console.log('Static build verified: dist/');
