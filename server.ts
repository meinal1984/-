import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Ensure data directory exists for persistent storage
const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "schedules.json");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial sample data if file does not exist
if (!fs.existsSync(DATA_FILE)) {
  const defaultSchedules = [
    {
      id: "doc-1",
      title: "দৈনন্দিন কর্মসূচি - ১ আগস্ট ২০২৬",
      date: "২০২৬-০৮-০১",
      letterhead: {
        govtTitle: "গণপ্রজাতন্ত্রী বাংলাদেশ সরকার",
        officeName: "জেলা প্রশাসকের কার্যালয়, ঢাকা",
        branchName: "সাধারণ শাখা",
        memoNo: "০৫.৪১.২৬০০.০১১.২৪.০০২.২৬.১৫০",
        issueDate: "১৬ শ্রাবণ ১৪৩৩ / ১ আগস্ট ২০২৬",
        subject: "মান্যবর জেলা প্রশাসকের দৈনন্দিন কর্মসূচি ও নির্ধারিত সভার নোটিশ",
        signatoryName: "মো: রফিকুল ইসলাম",
        signatoryDesignation: "সহকারী কমিশনার (সাধারণ শাখা)",
        signatoryPhone: "০২-৯৫৫১২২১",
        signatoryEmail: "dc.dhaka@mopa.gov.bd",
        showEmblem: true,
        emblemPreset: "bd_crest"
      },
      items: [
        {
          id: "item-1",
          serialNo: "১",
          dateTime: "সকাল ০৯:৩০ মিনিট",
          description: "জেলা ডিজিটাল উদ্ভাবনী মেলা ২০২৬ আয়োজনের প্রস্তুতিমূলক পর্যালোচনা সভা",
          venue: "সম্মেলন কক্ষ (২য় তলা), জেলা প্রশাসকের কার্যালয়",
          chairperson: "জেলা প্রশাসক ও জেলা ম্যাজিস্ট্রেট, ঢাকা",
          remarks: "সকল অতিরিক্ত জেলা প্রশাসক ও উপজেলা নির্বাহী অফিসারগণ উপস্থিত থাকবেন।"
        },
        {
          id: "item-2",
          serialNo: "২",
          dateTime: "সকাল ১১:০০ টা",
          description: "আইন-শৃঙ্খলা সংক্রান্ত জেলা কমিটির মাসিক সভা",
          venue: "শহীদ আলতাফ মিলনায়তন, ঢাকা",
          chairperson: "জেলা প্রশাসক, ঢাকা",
          remarks: "পুলিশ সুপার, ঢাকা এবং সংশ্লিষ্ট দপ্তর প্রধানগণ অংশ নেবেন।"
        },
        {
          id: "item-3",
          serialNo: "৩",
          dateTime: "দুপুর ০২:৩০ মিনিট",
          description: "উপজেলা পর্যায়ে উন্নয়ন প্রকল্পসমূহের বাস্তবায়ন অগ্রগতি তদারকি বৈঠক",
          venue: "অনলাইন (জুম প্ল্যাটফর্ম)",
          chairperson: "অতিরিক্ত জেলা প্রশাসক (সার্বিক)",
          remarks: "যাবতীয় বাস্তবায়ন প্রতিবেদন উপস্থাপনের নির্দেশ দেয়া হলো।"
        },
        {
          id: "item-4",
          serialNo: "৪",
          dateTime: "বিকাল ০৪:০০ টা",
          description: "সাধারণ জনগণের গণশুনানি ও স্মারকলিপি গ্রহণ",
          venue: "জেলা প্রশাসকের অফিস কক্ষ",
          chairperson: "জেলা প্রশাসক, ঢাকা",
          remarks: "জনসাধারনের অভিযোগ নিস্পত্তি শাখা বাস্তবায়ন করবে।"
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];
  fs.writeFileSync(DATA_FILE, JSON.stringify(defaultSchedules, null, 2), "utf-8");
}

// Helper to read database
function readDatabase() {
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Error reading database:", err);
    return [];
  }
}

// Helper to write database
function writeDatabase(data: any) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

// API Routes
app.get("/api/schedules", (req, res) => {
  const data = readDatabase();
  res.json(data);
});

app.post("/api/schedules", (req, res) => {
  const newDoc = req.body;
  if (!newDoc.id) {
    newDoc.id = "doc-" + Date.now();
  }
  newDoc.createdAt = newDoc.createdAt || new Date().toISOString();
  newDoc.updatedAt = new Date().toISOString();

  const data = readDatabase();
  data.unshift(newDoc);
  writeDatabase(data);
  res.status(201).json(newDoc);
});

app.put("/api/schedules/:id", (req, res) => {
  const { id } = req.params;
  const updatedDoc = req.body;
  updatedDoc.updatedAt = new Date().toISOString();

  let data = readDatabase();
  const index = data.findIndex((item: any) => item.id === id);
  if (index !== -1) {
    data[index] = { ...data[index], ...updatedDoc };
    writeDatabase(data);
    res.json(data[index]);
  } else {
    data.unshift(updatedDoc);
    writeDatabase(data);
    res.status(200).json(updatedDoc);
  }
});

app.delete("/api/schedules/:id", (req, res) => {
  const { id } = req.params;
  let data = readDatabase();
  data = data.filter((item: any) => item.id !== id);
  writeDatabase(data);
  res.json({ success: true, id });
});

// Auto Notification Sending API endpoint
app.post("/api/send-notification", (req, res) => {
  const { type, recipients, subject, message, documentId } = req.body;
  
  console.log(`[NOTIFICATION DISPATCH] Type: ${type} | Recipient count: ${recipients?.length || 0}`);
  
  // Return simulated successful dispatch response for email & WhatsApp
  res.status(200).json({
    success: true,
    type,
    recipientCount: recipients?.length || 0,
    timestamp: new Date().toISOString(),
    message: "নোটিফিকেশন সফলভাবে তৈরি ও সেন্ড কিউতে প্রসেস করা হয়েছে!",
  });
});

async function startServer() {
  // Vite middleware in dev mode
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
}

startServer();
