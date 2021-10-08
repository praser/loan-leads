import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm'

export class createLead1633474551872 implements MigrationInterface {
  name = 'createLead1633474551872'

  table = 'lead'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.table,
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isUnique: true,
            isNullable: false,
            length: '36',
          },
          { name: 'name', type: 'varchar', isNullable: true, length: '255' },
          { name: 'age', type: 'int', isNullable: true },
        ],
      }),
    )

    await queryRunner.createIndex(
      this.table,
      new TableIndex({
        name: 'IDX_ID',
        columnNames: ['id'],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(this.table, 'IDX_ID')
    await queryRunner.dropTable(this.table)
  }
}

export default createLead1633474551872
