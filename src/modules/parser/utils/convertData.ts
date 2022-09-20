export const ADAPTER_TYPE_VERIFY = {
  DATE: 'date'
}

export class AdapterCSVData {
  private readonly data = [];
  private results = [];
  private invalidData = [];
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

  verify(column: string, type: string) {
    this.results = this.results.filter(item => {
      if (type === ADAPTER_TYPE_VERIFY.DATE) {
        return this.verifyDate(item[column])
      }
      return true;
    });

    return this;
  }

  getColumns() {
    return this.columns;
  }

  getResults() {
    return this.results;
  }

  getInvalidData() {
    return this.invalidData;
  }

  private verifyDate(date) {
    if (!!Date.parse(date)) {
      return true
    }

    this.invalidData.push({
      type: ADAPTER_TYPE_VERIFY.DATE,
      value: date
    });

    return false;
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
