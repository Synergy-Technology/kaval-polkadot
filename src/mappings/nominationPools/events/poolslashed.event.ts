import { SubstrateEvent } from "@subql/types";
import { NominationPoolSlashedEvent } from "../../../types";

export async function handleEventNominationPoolPoolSlashed(event: SubstrateEvent): Promise<void> {
    const id = `${event.block.block.header.number}-${event.idx}`;
    const pool = new NominationPoolSlashedEvent(id);
    pool.ext_id = `${event.block.block.header.number}-${event.extrinsic.idx}`;
    
    pool.poolId = Number(event.event.data[0].toString());
    pool.amount = BigInt(event.event.data[1].toString());
    pool.timestamp = event.block.timestamp;
    pool.save();
}