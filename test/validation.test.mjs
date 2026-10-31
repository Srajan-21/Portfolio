import test from "node:test";
import assert from "node:assert/strict";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(60),
  email: z.string().email(),
  subject: z.string().max(100).optional(),
  message: z.string().min(5).max(2000),
  honeypot: z.string().optional(),
});

test("Contact schema validates authentic submissions", () => {
  const valid = {
    name: "Jane Doe",
    email: "jane@company.com",
    subject: "Full Stack Opportunity",
    message: "We loved your CLAVIS architecture and want to interview you.",
    honeypot: "",
  };
  const result = contactSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test("Contact schema rejects invalid emails and empty messages", () => {
  const invalid = {
    name: "J",
    email: "not-an-email",
    message: "Hi",
  };
  const result = contactSchema.safeParse(invalid);
  assert.equal(result.success, false);
});

test("Satiety meal prediction formula prevents zero or negative values", () => {
  const calculatePortion = (hoursAgo, mealType) => {
    const baseGrams = 420;
    const hoursFactor = Math.min(250, hoursAgo * 35);
    const mealDeduction = mealType === "heavy" ? 140 : mealType === "medium" ? 80 : 20;
    return Math.max(250, baseGrams + hoursFactor - mealDeduction);
  };

  const portion1 = calculatePortion(1, "heavy");
  assert.ok(portion1 >= 250);

  const portion2 = calculatePortion(8, "light");
  assert.ok(portion2 > portion1);
});

test("Collector ranks transition accurately based on seals count", () => {
  const calculateRank = (sealCount) => {
    if (sealCount >= 12) return "Master";
    if (sealCount >= 8) return "Artisan";
    if (sealCount >= 4) return "Journeyman";
    return "Apprentice";
  };

  assert.equal(calculateRank(0), "Apprentice");
  assert.equal(calculateRank(3), "Apprentice");
  assert.equal(calculateRank(4), "Journeyman");
  assert.equal(calculateRank(7), "Journeyman");
  assert.equal(calculateRank(8), "Artisan");
  assert.equal(calculateRank(11), "Artisan");
  assert.equal(calculateRank(12), "Master");
});
