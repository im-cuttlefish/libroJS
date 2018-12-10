import { Dexie } from "dexie";

interface HistoryData {
  id?: number;
  date: string;
  url: string;
  index: number;
}

class HistoryDatabase extends Dexie {
  histories: Dexie.Table<HistoryData, number>;

  constructor() {
    super("HistoryDatabase");
    this.version(1).stores({
      histories: "++id, date, url, index"
    });
  }
}

const map = new Map();

export class History {
  private db: HistoryDatabase;

  constructor() {
    this.db = new HistoryDatabase();
  }

  // 以下は本来はエラー設計すべき
  async set(data: HistoryData) {
    await this.db.histories.put(data);
  }

  async get(id?: number) {
    if (id !== undefined) {
      return await this.db.histories.get(id);
    }
    const histories = [];
    this.db.histories.each(data => histories.push(data));
    return histories;
  }

  async delete(id: number) {
    await this.db.histories
      .where("id")
      .equals(id)
      .delete();
  }

  async clear() {
    await this.db.histories.clear();
  }
}
