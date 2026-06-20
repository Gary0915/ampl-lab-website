const { spawn } = require('node:child_process');
const http = require('node:http');

const server = spawn(process.execPath, ['./node_modules/astro/astro.js', 'dev', '--host', '127.0.0.1'], {
  env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' },
  stdio: 'inherit',
});

const startedAt = Date.now();
const timer = setInterval(() => {
  http.get('http://127.0.0.1:4321/', (response) => {
    response.resume();
    clearInterval(timer);
    const runner = spawn('npx.cmd', ['playwright', 'test', ...process.argv.slice(2)], { stdio: 'inherit', shell: true });
    runner.on('exit', (code) => {
      server.kill();
      process.exit(code ?? 1);
    });
  }).on('error', () => {
    if (Date.now() - startedAt > 60000) {
      clearInterval(timer);
      server.kill();
      console.error('Astro did not become available at http://127.0.0.1:4321 within 60 seconds.');
      process.exit(1);
    }
  });
}, 250);

server.on('exit', (code) => {
  if (code !== 0 && Date.now() - startedAt < 60000) {
    clearInterval(timer);
    process.exit(code ?? 1);
  }
});
