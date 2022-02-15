export default class Key {
  private kc: number;
  private _key: string;
  private cd: string;
  private ctk: boolean;
  private alk: boolean;
  private rpt: boolean;
  constructor(
    keyCode: number,
    key: string,
    code: string,
    controlKey: boolean,
    altKey: boolean,
    repeated: boolean
  ) {
    this.kc = keyCode;
    this._key = key;
    this.cd = code;
    this.ctk = controlKey;
    this.alk = altKey;
    this.rpt = repeated;
  }

  get keyCode(): number {
    return this.kc;
  }
  get key(): string {
    return this._key;
  }
  get code(): string {
    return this.cd;
  }
  get controlKey(): boolean {
    return this.ctk;
  }
  get altKey(): boolean {
    return this.alk;
  }
  get repeated(): boolean {
    return this.rpt;
    }
    
    toString(): string {
        return "Key[" + this.key + "(" + this.keyCode + ")]"
    }
}