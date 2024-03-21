import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateEmailTable1710639083618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'email',
                columns: [
                    {
                        name: 'Id',
                        type: 'serial',
                        isPrimary: true,
                        primaryKeyConstraintName: 'PK_Email'
                    },
                    {
                        name: 'name',
                        type: 'varchar(100)'
                    },
                    {
                        name: 'email',
                        type: 'varchar(150)'
                    },
                    {
                        name: 'message',
                        type: 'text'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('email')
    }

}
