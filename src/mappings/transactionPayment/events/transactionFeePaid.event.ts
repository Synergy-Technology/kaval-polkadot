import { SubstrateEvent } from '@subql/types';
import { TransactionFeePaidEvent } from '../../../types';

export async function handleEventTransactionFeePaid(
  event: SubstrateEvent
): Promise<void> {
  const id = `${event.block.block.header.number}-${event.idx}`;
  const extrinsic_id = `${event.block.block.header.number}-${event.extrinsic.idx}`;
  const account = event.event.data[0].toString();
  const actual_fees = event.event.data[1].toString();
  const tip = event.event.data[2].toString();

  const record = new TransactionFeePaidEvent(id);
  record.extrinsic_id = extrinsic_id;
  record.payee = account;
  record.actual_fee = BigInt(actual_fees);
  record.tip = BigInt(tip);
  record.module = event.extrinsic.extrinsic.method.section;
  record.method = event.extrinsic.extrinsic.method.method;
  record.timestamp = event.block.timestamp;

  await record.save();
}
