import { Column, Entity, } from 'typeorm';

import {BaseEntity} from "../../utils/model/base.entity";

@Entity('advertise')
export class AdvertiseEntity extends BaseEntity{

  @Column()
  note: string;

  @Column({default: ''})
  url: string;

  @Column()
  banner: string;
}
