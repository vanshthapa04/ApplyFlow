import bcrypt from "bcrypt";
import { pool } from "../db";

async function seed() {
  try {
    console.log("🌱 Seeding database...");

    // Clear existing demo data
    await pool.query("DELETE FROM interviews");
    await pool.query("DELETE FROM applications");
    await pool.query("DELETE FROM companies");
    await pool.query("DELETE FROM users");

    // Create demo user
    const password = await bcrypt.hash("Password@123", 10);

    const userResult = await pool.query(
      `
      INSERT INTO users
      (
        full_name,
        email,
        password
      )
      VALUES
      (
        $1,
        $2,
        $3
      )
      RETURNING id;
      `,
      [
        "Demo User",
        "demo@applyflow.com",
        password,
      ]
    );

    const userId = userResult.rows[0].id;

    console.log("✅ Demo user created");

// ----------------------------
// Create Demo Companies
// ----------------------------

const companies = [
    {
      name: "Google",
      website: "https://google.com",
      industry: "Technology",
      location: "Bangalore",
    },
    {
      name: "Microsoft",
      website: "https://microsoft.com",
      industry: "Technology",
      location: "Hyderabad",
    },
    {
      name: "Amazon",
      website: "https://amazon.com",
      industry: "E-Commerce",
      location: "Chennai",
    },
    {
      name: "Adobe",
      website: "https://adobe.com",
      industry: "Software",
      location: "Noida",
    },
    {
      name: "Flipkart",
      website: "https://flipkart.com",
      industry: "E-Commerce",
      location: "Bangalore",
    },
  ];
  
  const companyIds: string[] = [];
  
  for (const company of companies) {
    const result = await pool.query(
      `
      INSERT INTO companies
      (
        user_id,
        name,
        website,
        industry,
        location
      )
      VALUES
      (
        $1,$2,$3,$4,$5
      )
      RETURNING id;
      `,
      [
        userId,
        company.name,
        company.website,
        company.industry,
        company.location,
      ]
    );
  
    companyIds.push(result.rows[0].id);
  }
  
  console.log("✅ Demo companies created");

  console.log("🎉 Companies seeded successfully.");

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();