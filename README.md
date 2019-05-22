#  Turn-Based Board Game Written in JavaScript and jQuery

Online game  in which 2 players play each turn to compete.

- Randomly generating the game map. Each box can be either: Empty or Unavailable (dimmed).
- For each turn, a player can move from one to three boxes (horizontally or vertically) before ending their turn.
- Players can not pass through obstacles.
- If a player passes over a box containing a weapon, they leave their current weapon on site and replace it with the new one.
- If players cross over adjacent squares (horizontally or vertically), a battle begins.
- Each player attacks in turn
- The damage depends on the player's weapon
- The player can choose to attack or defend against the next shot
- If the player chooses to defend, they sustain 50% less damage than normal
- When the life points (initially 100) falls to 0, they lose. A message appears and the game is over.

Play the Game: https://mario-sko.github.io/game-js-jquery/ 
