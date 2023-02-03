import { SubstrateEvent } from '@subql/types';
import { getEventId, getExtrinsicId } from '../../../helper/event.helper';
import {
  NominationPoolCreatedEvent,
  NominationPoolRolesUpdated,
} from '../../../types';

export async function handleEventNominationPoolsRolesUpdated(
  event: SubstrateEvent
): Promise<void> {
  const rolesUpdated = new NominationPoolRolesUpdated(getEventId(event));
  rolesUpdated.extrinsic_id = getExtrinsicId(event);
  const signer = event.extrinsic.extrinsic.signer.toString();
  rolesUpdated.signer_account = signer;
  rolesUpdated.root_account = event.event.data[0].toString();
  rolesUpdated.state_toggler_account = event.event.data[1].toString();
  rolesUpdated.nominator_account = event.event.data[2].toString();
  rolesUpdated.timestamp = event.block.timestamp;
  const created = await NominationPoolCreatedEvent.getByDepositor(signer);
  rolesUpdated.pool_id = created[0].pool_id;

  rolesUpdated.save();
}
