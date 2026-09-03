import { z } from 'zod';
try {
  z.string().parse(123);
} catch (e) {
  console.log(e.name, typeof e.issues, Array.isArray(e.issues));
  console.log(e.issues);
}
