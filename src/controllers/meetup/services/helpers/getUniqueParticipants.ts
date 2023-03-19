export const getUniqueParticipants = (
  participantIds: number[],
  organizerId: number
): number[] =>
  Array.from(
    new Set(
      participantIds.filter((participant_id) => participant_id !== organizerId)
    )
  );
