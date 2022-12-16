import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
// Creating an entity in mysql is qs follows with columns
@Entity()
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'user_id',
  })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  username: string;

  @Column({
    name: 'email_address',
    nullable: false,
    default: '',
  })
  emailAddress: string;

  @Column({
    nullable: false,
    default: '',
  })
  password: string;
}
