import { ObjectType, Field, Int } from '@nestjs/graphql';
import { UserRole } from 'src/common/enums';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity("users")
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field(() => String, { description: 'User unique identifier' })
  id: string;

  @Column({ length: 320 })
  @Field(() => String, { description: 'User unique email' })
  email: string;

  @Column({ length: 100 })
  @Field(() => String, { description: 'User role' })
  role: UserRole;

  @Column({ length: 30, name: "public_id" })
  @Field(() => String, { description: 'User unique identifier' })
  publicId: string;

  @Column({ name: "oauth_id" })
  oauthId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
