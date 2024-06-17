export class CompanyEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly address: string;
  public readonly tel: string;

  public constructor(entity: CompanyEntity) {
    this.id = entity.id;
    this.name = entity.name;
    this.address = entity.address;
    this.tel = entity.tel;
  }
}
