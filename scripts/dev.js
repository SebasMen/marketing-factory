#!/usr/bin/env node

const { spawn } = require('child_process');

console.log('🚀 Starting Marketing Factory Development Environment...\n');

const runBackend = spawn('npm', ['run', 'dev:backend'], {
  stdio: ['inherit', 'inherit', 'inherit'],
  shell: true
});

const runFrontend = spawn('npm', ['run', 'dev:frontend'], {
  stdio: ['inherit', 'inherit', 'inherit'],
  shell: true
});

// Handle graceful shutdown
const cleanup = () => {
  console.log('\n🛑 Shutting down development servers...');
  runBackend.kill('SIGTERM');
  runFrontend.kill('SIGTERM');
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Handle process exits
runBackend.on('exit', (code) => {
  console.log(`Backend process exited with code ${code}`);
});

runFrontend.on('exit', (code) => {
  console.log(`Frontend process exited with code ${code}`);
});
