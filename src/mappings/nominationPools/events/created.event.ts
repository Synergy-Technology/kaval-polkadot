//A new pool has been created by a depositor.
import {SubstrateEvent} from '@subql/types';
import { NominationPoolCreatedEvent } from '../../../types';

export async function handleEventNominationPoolCreatedEvent(event: SubstrateEvent): Promise<void> {
  logger.info(`NominationPoolCreatedEvent: ${event.block.block.header.number}-${event.idx}`);
  const id = `${event.block.block.header.number}-${event.idx}`;
  const pool = new NominationPoolCreatedEvent(id);
  pool.ext_id = `${event.block.block.header.number}-${event.extrinsic.idx}`;

  pool.depositor = event.event.data[0].toString();
  pool.poolId = Number(event.event.data[1].toString());
  pool.timestamp = event.block.timestamp;
  pool.save();
}