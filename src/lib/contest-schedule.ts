import type { PhotoContestConfig } from './content-types';

/**
 * Bounds are datetime-local strings (yyyy-MM-ddTHH:mm, local time) or ''
 * for no bound.
 */
function isWithinWindow(start: string, end: string, now: Date): boolean {
  if (start && now < new Date(start)) return false;
  if (end && now > new Date(end)) return false;
  return true;
}

export function isVotingOpen(config: PhotoContestConfig, now: Date = new Date()): boolean {
  return config.votingOpen && isWithinWindow(config.votingStartDate, config.votingEndDate, now);
}

export function isSubmissionsOpen(config: PhotoContestConfig, now: Date = new Date()): boolean {
  return config.submissionsOpen && isWithinWindow(config.submissionsStartDate, config.submissionsEndDate, now);
}
