
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: "user" })
export class UserEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 50, nullable:false })
    username: string;

    @Column({ type: "text", nullable: false })
    password: string;

    @CreateDateColumn()
    createdAt: Date; // Creation date

    @UpdateDateColumn()
    uodatedAt: Date; // Last updated date

    @DeleteDateColumn()
    deletedAt: Date; // Deletion date
}
