import { SubstrateEvent } from '@subql/types';
import { NominationPoolPaidOutEvent } from '../../../types';

export async function handleEventPaidOut(event: SubstrateEvent): Promise<void> {
  const id = `${event.block.block.header.number}-${event.idx}`;
  const extrinsic_id = `${event.block.block.header.number}-${event.extrinsic.idx}`;
  const account = event.event.data[0].toString();
  const pool_id = event.event.data[1].toString();
  const amount = event.event.data[2].toString();
  const timestamp = event.block.timestamp;

  const record = new NominationPoolPaidOutEvent(id);
  record.ext_id = extrinsic_id;
  record.account = account;
  record.amount = BigInt(amount);
  record.poolID = Number(pool_id);
  record.timestamp = timestamp;

  await record.save();
}
