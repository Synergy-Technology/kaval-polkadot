import { SubstrateEvent } from "@subql/types";
import { getEventId, getExtrinsicId } from "../../../helper/event.helper";
import { NominationPoolUnbondingPoolSlashed } from "../../../types";

export async function handleEventNominationUnbondingPoolSlashed(
    event: SubstrateEvent
): Promise<void> {
    const unbonding_slashed = new NominationPoolUnbondingPoolSlashed(getEventId(event));
    unbonding_slashed.extrinsic_id = getExtrinsicId(event);
    unbonding_slashed.pool_id = Number(event.event.data[0].toString());
    unbonding_slashed.era = Number(event.event.data[1].toString());
    unbonding_slashed.amount = BigInt(event.event.data[2].toString());
    unbonding_slashed.timestamp = event.block.timestamp;
    unbonding_slashed.save();
}