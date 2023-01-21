import { SubstrateExtrinsic } from '@subql/types';
import { NominationPoolJoin } from '../../types';

export async function handleExtrinsicJoinPools(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const timestamp = extrinsic.block.timestamp;
  const pool_id = extrinsic.extrinsic.args[1];
  const amount = extrinsic.extrinsic.args[0];
  const depositor = extrinsic.extrinsic.signer.toString();

  const record = new NominationPoolJoin(
    `${extrinsic.block.block.header.number}-${extrinsic.idx}`
  );

  record.timestamp = timestamp;
  record.poolID = Number(pool_id);
  record.amount = BigInt(amount.toString());
  record.account = depositor;
  await record.save();
}
