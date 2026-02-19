export function getRankColor(rank: number) {
  switch (rank) {
    case 1: return 'warning'
    case 2: return 'neutral'
    case 3: return 'error'
    default: return 'neutral'
  }
}
