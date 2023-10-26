type Updates = {
  status: string;
  visibleStatus: string;
  description: string;
  updatedAt: string;
}[];

export default function findMostRecentUpdate(updates: Updates) {

  const result = updates?.length
    ? updates.reduce((mostRecent, update) =>
        new Date(update.updatedAt) > new Date(mostRecent.updatedAt)
          ? update
          : mostRecent
      )
    : null;
  
  return result;
}
