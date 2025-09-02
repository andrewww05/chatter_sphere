import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profiles')
@ObjectType()
export class UserProfile {
    @PrimaryColumn('uuid', { name: "user_id" })
    userId: string;

    @Column({ length: 100, nullable: true })
    @Field(() => String, { description: "User's full name", nullable: true })
    fullname: string;

    @Column({ length: 1000, nullable: true })
    @Field(() => String, { description: "User's biography", nullable: true })
    biography: string;

    @Column("date", { name: "birth_date" })
    @Field(() => Date, { description: "User's birth date" })
    birthDate: Date;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
    
    // Relations
    @OneToOne(() => User, (user) => user.profile)
    @JoinColumn({ name: 'user_id', foreignKeyConstraintName: 'fk_user_profile_user_id' })
    user: User;
}
