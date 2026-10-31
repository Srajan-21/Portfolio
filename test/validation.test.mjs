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

test("Sticker levels transition accurately based on stickers collected", () => {
  const calculateLevel = (stickers) => {
    if (stickers >= 30) return "Legend";
    if (stickers >= 15) return "Pro";
    if (stickers >= 5) return "Rookie";
    return "Newbie";
  };

  assert.equal(calculateLevel(0), "Newbie");
  assert.equal(calculateLevel(4), "Newbie");
  assert.equal(calculateLevel(5), "Rookie");
  assert.equal(calculateLevel(14), "Rookie");
  assert.equal(calculateLevel(15), "Pro");
  assert.equal(calculateLevel(29), "Pro");
  assert.equal(calculateLevel(30), "Legend");
  assert.equal(calculateLevel(100), "Legend");
});
