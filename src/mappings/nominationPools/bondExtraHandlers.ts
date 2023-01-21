import {
  SubstrateExtrinsic,
  SubstrateEvent,
  SubstrateBlock,
} from '@subql/types';
import { NominationPoolBondExtra } from '../../types';
import { Balance } from '@polkadot/types/interfaces';

// store information about the bond_extra record the total fees spent on the bond_extra operation
export async function handleExtrinsicBondExtra(
  extrinsic: SubstrateExtrinsic
): Promise<void> {
  const id = `${extrinsic.block.block.header.hash.toString()}-${extrinsic.idx}`;
  const record = new NominationPoolBondExtra(
    extrinsic.block.block.header.hash.toString()
  );

  const type = extrinsic.extrinsic.args[0];
  const value = extrinsic.extrinsic.args[1];

  logger.info(`acount: ${extrinsic.toString()}`);
  await record.save();
}

/**
 * [1 items
0:{4 items
"name":"extra"
"type":"pallet_nomination_pools:BondExtra"
"type_name":"BondExtra<BalanceOf>"
"value":{1 items
"FreeBalance":"52147122719"
}
}
]


 */
