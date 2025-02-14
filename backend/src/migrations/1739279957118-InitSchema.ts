import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1739279957118 implements MigrationInterface {
  name = "InitSchema1739279957118";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" ("id" character varying NOT NULL, "name" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "totalTickets" integer NOT NULL, "availableTickets" integer NOT NULL, "isFutureEvent" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_event_future" ON "event" ("isFutureEvent") `,
    );
    await queryRunner.query(`CREATE INDEX "idx_event_id" ON "event" ("id") `);
    await queryRunner.query(
      `CREATE INDEX "idx_event_date" ON "event" ("date") `,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" character varying NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TYPE "public"."order_status_enum" AS ENUM('active', 'cancelled', 'refunded')`,
    );
    await queryRunner.query(
      `CREATE TABLE "order" ("id" character varying NOT NULL, "orderNumber" character varying NOT NULL, "eventId" character varying NOT NULL, "userId" character varying NOT NULL, "ticketCount" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "purchaseDate" TIMESTAMP NOT NULL DEFAULT now(), "status" "public"."order_status_enum" NOT NULL DEFAULT 'active', CONSTRAINT "UQ_4e9f8dd16ec084bca97b3262edb" UNIQUE ("orderNumber"), CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_order_status" ON "order" ("status") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_order_user_id" ON "order" ("userId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_order_event_id" ON "order" ("eventId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_b76e4eedb99633c207ab48cdd3e" FOREIGN KEY ("eventId") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`,
    );
    await queryRunner.query(
      `ALTER TABLE "order" DROP CONSTRAINT "FK_b76e4eedb99633c207ab48cdd3e"`,
    );
    await queryRunner.query(`DROP INDEX "public"."idx_order_event_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_order_user_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_order_status"`);
    await queryRunner.query(`DROP TABLE "order"`);
    await queryRunner.query(`DROP TYPE "public"."order_status_enum"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP INDEX "public"."idx_event_date"`);
    await queryRunner.query(`DROP INDEX "public"."idx_event_id"`);
    await queryRunner.query(`DROP INDEX "public"."idx_event_future"`);
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
