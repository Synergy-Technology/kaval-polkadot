import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolMemberRemoved } from "../../../types";

export async function handleEventNominationPoolsMemberRemoved(event: SubstrateEvent): Promise<void> {
    const memberRemoved = new NominationPoolMemberRemoved(getEventId(event));
    memberRemoved.extrinsic_id = getExtrinsicId(event);
    memberRemoved.pool_id = Number(event.event.data[0].toString());
    memberRemoved.account = event.event.data[1].toString();
    memberRemoved.timestamp = event.block.timestamp;
    memberRemoved.save();
}