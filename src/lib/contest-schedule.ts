import type { PhotoContestConfig } from './content-types';

/**
 * Date bounds are plain yyyy-mm-dd strings (or '' for no bound), compared
 * against local midnight so the end date is inclusive of the whole day.
 */
function isWithinWindow(start: string, end: string, now: Date): boolean {
  if (start && now < new Date(`${start}T00:00:00`)) return false;
  if (end && now > new Date(`${end}T23:59:59`)) return false;
  return true;
}

export function isVotingOpen(config: PhotoContestConfig, now: Date = new Date()): boolean {
  return config.votingOpen && isWithinWindow(config.votingStartDate, config.votingEndDate, now);
}

export function isSubmissionsOpen(config: PhotoContestConfig, now: Date = new Date()): boolean {
  return config.submissionsOpen && isWithinWindow(config.submissionsStartDate, config.submissionsEndDate, now);
}
