import { Field, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { StatusAddress } from '../../../shared/enums/status-address.enum';
import { Patient } from '../../patient/entities/patient.entity';

@ObjectType()
@Entity('address')
export class Address {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Field()
  @Column()
  state: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  number: number;

  @Field()
  @Column()
  zipCode: string;

  @Field()
  @Column()
  neighbourhood: string;

  @Field()
  @Column({ nullable: true, default: StatusAddress.active })
  status?: StatusAddress;

  @Field()
  @Column()
  patientId: string;

  @OneToOne(() => Patient, (patient) => patient.id)
  @JoinColumn({ name: 'patientId' })
  patient: Patient;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
