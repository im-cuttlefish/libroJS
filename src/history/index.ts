import Dexie from "dexie";

class HistoryDatabase extends Dexie {
  histories: Dexie.Table<HistoryData, number>;

  constructor() {
    super("HistoryDatabase");
    this.version(1).stores({
      histories: "++id, date, url, title"
    });
  }
}

export interface HistoryData {
  id?: number;
  date: string;
  url: string;
  title: string;
}

export class History {
  private db: HistoryDatabase;

  constructor() {
    this.db = new HistoryDatabase();
  }

  // 以下は本来はエラー設計すべき
  async set(data: HistoryData) {
    await this.db.histories.put(data);
  }

  async get() {
    const histories: HistoryData[] = [];
    this.db.histories.each(data => histories.push(data));
    return histories;
  }

  async delete(id: number) {
    await this.db.histories.delete(id);
  }

  async clear() {
    await this.db.histories.clear();
  }
}
