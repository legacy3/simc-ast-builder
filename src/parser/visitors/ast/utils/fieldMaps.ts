import { ExpressionType } from "./fieldUtils";

interface FieldDefinition {
  displayName: string;
  name: string;
  negatedName: string;
  type: ExpressionType;
}

type FieldEntry = [string, FieldDefinition];
type FieldType = "boolean" | "neutral" | "numeric";

interface ParamDefinition {
  type: ParamType;
}

type ParamEntry = [string, ParamDefinition];
type ParamType = "boolean" | "string" | "numeric" | "condition";

/**
 * Helper function to create a field definition using a partial object
 */
function field(def: { name: string; type: FieldType } & Partial<FieldDefinition>): FieldEntry {
  return [
    def.name,
    {
      displayName: def.displayName || def.name,
      name: def.name,
      negatedName: def.negatedName || def.name,
      type: def.type,
    },
  ];
}

/**
 * Helper function to create a boolean field
 */
function fieldB(def: { name: string } & Partial<FieldDefinition>): FieldEntry {
  return field({ ...def, type: "boolean" });
}

/**
 * Helper function to create a numeric field
 */
function fieldN(def: { name: string } & Partial<FieldDefinition>): FieldEntry {
  return field({ ...def, type: "numeric" });
}

// Field map for all available fields
const FIELD_MAP: Record<string, FieldDefinition> = Object.fromEntries([
  // WIP
  fieldB({ displayName: "is_2h", name: "2h" }),
  fieldB({ displayName: "is_2h", name: "two_hand" }),

  //
  fieldB({ name: "active" }),
  fieldB({ name: "alive" }),
  fieldN({ name: "ams_absorb_percent" }),
  fieldN({ name: "astral_power" }),
  fieldB({ name: "at_max_stacks" }),
  fieldN({ name: "base_deficit" }),
  fieldN({ name: "base_time_to_max" }),
  fieldN({ name: "cast_time" }),
  fieldB({ name: "channeling" }),
  fieldN({ name: "charges" }),
  fieldN({ name: "charges_fractional" }),
  fieldN({ displayName: "max_charges", name: "charges_max" }),
  fieldN({ name: "chi" }),
  fieldN({ name: "combo_points" }),
  fieldN({ name: "cooldown" }),
  fieldN({ name: "cost" }),
  fieldN({ name: "count" }),
  fieldN({ name: "crit_pct" }),
  fieldN({ name: "damage" }),
  fieldN({ name: "default_value" }),
  fieldN({ name: "deficit" }),
  fieldB({ name: "disabled" }),
  fieldN({ name: "distance" }),
  fieldB({ name: "down", negatedName: "up" }),
  fieldN({ name: "duration" }),
  fieldN({ name: "duration_expected" }),
  fieldN({ name: "duration_guess" }),
  fieldB({ name: "enabled" }),
  fieldN({ name: "energize_amount" }),
  fieldN({ name: "energy" }),
  fieldN({ name: "essence" }),
  fieldB({ name: "executing" }),
  fieldN({ displayName: "execute_time", name: "execution_time" }),
  fieldN({ name: "execute_remains" }),
  fieldN({ name: "execute_time" }),
  fieldB({ name: "exists" }),
  fieldN({ name: "expiration_delay_remains" }),
  fieldN({ name: "focus" }),
  fieldN({ name: "full_recharge_time" }),
  fieldN({ name: "full_reduction" }),
  fieldN({ name: "fury" }),
  fieldN({ name: "fwounded_targets" }),
  fieldN({ name: "gcd" }),
  fieldB({ name: "has_cooldown" }),
  fieldN({ name: "health_pct" }),
  fieldN({ name: "holy_power" }),
  fieldN({ name: "in" }),
  fieldB({ name: "in_flight" }),
  fieldN({ name: "in_flight_remains" }),
  fieldB({ name: "in_flight_to_target" }),
  fieldN({ name: "in_flight_to_target_count" }),
  fieldB({ name: "in_range" }),
  fieldN({ name: "insanity" }),
  fieldB({ name: "is_boss" }),
  fieldN({ name: "last_used" }),
  fieldN({ name: "maelstrom" }),
  fieldN({ name: "mana" }),
  fieldN({ name: "max" }),
  fieldN({ name: "max_charges" }),
  fieldN({ name: "max_stack" }),
  fieldN({ displayName: "percent", name: "pct" }),
  fieldN({ name: "percent" }),
  fieldN({ name: "pmultiplier" }),
  fieldN({ name: "rage" }),
  fieldN({ name: "rank" }),
  fieldB({ name: "react" }),
  fieldB({ name: "ready" }),
  fieldB({ name: "ready_cooldown" }),
  fieldN({ name: "recharge_time" }),
  fieldB({ name: "refreshable" }),
  fieldN({ name: "regen" }),
  fieldN({ name: "regen_combined" }),
  fieldN({ name: "remains" }),
  fieldN({ name: "remains_expected" }),
  fieldN({ name: "remains_guess" }),
  fieldN({ name: "rune" }),
  fieldN({ name: "runic_power" }),
  fieldN({ name: "soul_shard" }),
  fieldN({ name: "soul_shards" }),
  fieldN({ name: "spell_targets" }),
  fieldN({ name: "stack" }),
  fieldN({ name: "stacks" }),
  fieldN({ name: "stagger" }),
  fieldN({ name: "tick_reduction" }),
  fieldB({ displayName: "up", name: "ticking", negatedName: "down" }),
  fieldN({ name: "ticks_remain" }),
  fieldN({ name: "time_since" }),
  fieldN({ name: "time_to" }),
  fieldN({ name: "time_to_die" }),
  fieldN({ name: "time_to_max" }),
  fieldN({ name: "time_to_pct_20" }),
  fieldN({ name: "time_to_pct_35" }),
  fieldN({ name: "time_to_pct_80" }),
  fieldN({ name: "travel_time" }),
  fieldB({ name: "up", negatedName: "down" }),
  fieldB({ name: "usable" }),
  fieldN({ name: "usable_in" }),
  fieldN({ name: "value" }),
  fieldB({ name: "v2" }),
]);

/**
 * Helper function to create a parameter definition using a partial object
 */
function param(def: { name: string; type: ParamType } & Partial<ParamDefinition>): ParamEntry {
  return [def.name, { type: def.type }];
}

/**
 * Shorthand helpers for parameters - uses same pattern as fields
 */
function paramB(def: { name: string }): ParamEntry {
  return param({ ...def, type: "boolean" });
}

function paramC(def: { name: string }): ParamEntry {
  return param({ ...def, type: "condition" });
}

function paramN(def: { name: string }): ParamEntry {
  return param({ ...def, type: "numeric" });
}

function paramS(def: { name: string }): ParamEntry {
  return param({ ...def, type: "string" });
}

const PARAM_MAP: Record<string, ParamDefinition> = Object.fromEntries([
  paramC({ name: "chain" }),
  paramC({ name: "condition" }),
  paramB({ name: "cycle_targets" }),
  paramC({ name: "early_chain_if" }),
  paramS({ name: "effect_name" }),
  paramB({ name: "enabled" }),
  paramN({ name: "empower_to" }),
  paramN({ name: "for_next" }),
  paramC({ name: "if" }),
  paramB({ name: "interrupt" }),
  paramB({ name: "interrupt_global" }),
  paramC({ name: "interrupt_if" }),
  paramB({ name: "interrupt_immediate" }),
  paramN({ name: "line_cd" }),
  paramB({ name: "max_energy" }),
  paramB({ name: "moving" }),
  paramS({ name: "name" }),
  paramS({ name: "op" }),
  paramN({ name: "sec" }),
  paramS({ name: "slot" }),
  paramS({ name: "slots" }),
  paramB({ name: "strict" }),
  paramC({ name: "strict_if" }),
  paramC({ name: "target_if" }),
  paramB({ name: "toggle" }),
  paramB({ name: "use_off_gcd" }),
  paramB({ name: "use_while_casting" }),
  paramN({ name: "value" }),
  paramN({ name: "value_else" }),
  paramN({ name: "wait" }),
]);

// TODO Verify those fields
function getDefaultField(accessType: string): string | null {
  const defaults: Record<string, string> = {
    action: "cast_time",
    buff: "up",
    cooldown: "remains",
    debuff: "up",
    dot: "ticking",
    gcd: "max",
    health: "percent",
    hyperthread_wristwraps: "count",
    movement: "distance",
    pet: "active",
    resource: "pct",
    set_bonus: "enabled",
    stagger: "pct",
    stat: "haste",
    talent: "enabled",
    target: "time_to_die",
    totem: "up",
    trinket: "cooldown",
  };

  return defaults[accessType] || null;
}

function getFieldDef(name: string): FieldDefinition {
  const fieldDef = FIELD_MAP[name];
  if (!fieldDef) {
    return { displayName: name, name, negatedName: name, type: "neutral" };
  }

  return fieldDef;
}

export {
  FIELD_MAP,
  getDefaultField,
  getFieldDef,
  PARAM_MAP,
  type FieldDefinition,
  type FieldEntry,
  type FieldType,
  type ParamDefinition,
  type ParamEntry,
  type ParamType,
};
