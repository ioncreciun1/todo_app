
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';

@Entity({ name: "todo" })
export class ToDoEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: "varchar", length: 100 })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ type: "boolean", nullable: false, default:false })
    isCompleted: boolean;

    @Column({ type: "date", nullable: true })
    completedDate: Date;

    @CreateDateColumn()
    createdAt: Date; // Creation date

    @UpdateDateColumn()
    uodatedAt: Date; // Last updated date

    @DeleteDateColumn()
    deletedAt: Date; // Deletion date
}
