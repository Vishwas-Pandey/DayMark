import { authApi } from './src/api/auth.js';

async function run() {
  try {
    const res = await authApi.login({ email: "debug@example.com", password: "Password123!" });
    console.log("SUCCESS:", JSON.stringify(res, null, 2));
  } catch (err) {
    console.error("ERROR:");
    console.error("err:", err);
    console.error("err.message:", err.message);
    console.error("err.response?.data?.message:", err.response?.data?.message);
  }
}
run();
