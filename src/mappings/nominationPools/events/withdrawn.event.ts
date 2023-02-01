import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolWithdrawnEvent } from "../../../types";

export async function handleEventNominationPoolsWithdrawn(event: SubstrateEvent): Promise<void> {
    const withdrawn = new NominationPoolWithdrawnEvent(getEventId(event));
    withdrawn.extrinsic_id =  getExtrinsicId(event);
    withdrawn.account = event.event.data[0].toString();
    withdrawn.pool_id = Number(event.event.data[1].toString());
    withdrawn.balance = BigInt(event.event.data[2].toString());
    withdrawn.point = BigInt(event.event.data[3].toString());
    withdrawn.timestamp = event.block.timestamp;
    withdrawn.save();
}

