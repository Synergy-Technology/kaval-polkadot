import { SubstrateExtrinsic } from '@subql/types';
import {
  NominationBondExtraType,
  NominationPoolBondExtraExtrinsic,
} from '../../../types';

// store information about the bond_extra record the total fees spent on the bond_extra operation
export async function handleExtrinsicBondExtra(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const id = `${extrinsic.block.block.header.number}-${extrinsic.idx}`;
  const record = new NominationPoolBondExtraExtrinsic(id);
  record.type = NominationBondExtraType[digestBondType(extrinsic)];
  record.account = extrinsic.extrinsic.signer.toString();
  record.timestamp = extrinsic.block.timestamp;
  await record.save();
}

function guardBondType(bondType: string) {
  if (bondType === undefined || bondType === null) {
    throw new Error('bondType is undefined');
  }
  return bondType;
}

export function digestBondType(extrinsic: SubstrateExtrinsic) {
  try {
    const extra = JSON.parse(extrinsic.extrinsic.args.toString());
    return guardBondType(Object.keys(extra)[0].toUpperCase());
  } catch (error) {
    return guardBondType(extrinsic.extrinsic.args.toString().toUpperCase());
  }
}
