import type { AttackClass } from "./types";
import { ATTACK_CLASSES_PART_1 } from "./classes-part-1";
import { ATTACK_CLASSES_PART_2 } from "./classes-part-2";
import { ATTACK_CLASSES_PART_3 } from "./classes-part-3";
import { ATTACK_CLASSES_PART_4 } from "./classes-part-4";
import { ATTACK_CLASSES_PART_5 } from "./classes-part-5";
import { ATTACK_CLASSES_PART_6 } from "./classes-part-6";
import { ATTACK_CLASSES_PART_7 } from "./classes-part-7";
import { ATTACK_CLASSES_PART_8 } from "./classes-part-8";
import { ATTACK_CLASSES_PART_9 } from "./classes-part-9";
import { ATTACK_CLASSES_PART_10 } from "./classes-part-10";
import { ATTACK_CLASSES_PART_11 } from "./classes-part-11";
import { ATTACK_CLASSES_PART_12 } from "./classes-part-12";
import { ATTACK_CLASSES_PART_13 } from "./classes-part-13";
import { ATTACK_CLASSES_PART_14 } from "./classes-part-14";

const RAW_ATTACK_CLASSES: AttackClass[] = [
  ...ATTACK_CLASSES_PART_1,
  ...ATTACK_CLASSES_PART_2,
  ...ATTACK_CLASSES_PART_3,
  ...ATTACK_CLASSES_PART_4,
  ...ATTACK_CLASSES_PART_5,
  ...ATTACK_CLASSES_PART_6,
  ...ATTACK_CLASSES_PART_7,
  ...ATTACK_CLASSES_PART_8,
  ...ATTACK_CLASSES_PART_9,
  ...ATTACK_CLASSES_PART_10,
  ...ATTACK_CLASSES_PART_11,
  ...ATTACK_CLASSES_PART_12,
  ...ATTACK_CLASSES_PART_13,
  ...ATTACK_CLASSES_PART_14,
];

function canonicalId(id: string): string {
  const match = /^(?:AX|AAC)-(\d{2})$/.exec(id);
  return match ? `AAC-${match[1]}` : id;
}

function canonicalizeAttackClass(c: AttackClass): AttackClass {
  const id = canonicalId(c.id);
  const legacyId = /^AX-\d{2}$/.test(c.id) ? c.id : c.aka?.match(/AX-\d{2}/)?.[0];
  const aliases = [
    ...(c.aka ? c.aka.split(/;\s*/).filter(Boolean) : []),
    ...(legacyId ? [legacyId] : []),
  ];
  const aka = aliases.length ? [...new Set(aliases)].join("; ") : undefined;
  return { ...c, id, aka };
}

/**
 * Canonical runtime catalog.
 * Legacy AX-* identifiers may still appear in source fragments, but every consumer
 * receives AAC-* primary IDs from this boundary.
 */
export const ATTACK_CLASSES: AttackClass[] = RAW_ATTACK_CLASSES.map(canonicalizeAttackClass);
