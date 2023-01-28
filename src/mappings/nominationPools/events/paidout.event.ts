import { SubstrateEvent } from '@subql/types';
import { getEventId, getExtrinsicId } from '../../../helper/event.helper';
import { NominationPoolPaidOutEvent } from '../../../types';

export async function handleEventNominationPoolsPaidOut(event: SubstrateEvent): Promise<void> {
  const account = event.event.data[0].toString();
  const pool_id = event.event.data[1].toString();
  const amount = event.event.data[2].toString();
  const timestamp = event.block.timestamp;

  const record = new NominationPoolPaidOutEvent(getEventId(event));
  record.ext_id = getExtrinsicId(event);
  record.account = account;
  record.amount = BigInt(amount);
  record.pool_id = Number(pool_id);
  record.timestamp = timestamp;

  await record.save();
}
