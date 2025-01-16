import { AbstractEntity } from '@app/common';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends AbstractEntity<User> {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'simple-array' })
  roles: string[];
}
