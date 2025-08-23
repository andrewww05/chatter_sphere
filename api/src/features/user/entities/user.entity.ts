import { ObjectType, Field } from '@nestjs/graphql';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserProfile } from './user-profile.entity';

@Entity('users')
@ObjectType()
export class User {
    @PrimaryGeneratedColumn('uuid')
    @Field(() => String, { description: 'User unique identifier' })
    id: string;

    @Column({ length: 320, unique: true })
    @Field(() => String, { description: 'User unique email' })
    email: string;

    @Column({ length: 100 })
    @Field(() => String, { description: 'User role' })
    role: string;

    @Column({ length: 30, name: 'public_id', unique: true })
    @Field(() => String, { description: 'User unique identifier' })
    publicId: string;

    @Column({ name: 'oauth_id', nullable: true, unique: true })
    oauthId: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    // Relations
    @OneToOne(() => UserProfile, (profile) => profile.user, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    })
    profile: UserProfile;
}
