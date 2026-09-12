import type { AttackClass } from "./types";
import { ATTACK_CLASSES_PART_1 } from "./classes-part-1";
import { ATTACK_CLASSES_PART_2 } from "./classes-part-2";
import { ATTACK_CLASSES_PART_3 } from "./classes-part-3";
import { ATTACK_CLASSES_PART_4 } from "./classes-part-4";

export const ATTACK_CLASSES: AttackClass[] = [
  ...ATTACK_CLASSES_PART_1,
  ...ATTACK_CLASSES_PART_2,
  ...ATTACK_CLASSES_PART_3,
  ...ATTACK_CLASSES_PART_4,
];
