import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolDestroyedEvent } from "../../../types";

export async function handleEventNominationPoolsDestroyed(event: SubstrateEvent): Promise<void> {
    const destroyed = new NominationPoolDestroyedEvent(getEventId(event));
    destroyed.extrinsic_id =  getExtrinsicId(event);
    destroyed.pool_id = Number(event.event.data[0].toString());
    destroyed.timestamp = event.block.timestamp;
    destroyed.save();
}