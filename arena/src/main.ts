import { BattleArena } from './battle-arena'
import { Dragon, Elf, Troll } from './creatures'

const arena = new BattleArena()

arena.addCreature(new Dragon('Draco'))
arena.addCreature(new Elf('Legolas'))
arena.addCreature(new Troll('Grog'))

console.log(arena.startBattle())
