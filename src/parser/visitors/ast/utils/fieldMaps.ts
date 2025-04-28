import { ExpressionType } from "./fieldUtils";

interface FieldDefinition {
  displayName: string;
  name: string;
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
 * Helper function to create a field definition
 */
function field(
  name: string,
  type: FieldType,
  displayName?: string,
): FieldEntry {
  return [name, { displayName: displayName || name, name, type }];
}

/**
 * Helper function to create a boolean field
 */
function fieldB(name: string, displayName?: string): FieldEntry {
  return field(name, "boolean", displayName);
}

/**
 * Helper function to create a numeric field
 */
function fieldN(name: string, displayName?: string): FieldEntry {
  return field(name, "numeric", displayName);
}

// Field map for all available fields
const FIELD_MAP: Record<string, FieldDefinition> = Object.fromEntries([
  // WIP
  fieldB("2h", "is_2h"),
  fieldB("two_hand", "is_2h"),

  //
  fieldB("active"),
  fieldB("alive"),
  fieldN("ams_absorb_percent"),
  fieldN("astral_power"),
  fieldB("at_max_stacks"),
  fieldN("base_deficit"),
  fieldN("base_time_to_max"),
  fieldN("cast_time"),
  fieldB("channeling"),
  fieldN("charges"),
  fieldN("charges_fractional"),
  fieldN("charges_max", "max_charges"),
  fieldN("chi"),
  fieldN("combo_points"),
  fieldN("cooldown"),
  fieldN("cost"),
  fieldN("count"),
  fieldN("crit_pct"),
  fieldN("damage"),
  fieldN("default_value"),
  fieldN("deficit"),
  fieldB("disabled"),
  fieldN("distance"),
  fieldB("down"),
  fieldN("duration"),
  fieldN("duration_expected"),
  fieldN("duration_guess"),
  fieldB("enabled"),
  fieldN("energize_amount"),
  fieldN("energy"),
  fieldN("essence"),
  fieldB("executing"),
  fieldN("execution_time", "execute_time"),
  fieldN("execute_remains"),
  fieldN("execute_time"),
  fieldB("exists"),
  fieldN("expiration_delay_remains"),
  fieldN("focus"),
  fieldN("full_recharge_time"),
  fieldN("full_reduction"),
  fieldN("fury"),
  fieldN("fwounded_targets"),
  fieldN("gcd"),
  fieldB("has_cooldown"),
  fieldN("health_pct"),
  fieldN("holy_power"),
  fieldN("in"),
  fieldB("in_flight"),
  fieldN("in_flight_remains"),
  fieldB("in_flight_to_target"),
  fieldN("in_flight_to_target_count"),
  fieldB("in_range"),
  fieldN("insanity"),
  fieldB("is_boss"),
  fieldN("last_used"),
  fieldN("maelstrom"),
  fieldN("mana"),
  fieldN("max"),
  fieldN("max_charges"),
  fieldN("max_stack"),
  fieldN("pct", "percent"),
  fieldN("percent"),
  fieldN("pmultiplier"),
  fieldN("rage"),
  fieldN("rank"),
  fieldB("react"),
  fieldB("ready"),
  fieldB("ready_cooldown"),
  fieldN("recharge_time"),
  fieldB("refreshable"),
  fieldN("regen"),
  fieldN("regen_combined"),
  fieldN("remains"),
  fieldN("remains_expected"),
  fieldN("remains_guess"),
  fieldN("rune"),
  fieldN("runic_power"),
  fieldN("soul_shard"),
  fieldN("soul_shards"),
  fieldN("spell_targets"),
  fieldN("stack"),
  fieldN("stacks"),
  fieldN("stagger"),
  fieldN("tick_reduction"),
  fieldB("ticking", "up"),
  fieldN("ticks_remain"),
  fieldN("time_since"),
  fieldN("time_to"),
  fieldN("time_to_die"),
  fieldN("time_to_max"),
  fieldN("time_to_pct_20"),
  fieldN("time_to_pct_35"),
  fieldN("time_to_pct_80"),
  fieldN("travel_time"),
  fieldB("up"),
  fieldB("usable"),
  fieldN("usable_in"),
  fieldN("value"),
  fieldB("v2"),
]);

/**
 * Helper function to create a parameter definition
 */
function param(name: string, type: ParamType): ParamEntry {
  return [name, { type }];
}

/**
 * Shorthand helpers for parameters - uses same pattern as fields
 */
function paramB(name: string): ParamEntry {
  return param(name, "boolean");
}

function paramC(name: string): ParamEntry {
  return param(name, "condition");
}

function paramN(name: string): ParamEntry {
  return param(name, "numeric");
}

function paramS(name: string): ParamEntry {
  return param(name, "string");
}

const PARAM_MAP: Record<string, ParamDefinition> = Object.fromEntries([
  paramC("chain"),
  paramC("condition"),
  paramB("cycle_targets"),
  paramC("early_chain_if"),
  paramS("effect_name"),
  paramB("enabled"),
  paramN("empower_to"),
  paramN("for_next"),
  paramC("if"),
  paramB("interrupt"),
  paramB("interrupt_global"),
  paramC("interrupt_if"),
  paramB("interrupt_immediate"),
  paramN("line_cd"),
  paramB("max_energy"),
  paramB("moving"),
  paramS("name"),
  paramS("op"),
  paramN("sec"),
  paramS("slot"),
  paramS("slots"),
  paramB("strict"),
  paramC("strict_if"),
  paramC("target_if"),
  paramB("toggle"),
  paramB("use_off_gcd"),
  paramB("use_while_casting"),
  paramN("value"),
  paramN("value_else"),
  paramN("wait"),
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
    return { displayName: name, name, type: "neutral" };
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
