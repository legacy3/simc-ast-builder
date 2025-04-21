import { AccessDefinition, ExpressionType } from "./fieldUtils";

// Field definition interface
export interface FieldDefinition {
  displayName: string;
  type: ExpressionType;
}

// Field maps for various access types
export const FIELD_MAP: Record<string, FieldDefinition> = {
  // Shared fields
  active: { displayName: "active", type: "boolean" },
  alive: { displayName: "alive", type: "boolean" },
  at_max_stacks: { displayName: "at_max_stacks", type: "boolean" },
  base_deficit: { displayName: "base_deficit", type: "numeric" },
  base_time_to_max: { displayName: "base_time_to_max", type: "numeric" },
  cast_time: { displayName: "cast_time", type: "numeric" },
  channeling: { displayName: "channeling", type: "boolean" },
  charges: { displayName: "charges", type: "numeric" },
  charges_fractional: { displayName: "charges_fractional", type: "numeric" },
  charges_max: { displayName: "max_charges", type: "numeric" },
  cooldown: { displayName: "cooldown", type: "numeric" },
  cost: { displayName: "cost", type: "numeric" },
  count: { displayName: "count", type: "numeric" },
  crit_pct: { displayName: "crit_pct", type: "numeric" },
  damage: { displayName: "damage", type: "numeric" },
  default_value: { displayName: "default_value", type: "numeric" },
  deficit: { displayName: "deficit", type: "numeric" },
  disabled: { displayName: "disabled", type: "boolean" },
  distance: { displayName: "distance", type: "numeric" },
  down: { displayName: "down", type: "boolean" },
  duration: { displayName: "duration", type: "numeric" },
  duration_expected: { displayName: "duration_expected", type: "numeric" },
  duration_guess: { displayName: "duration_guess", type: "numeric" },
  energize_amount: { displayName: "energize_amount", type: "numeric" },
  execute_remains: { displayName: "execute_remains", type: "numeric" },
  execute_time: { displayName: "execute_time", type: "numeric" },
  executing: { displayName: "executing", type: "boolean" },
  execution_time: { displayName: "execute_time", type: "numeric" },
  exists: { displayName: "exists", type: "boolean" },
  expiration_delay_remains: {
    displayName: "expiration_delay_remains",
    type: "numeric",
  },
  full_recharge_time: { displayName: "full_recharge_time", type: "numeric" },
  full_reduction: { displayName: "full_reduction", type: "numeric" },
  gcd: { displayName: "gcd", type: "numeric" },
  has_cooldown: { displayName: "has_cooldown", type: "boolean" },
  health_pct: { displayName: "health_pct", type: "numeric" },
  in: { displayName: "in", type: "numeric" },
  in_flight: { displayName: "in_flight", type: "boolean" },
  in_flight_remains: { displayName: "in_flight_remains", type: "numeric" },
  in_flight_to_target: { displayName: "in_flight_to_target", type: "boolean" },
  in_flight_to_target_count: {
    displayName: "in_flight_to_target_count",
    type: "numeric",
  },
  in_range: { displayName: "in_range", type: "boolean" },
  is_boss: { displayName: "is_boss", type: "boolean" },
  last_used: { displayName: "last_used", type: "numeric" },
  max: { displayName: "max", type: "numeric" },
  max_charges: { displayName: "max_charges", type: "numeric" },
  max_stack: { displayName: "max_stack", type: "numeric" },
  pct: { displayName: "percent", type: "numeric" },
  percent: { displayName: "percent", type: "numeric" },
  pmultiplier: { displayName: "pmultiplier", type: "numeric" },
  rank: { displayName: "rank", type: "numeric" },
  react: { displayName: "react", type: "boolean" },
  ready: { displayName: "ready", type: "boolean" },
  ready_cooldown: { displayName: "ready_cooldown", type: "boolean" },
  recharge_time: { displayName: "recharge_time", type: "numeric" },
  refreshable: { displayName: "refreshable", type: "boolean" },
  regen: { displayName: "regen", type: "numeric" },
  regen_combined: { displayName: "regen_combined", type: "numeric" },
  remains: { displayName: "remains", type: "numeric" },
  remains_expected: { displayName: "remains_expected", type: "numeric" },
  remains_guess: { displayName: "remains_guess", type: "numeric" },
  spell_targets: { displayName: "spell_targets", type: "numeric" },
  stack: { displayName: "stack", type: "numeric" },
  stacks: { displayName: "stacks", type: "numeric" },
  tick_reduction: { displayName: "tick_reduction", type: "numeric" },
  ticking: { displayName: "up", type: "boolean" },
  ticks_remain: { displayName: "ticks_remain", type: "numeric" },
  time_since: { displayName: "time_since", type: "numeric" },
  time_to: { displayName: "time_to", type: "numeric" },
  time_to_die: { displayName: "time_to_die", type: "numeric" },
  time_to_max: { displayName: "time_to_max", type: "numeric" },
  time_to_pct_20: { displayName: "time_to_pct_20", type: "numeric" },
  time_to_pct_35: { displayName: "time_to_pct_35", type: "numeric" },
  time_to_pct_80: { displayName: "time_to_pct_80", type: "numeric" },
  travel_time: { displayName: "travel_time", type: "numeric" },
  up: { displayName: "up", type: "boolean" },
  usable: { displayName: "usable", type: "boolean" },
  usable_in: { displayName: "usable_in", type: "numeric" },
  v2: { displayName: "v2", type: "boolean" },

  // Higher level keywords
  enabled: { displayName: "enabled", type: "boolean" },
  value: { displayName: "value", type: "numeric" },

  // Class fields
  ams_absorb_percent: { displayName: "ams_absorb_percent", type: "numeric" },
  fwounded_targets: { displayName: "fwounded_targets", type: "numeric" },

  // Resource types
  astral_power: { displayName: "astral_power", type: "numeric" },
  chi: { displayName: "chi", type: "numeric" },
  combo_points: { displayName: "combo_points", type: "numeric" },
  energy: { displayName: "energy", type: "numeric" },
  essence: { displayName: "essence", type: "numeric" },
  focus: { displayName: "focus", type: "numeric" },
  fury: { displayName: "fury", type: "numeric" },
  holy_power: { displayName: "holy_power", type: "numeric" },
  insanity: { displayName: "insanity", type: "numeric" },
  maelstrom: { displayName: "maelstrom", type: "numeric" },
  mana: { displayName: "mana", type: "numeric" },
  rage: { displayName: "rage", type: "numeric" },
  rune: { displayName: "rune", type: "numeric" },
  runic_power: { displayName: "runic_power", type: "numeric" },
  soul_shard: { displayName: "soul_shard", type: "numeric" },
  soul_shards: { displayName: "soul_shards", type: "numeric" },
  stagger: { displayName: "stagger", type: "numeric" },
};

// Define field lists for each access type - these could be strings now
export const ACTION_FIELDS = [
  "cast_time",
  "channeling",
  "charges",
  "charges_fractional",
  "cost",
  "crit_pct",
  "damage",
  "duration",
  "energize_amount",
  "execute_remains",
  "execute_time",
  "executing",
  "full_recharge_time",
  "full_reduction",
  "in_flight",
  "in_flight_remains",
  "in_flight_to_target",
  "in_flight_to_target_count",
  "in_range",
  "last_used",
  "recharge_time",
  "tick_reduction",
  "time_since",
  "travel_time",
  "usable",
  "usable_in",
  "cooldown",
  "gcd",
];

export const BUFF_FIELDS = [
  "at_max_stacks",
  "down",
  "duration",
  "expiration_delay_remains",
  "max_stack",
  "react",
  "remains",
  "stack",
  "stacks",
  "up",
  "value",
];

export const COOLDOWN_FIELDS = [
  "charges",
  "charges_fractional",
  "charges_max",
  "duration",
  "duration_expected",
  "duration_guess",
  "full_recharge_time",
  "max_charges",
  "ready",
  "remains",
  "remains_expected",
  "remains_guess",
  "up",
];

export const DEBUFF_FIELDS = [
  "at_max_stacks",
  "down",
  "max_stack",
  "react",
  "remains",
  "stack",
  "up",
  "v2",
  "value",
];

export const DOT_FIELDS = [
  "duration",
  "pmultiplier",
  "refreshable",
  "remains",
  "stack",
  "ticking",
  "ticks_remain",
  "up",
];

export const GCD_FIELDS = ["max", "remains"];

export const HEALTH_FIELDS = ["max", "pct", "percent"];

export const MOVEMENT_FIELDS = ["distance"];

export const PET_FIELDS = ["active", "remains", "up"];

export const RESOURCE_FIELDS = [
  "base_deficit",
  "base_time_to_max",
  "max",
  "deficit",
  "pct",
  "percent",
  "regen_combined",
  "regen",
  "time_to_max",
];

export const RAID_EVENT_FIELDS = [
  "count",
  "duration",
  "exists",
  "in",
  "remains",
  "up",
];

export const TALENT_FIELDS = ["rank", "enabled"];

export const TARGET_FIELDS = [
  "distance",
  "is_boss",
  "time_to_die",
  "time_to_pct_20",
  "time_to_pct_35",
  "time_to_pct_80",
];

// Access pattern definitions
export const ACCESS_MAP: Record<string, AccessDefinition> = {
  action: {
    defaultField: "cast_time",
    fields: ACTION_FIELDS,
    requiresName: true,
  },
  boar_charge: {
    defaultField: "",
    fields: ["remains"],
    requiresName: false,
  },
  buff: {
    defaultField: "up",
    fields: BUFF_FIELDS,
    requiresName: true,
  },
  consecration: {
    defaultField: "up",
    fields: ["up", "remains"],
    requiresName: false,
  },
  cooldown: {
    defaultField: "remains",
    fields: COOLDOWN_FIELDS,
    requiresName: true,
  },
  death_and_decay: {
    defaultField: "ticking",
    fields: ["ticking", "remains"],
    requiresName: false,
  },
  debuff: {
    defaultField: "up",
    fields: DEBUFF_FIELDS,
    requiresName: true,
  },
  dot: {
    defaultField: "ticking",
    fields: DOT_FIELDS,
    requiresName: true,
  },
  empowering: {
    defaultField: "",
    fields: ["fire_breath"],
    requiresName: false,
  },
  evoker: {
    defaultField: "",
    fields: ["allied_cds_up"],
    requiresName: false,
  },
  feral_spirit: {
    defaultField: "active",
    fields: ["active"],
    requiresName: false,
  },
  firestarter: {
    defaultField: "",
    fields: ["active"],
    requiresName: false,
  },
  gcd: {
    defaultField: "max",
    fields: GCD_FIELDS,
    requiresName: false,
  },
  howl_summon: {
    defaultField: "",
    fields: ["ready"],
    requiresName: false,
  },
  hyperthread_wristwraps: {
    defaultField: "",
    fields: ["fire_blast", "fire_blast.charges", "count"],
    requiresName: false,
  },
  improved_scorch: {
    defaultField: "",
    fields: ["active"],
    requiresName: false,
  },
  main_hand: {
    defaultField: "two_hand",
    fields: ["two_hand", "2h"],
    requiresName: false,
  },
  movement: {
    defaultField: "distance",
    fields: MOVEMENT_FIELDS,
    requiresName: false,
  },
  pet: {
    defaultField: "active",
    fields: PET_FIELDS,
    requiresName: false,
  },
  prev: {
    defaultField: "",
    fields: ["lunar_inspiration"],
    requiresName: false,
  },
  prev_gcd: {
    defaultField: "",
    fields: [],
    requiresName: false,
  },
  prev_off_gcd: {
    defaultField: "",
    fields: ["freeze"],
    requiresName: false,
  },
  release: {
    defaultField: "",
    fields: ["dot_duration"],
    requiresName: false,
  },
  resource: {
    defaultField: "pct",
    fields: RESOURCE_FIELDS,
    requiresName: true,
  },
  rtb_buffs: {
    defaultField: "normal",
    fields: ["normal"],
    requiresName: false,
  },
  scorch_execute: {
    defaultField: "",
    fields: ["active"],
    requiresName: false,
  },
  set_bonus: {
    defaultField: "enabled",
    fields: ["enabled"],
    requiresName: true,
  },
  settings: {
    fields: [],
    requiresName: true,
  },
  stagger: {
    defaultField: "pct",
    fields: ["pct", "percent"],
    requiresName: false,
  },
  stat: {
    defaultField: "haste",
    fields: ["haste", "crit", "mastery", "versatility"],
    requiresName: false,
  },
  stealthed: {
    defaultField: "rogue",
    fields: ["rogue", "improved_garrote"],
    requiresName: false,
  },
  talent: {
    defaultField: "enabled",
    fields: TALENT_FIELDS,
    requiresName: true,
  },
  target: {
    defaultField: "time_to_die",
    fields: TARGET_FIELDS,
    requiresName: false,
  },
  totem: {
    defaultField: "up",
    fields: ["up", "remains"],
    requiresName: true,
  },
  trinket: {
    defaultField: "cooldown",
    fields: ["cooldown", "has_use", "has_stat"],
    requiresName: false,
  },
  variable: {
    fields: [],
    requiresName: true,
  },
};

// Parameter definitions
export interface ParamDefinition {
  required: boolean;
  type: "boolean" | "string" | "numeric" | "condition";
}

export const PARAM_MAP: Record<string, ParamDefinition> = {
  chain: { required: false, type: "condition" },
  condition: { required: false, type: "condition" },
  cycle_targets: { required: false, type: "boolean" },
  early_chain_if: { required: false, type: "condition" },
  effect_name: { required: false, type: "string" },
  empower_to: { required: false, type: "numeric" },
  enabled: { required: false, type: "boolean" },
  for_next: { required: false, type: "numeric" },
  if: { required: false, type: "condition" },
  interrupt: { required: false, type: "boolean" },
  interrupt_global: { required: false, type: "boolean" },
  interrupt_if: { required: false, type: "condition" },
  interrupt_immediate: { required: false, type: "boolean" },
  line_cd: { required: false, type: "numeric" },
  max_energy: { required: false, type: "boolean" },
  moving: { required: false, type: "boolean" },
  name: { required: true, type: "string" },
  op: { required: false, type: "string" },
  sec: { required: false, type: "numeric" },
  slot: { required: false, type: "string" },
  slots: { required: false, type: "string" },
  strict: { required: false, type: "boolean" },
  strict_if: { required: false, type: "condition" },
  target_if: { required: false, type: "condition" },
  toggle: { required: false, type: "boolean" },
  use_off_gcd: { required: false, type: "boolean" },
  use_while_casting: { required: false, type: "boolean" },
  value: { required: false, type: "numeric" },
  value_else: { required: false, type: "numeric" },
  wait: { required: false, type: "numeric" },
};

// Helper function to get default field for access type
export function getDefaultField(accessType: string): string | null {
  const accessDef = ACCESS_MAP[accessType];
  if (!accessDef) return null;

  return accessDef.defaultField || null;
}

// Helper function to get field definition
export function getFieldDef(name: string): FieldDefinition {
  const fieldDef = FIELD_MAP[name];
  if (!fieldDef) {
    // Default to a neutral type if not found
    return { displayName: name, type: "neutral" };
  }
  return fieldDef;
}

// Helper function to validate field for access pattern
export function validateFieldForAccess(
  accessType: string,
  fieldName: string | null,
): boolean {
  if (!fieldName) return true; // No field to validate

  const accessDef = ACCESS_MAP[accessType];
  if (!accessDef) return false;

  return accessDef.fields.includes(fieldName);
}
