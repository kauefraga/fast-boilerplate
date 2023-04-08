#! /usr/bin/env node
import { main } from './index';

try {
  main();
} catch (e: any) {
  console.error(
    new Error(`${e.code} - ${e.message}`),
  );
}
