import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolSlashedEvent } from "../../../types";

export async function handleEventNominationPoolsPoolSlashed(event: SubstrateEvent): Promise<void> {
    const pool = new NominationPoolSlashedEvent(getEventId(event));
    pool.extrinsic_id = getExtrinsicId(event);
    pool.pool_id = Number(event.event.data[0].toString());
    pool.amount = BigInt(event.event.data[1].toString());
    pool.timestamp = event.block.timestamp;
    pool.save();
}