export class AdapterCSVData {
  private readonly data = [];
  private results = [];
  private key;
  private columns;

  constructor(data) {
    this.data = data;
    this.key = Object.keys(this.data)[0];
    this.exactColumns();
  }

  convertToJSON() {
    this.data.forEach((item: Record<string, string>) => {
      this.results.push(this.rowToJSON(Object.values(item)[0]));
    })
    return this;
  }

  getColumns() {
    return this.columns;
  }

  getResults() {
    return this.results;
  }

  private exactColumns() {
    this.columns = Object.keys(this.data[0]).toString().split(',');
  }

  private rowToJSON(row: string) {
    const obj = {};
    const cells = row.toString().split(',');
    this.columns.forEach((column, index) => {
      obj[column] = cells[index];
    });

    return obj;
  }
}
