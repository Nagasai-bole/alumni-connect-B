// src/pages/api/alumni.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { mockAlumni } from "@/data/mockData"; // You can keep mock data here for now

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // GET /api/alumni
  if (req.method === "GET") {
    res.status(200).json({ alumni: mockAlumni });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
