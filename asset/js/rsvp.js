import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'rsvp.json');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const data = fs.readFileSync(filePath);
      res.status(200).json(JSON.parse(data));
    } catch (err) {
      res.status(500).json({ error: 'Gagal membaca file JSON' });
    }
  }

  if (req.method === 'POST') {
    try {
      const { name, status } = req.body;
      const existingData = JSON.parse(fs.readFileSync(filePath));
      existingData.push({ name, status });
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      res.status(200).json({ message: 'Data berhasil ditambahkan' });
    } catch (err) {
      res.status(500).json({ error: 'Gagal menulis ke file JSON' });
    }
  }
}
