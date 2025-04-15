// models/messageModel.js
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFile = path.join(__dirname, '../data/messages.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  const dataDir = path.join(__dirname, '../../chatData');
  try {
    await fs.access(dataDir);
  } catch (error) {
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(dataFile, JSON.stringify({}));
  }
};

// Initialize storage
const initStorage = async () => {
  await ensureDataDir();
  try {
    await fs.access(dataFile);
  } catch (error) {
    await fs.writeFile(dataFile, JSON.stringify({}));
  }
};

// Save a message
export const saveMessage = async (roomId, message) => {
  await initStorage();

  let messages;
  try {
    const data = await fs.readFile(dataFile, 'utf8');
    messages = JSON.parse(data);
  } catch (error) {
    messages = {};
  }

  if (!messages[roomId]) {
    messages[roomId] = [];
  }

  messages[roomId].push(message);
  await fs.writeFile(dataFile, JSON.stringify(messages, null, 2));
  return message;
};

// Get messages for a room
export const getMessagesByRoom = async (roomId) => {
  await initStorage();

  try {
    const data = await fs.readFile(dataFile, 'utf8');
    const messages = JSON.parse(data);
    return messages[roomId] || [];
  } catch (error) {
    return [];
  }
};
