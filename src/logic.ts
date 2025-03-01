import { Player } from "./App.tsx";

const shuffleArray = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const splitPlayersIntoTeams = (players: Player[]) => {
  // Step 0: Shuffle the players to introduce randomness
  const shuffledPlayers = shuffleArray([...players]);

  // Step 1: Sort players by level in descending order
  const sortedPlayers = shuffledPlayers.sort((a, b) => b.level - a.level);

  // Step 2: Initialize teams and their total levels
  const teamA: Player[] = [];
  const teamB: Player[] = [];
  let totalLevelA = 0;
  let totalLevelB = 0;

  // Step 3: Assign players to teams
  //   for (const player of sortedPlayers) {
  //     if (totalLevelA <= totalLevelB) {
  //       teamA.push(player);
  //       totalLevelA += player.level;
  //     } else {
  //       teamB.push(player);
  //       totalLevelB += player.level;
  //     }
  //   }

  //   // Step 4: Ensure the level difference is within ±2
  //   while (Math.abs(totalLevelA - totalLevelB) > 2) {
  //     if (totalLevelA > totalLevelB) {
  //       // Move a player from teamA to teamB
  //       const playerToMove = teamA.pop()!;
  //       teamB.push(playerToMove);
  //       totalLevelA -= playerToMove.level;
  //       totalLevelB += playerToMove.level;
  //     } else {
  //       // Move a player from teamB to teamA
  //       const playerToMove = teamB.pop()!;
  //       teamA.push(playerToMove);
  //       totalLevelB -= playerToMove.level;
  //       totalLevelA += playerToMove.level;
  //     }
  //   }

  for (let i = 0; i < sortedPlayers.length; i++) {
    if (
      teamA.length < sortedPlayers.length / 2 &&
      (totalLevelA <= totalLevelB || teamB.length >= sortedPlayers.length / 2)
    ) {
      teamA.push(sortedPlayers[i]);
      totalLevelA += sortedPlayers[i].level;
    } else if (
      teamB.length < sortedPlayers.length / 2 &&
      (totalLevelB <= totalLevelA || teamA.length >= sortedPlayers.length / 2)
    ) {
      teamB.push(sortedPlayers[i]);
      totalLevelB += sortedPlayers[i].level;
    } else {
      // Randomly assign to either team if both conditions are met
      if (Math.random() < 0.5) {
        teamA.push(sortedPlayers[i]);
        totalLevelA += sortedPlayers[i].level;
      } else {
        teamB.push(sortedPlayers[i]);
        totalLevelB += sortedPlayers[i].level;
      }
    }
  }

  return { teamA, teamB, totalLevelA, totalLevelB };
};
