import { compare } from 'bcryptjs';

async function main() {
      const hash = '$2b$12$k00fBdD0jB9Da4xJPDmFxOHZLqtjob24tkxiQHPB2.yG9OoVdIVQm';
      const password = 'admin123';

      const isValid = await compare(password, hash);
      console.log(`Password '${password}' is valid: ${isValid}`);
}

main();
