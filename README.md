# Magical Arena
## Overview
This project implements a solution to the "Magical Arena" game design problem using Node.js.

The game involves two players who fight a match in an arena. Each player has three attributes: health, strength, and attack. Players take turns attacking and defending, with the player having lower health attacking first at the start of a match. The game ends when any player's health reaches zero.

## Example Gameplay
Both players have a dice which give out a random number from 1 to 6 this. At each turn one player has to attack and other has to defend. Player attack is mulitplied to his dice outcome to calculate final attack damage, similarly for defence the other player strength is multiplied to his dice outcome to calulate defence value. If the attack value of attacking player is higher than defence value of defending player than the defender player's health is reduced by the  difference of attack value to defence value.
In this implementation of the game each player gets 10 second to roll his dice, which after the time expire the dice are automatically rolled. A further 3 second time is given before the next player takes the turn.

Player A: health=50, strength=5, attack=10
Player B: health=100, strength=10, attack=5
Both attacking and defending dice are 6-sided with values ranging from 1 to 6.
Example Turn
Player A attacks and rolls a die: Die roll = 5
Player B defends and rolls a die: Die roll = 2
Attack damage = 5 * 10 = 50
Defending strength = 10 * 2 = 20
Player B's health is reduced by 30 (50 - 20) to 70

## Next turn:

Player B attacks and rolls a die: Die roll = 4
Player A defends and rolls a die: Die roll = 3
Attack damage = 4 * 5 = 20
Defending strength = 5 * 3 = 15
Player A's health is reduced by 5 (20 - 15) to 45
And so on..

## start command : 
To run the game first install the dependencies(node_modules) then start game using dev script

npm install

npm run dev