import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTables1755977403112 implements MigrationInterface {
    name = 'CreateUserTables1755977403112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_profiles\` (\`user_id\` varchar(255) NOT NULL, \`fullname\` varchar(100) NULL, \`biography\` varchar(1000) NULL, \`birth_date\` date NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(320) NOT NULL, \`role\` varchar(100) NOT NULL, \`public_id\` varchar(30) NOT NULL, \`oauth_id\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_848b8b23bf0748243d4e1e76ae\` (\`public_id\`), UNIQUE INDEX \`IDX_bdf9884582327ef0eab65a29ea\` (\`oauth_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_profiles\` ADD CONSTRAINT \`fk_user_profile_user_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_profiles\` DROP FOREIGN KEY \`fk_user_profile_user_id\``);
        await queryRunner.query(`DROP INDEX \`IDX_bdf9884582327ef0eab65a29ea\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_848b8b23bf0748243d4e1e76ae\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`user_profiles\``);
    }

}
