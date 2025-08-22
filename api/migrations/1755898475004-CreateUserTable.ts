import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1755898475004 implements MigrationInterface {
    name = 'CreateUserTable1755898475004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(320) NOT NULL, \`role\` varchar(100) NOT NULL, \`public_id\` varchar(30) NOT NULL, \`oauth_id\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
