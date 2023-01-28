import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolUnbondedEvent } from "../../../types";


export async function handleEventNominationPoolsUnbonded(event:SubstrateEvent):Promise<void>{
   const unbonded = new NominationPoolUnbondedEvent(getEventId(event));
   unbonded.extrinsic_id = getExtrinsicId(event);
    unbonded.account = event.event.data[0].toString();
    unbonded.pool_id = Number(event.event.data[1].toString());
    unbonded.request_amount_to_unbond = BigInt(event.event.data[2].toString());
    unbonded.actual_amount_unbond = BigInt(event.event.data[3].toString());
    unbonded.era_to_claim = Number(event.event.data[4].toString());
    unbonded.timestamp = event.block.timestamp;
    unbonded.save();
}