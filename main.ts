import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";

// utility functions
const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

const isPerfect = (num: number): boolean => {
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i !== num / i) sum += num / i;
    }
  }
  return sum === num && num !== 1;
};

const isArmstrong = (num: number): boolean => {
  const digits = num.toString().split("").map(Number);
  const power = digits.length;
  return digits.reduce((sum, d) => sum + d ** power, 0) === num;
};

const getDigitSum = (num: number): number => {
  return num
    .toString()
    .split("")
    .reduce((sum, digit) => sum + Number.parseInt(digit), 0);
};

// Fetch fun fact
const fetchFunFact = async (num: number): Promise<string> => {
  try {
    const response = await fetch(`http://numbersapi.com/${num}`);
    return await response.text();
  } catch {
    return `Fun fact not available for ${num}`;
  }
};

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "*", // allow all origins
    allowHeaders: ["Content-Type"],
    allowMethods: ["GET"],
  })
);

app.get("/api/classify-number", async (c) => {
  const numStr = c.req.query("number");

  // validate input
  if (!numStr || Number.isNaN(Number(numStr))) {
    return c.json({ number: numStr, error: true }, 400);
  }

  const num = Number.parseInt(numStr);
  const properties: string[] = [];
  if (isPrime(num)) properties.push("prime");
  if (isPerfect(num)) properties.push("perfect");
  if (isArmstrong(num)) properties.push("armstrong");
  if (num % 2 === 0) properties.push("even");
  else properties.push("odd");

  const funfact = await fetchFunFact(num);

  return c.json({
    Number: num,
    is_prime: isPrime(num),
    is_perfect: isPerfect(num),
    properties,
    digit_sum: getDigitSum(num),
    fun_fact: funfact,
  });
});

// start the server

if (import.meta.url === Deno.mainModule) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}
