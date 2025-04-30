import {
  ActionLineContext,
  ActionNameContext,
  ActionParamContext,
  AdditiveExprContext,
  AndExprContext,
  AnyTokenExprContext,
  CommentLineContext,
  ComparisonExprContext,
  ExpressionContext,
  IdentifierContext,
  MathFuncExprContext,
  MinMaxExprContext,
  MixedIdExprContext,
  MultiplicativeExprContext,
  NumberExprContext,
  OrExprContext,
  ParseContext,
  StringExprContext,
  SublistNameContext,
  UnaryExprContext,
  XorExprContext,
} from "../../../antlr4/SimCExprParser";
import {
  ActionLineNode,
  ASTNode,
  CommentLineNode,
  ExpressionNode,
  ParameterNode,
} from "../common-types";
import { SimCGenericVisitor } from "../SimCGenericVisitor";
import * as BasicHandlers from "./Basic";
import * as HekiliApiHandlers from "./HekiliApi";
import * as SimCApiHandlers from "./SimCApi";

export interface AccessHandlerParams<T = ExpressionContext> {
  ctx: T;
  meta: LineMetaData;
  parts: string[];
  visitor: SimCGenericVisitor;
}

export interface LineMetaData {
  actionLine: string;
  actionName: string;
  actionParams: ActionParamContext[];
  subListName: string;
}

type AccessHandlerKey = keyof AccessHandlerTypeMap;

// TODO Get this implicitly from the context
// prettier-ignore
type AccessHandlerTypeMap = {
  action: (params: AccessHandlerParams) => ExpressionNode;
  active_dot: (params: AccessHandlerParams) => ExpressionNode;
  boar_charge: (params: AccessHandlerParams) => ExpressionNode;
  buff: (params: AccessHandlerParams) => ExpressionNode;
  consecration: (params: AccessHandlerParams) => ExpressionNode;
  cooldown: (params: AccessHandlerParams) => ExpressionNode;
  cycle_enemies: (params: AccessHandlerParams) => ExpressionNode;
  death_and_decay: (params: AccessHandlerParams) => ExpressionNode;
  debuff: (params: AccessHandlerParams) => ExpressionNode;
  dot: (params: AccessHandlerParams) => ExpressionNode;
  empowering: (params: AccessHandlerParams) => ExpressionNode;
  fight_remains: (params: AccessHandlerParams) => ExpressionNode;
  firestarter: (params: AccessHandlerParams) => ExpressionNode;
  howl_summon: (params: AccessHandlerParams) => ExpressionNode;
  improved_scorch: (params: AccessHandlerParams) => ExpressionNode;
  hyperthread_wristwraps: (params: AccessHandlerParams) => ExpressionNode;
  lightning_rod: (params: AccessHandlerParams) => ExpressionNode;
  main_hand: (params: AccessHandlerParams) => ExpressionNode;
  movement: (params: AccessHandlerParams) => ExpressionNode;
  prev: (params: AccessHandlerParams) => ExpressionNode;
  prev_gcd: (params: AccessHandlerParams) => ExpressionNode;
  prev_off_gcd: (params: AccessHandlerParams) => ExpressionNode;
  release: (params: AccessHandlerParams) => ExpressionNode;
  remaining_winters_chill: (params: AccessHandlerParams) => ExpressionNode;
  scorch_execute: (params: AccessHandlerParams) => ExpressionNode;
  set_bonus: (params: AccessHandlerParams) => ExpressionNode;
  stat: (params: AccessHandlerParams) => ExpressionNode;
  eclipse: (params: AccessHandlerParams) => ExpressionNode;
  equipped: (params: AccessHandlerParams) => ExpressionNode;
  feral_spirit: (params: AccessHandlerParams) => ExpressionNode;
  health: (params: AccessHandlerParams) => ExpressionNode;
  hero_tree: (params: AccessHandlerParams) => ExpressionNode;
  raid_event: (params: AccessHandlerParams) => ExpressionNode;
  runic_power: (params: AccessHandlerParams) => ExpressionNode;
  rage: (params: AccessHandlerParams) => ExpressionNode;
  energy: (params: AccessHandlerParams) => ExpressionNode;
  mana: (params: AccessHandlerParams) => ExpressionNode;
  focus: (params: AccessHandlerParams) => ExpressionNode;
  fury: (params: AccessHandlerParams) => ExpressionNode;
  rune: (params: AccessHandlerParams) => ExpressionNode;
  astral_power: (params: AccessHandlerParams) => ExpressionNode;
  maelstrom: (params: AccessHandlerParams) => ExpressionNode;
  insanity: (params: AccessHandlerParams) => ExpressionNode;
  holy_power: (params: AccessHandlerParams) => ExpressionNode;
  soul_shard: (params: AccessHandlerParams) => ExpressionNode;
  soul_shards: (params: AccessHandlerParams) => ExpressionNode;
  combo_points: (params: AccessHandlerParams) => ExpressionNode;
  chi: (params: AccessHandlerParams) => ExpressionNode;
  essence: (params: AccessHandlerParams) => ExpressionNode;
  spell_targets: (params: AccessHandlerParams) => ExpressionNode;
  target: (params: AccessHandlerParams) => ExpressionNode;
  rtb_buffs: (params: AccessHandlerParams) => ExpressionNode;
  stagger: (params: AccessHandlerParams) => ExpressionNode;
  stealthed: (params: AccessHandlerParams) => ExpressionNode;
  talent: (params: AccessHandlerParams) => ExpressionNode;
  toggle: (params: AccessHandlerParams) => ExpressionNode;
  totem: (params: AccessHandlerParams) => ExpressionNode;
  trinket: (params: AccessHandlerParams) => ExpressionNode;
  variable: (params: AccessHandlerParams) => ExpressionNode;
  gcd: (params: AccessHandlerParams) => ExpressionNode;
  pet: (params: AccessHandlerParams) => ExpressionNode;
  time: (params: AccessHandlerParams) => ExpressionNode;

  // Hekili specific handlers
  boss: (params: AccessHandlerParams) => ExpressionNode;
  group_members: (params: AccessHandlerParams) => ExpressionNode;
  settings: (params: AccessHandlerParams) => ExpressionNode;

  // Class-specific handlers
  death_knight: (params: AccessHandlerParams) => ExpressionNode;
  druid: (params: AccessHandlerParams) => ExpressionNode;
  evoker: (params: AccessHandlerParams) => ExpressionNode;
  hunter: (params: AccessHandlerParams) => ExpressionNode;
  mage: (params: AccessHandlerParams) => ExpressionNode;
  monk: (params: AccessHandlerParams) => ExpressionNode;
  paladin: (params: AccessHandlerParams) => ExpressionNode;
  priest: (params: AccessHandlerParams) => ExpressionNode;
  rogue: (params: AccessHandlerParams) => ExpressionNode;
  shaman: (params: AccessHandlerParams) => ExpressionNode;
};

type ContextHandlerKey = keyof ContextHandlerTypeMap;

// prettier-ignore
type ContextHandlerTypeMap = {
  AccessExpr: (ctx: ExpressionContext, visitor: SimCGenericVisitor) => ExpressionNode;
  ActionLine: (ctx: ActionLineContext, visitor: SimCGenericVisitor) => ActionLineNode;
  ActionName: (ctx: ActionNameContext, visitor: SimCGenericVisitor) => ExpressionNode;
  ActionParam: (ctx: ActionParamContext, visitor: SimCGenericVisitor) => ParameterNode;
  AdditiveExpr: (ctx: AdditiveExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  AndExpr: (ctx: AndExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  AnyTokenExpr: (ctx: AnyTokenExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  CommentLine: (ctx: CommentLineContext, visitor: SimCGenericVisitor) => CommentLineNode;
  ComparisonExpr: (ctx: ComparisonExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  Identifier: (ctx: IdentifierContext, visitor: SimCGenericVisitor) => ExpressionNode;
  MathFuncExpr: (ctx: MathFuncExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  MinMaxExpr: (ctx: MinMaxExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  MixedIdExpr: (ctx: MixedIdExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  MultiplicativeExpr: (ctx: MultiplicativeExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  NumberExpr: (ctx: NumberExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  OrExpr: (ctx: OrExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  Parse: (ctx: ParseContext, visitor: SimCGenericVisitor) => ASTNode;
  StringExpr: (ctx: StringExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  SublistName: (ctx: SublistNameContext, visitor: SimCGenericVisitor) => ExpressionNode;
  UnaryExpr: (ctx: UnaryExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
  XorExpr: (ctx: XorExprContext, visitor: SimCGenericVisitor) => ExpressionNode;
};

class ContextHandlerRegistry {
  private accessHandlers: Partial<AccessHandlerTypeMap> = {};

  private contextHandlers: Partial<ContextHandlerTypeMap> = {};

  private lineMetaData: LineMetaData = {
    actionLine: "",
    actionName: "",
    actionParams: [],
    subListName: "",
  };

  constructor() {
    this.registerDefaultHandlers();
  }

  dispatchAccess<K extends AccessHandlerKey>(
    accessType: K,
    ctx: ExpressionContext,
    visitor: SimCGenericVisitor,
    parts: string[],
  ): ReturnType<AccessHandlerTypeMap[K]> {
    const handler = this.getAccessHandler(accessType);
    if (!handler) {
      throw new Error(`No access handler registered for: ${accessType}`);
    }

    return handler({
      ctx,
      meta: this.lineMetaData,
      parts,
      visitor,
    }) as ReturnType<AccessHandlerTypeMap[K]>;
  }

  dispatchContext<K extends ContextHandlerKey>(
    contextType: K,
    ctx: any,
    visitor: any,
  ): ReturnType<ContextHandlerTypeMap[K]> {
    const handler = this.getContextHandler(contextType);
    if (!handler) {
      throw new Error(`No context handler registered for: ${contextType}`);
    }

    return handler(ctx, visitor) as ReturnType<ContextHandlerTypeMap[K]>;
  }

  getAccessHandler<K extends AccessHandlerKey>(
    accessType: K,
  ): AccessHandlerTypeMap[K] | undefined {
    return this.accessHandlers[accessType] as
      | AccessHandlerTypeMap[K]
      | undefined;
  }

  getContextHandler<K extends ContextHandlerKey>(
    contextType: K,
  ): ContextHandlerTypeMap[K] | undefined {
    return this.contextHandlers[contextType] as
      | ContextHandlerTypeMap[K]
      | undefined;
  }

  /**
   * Check if a string is a valid access handler key
   * @param key The string to check
   * @returns True if the key is a valid access handler key
   */
  hasAccessHandler(key: string): boolean {
    return key in this.accessHandlers;
  }

  /**
   * Check if a string is a valid context handler key
   * @param key The string to check
   * @returns True if the key is a valid context handler key
   */
  hasContextHandler(key: string): boolean {
    return key in this.contextHandlers;
  }

  registerAccessHandler<K extends AccessHandlerKey>(
    accessType: K,
    handler: AccessHandlerTypeMap[K],
  ): void {
    this.accessHandlers[accessType] = handler;
  }

  registerContextHandler<K extends ContextHandlerKey>(
    contextType: K,
    handler: ContextHandlerTypeMap[K],
  ): void {
    this.contextHandlers[contextType] = handler;
  }

  setMetaData(metaData: LineMetaData): void {
    this.lineMetaData = metaData;
  }

  private registerDefaultHandlers(): void {
    const RAH = this.registerAccessHandler.bind(this);
    const RCH = this.registerContextHandler.bind(this);

    // Basic
    // Context
    RCH("AccessExpr", BasicHandlers.handleAccessExpr); // TODO Fix this type for real
    RCH("ActionLine", BasicHandlers.handleActionLine);
    RCH("ActionParam", BasicHandlers.handleActionParam);
    RCH("AdditiveExpr", BasicHandlers.handleAdditiveExpr);
    RCH("AndExpr", BasicHandlers.handleAndExpr);
    RCH("AnyTokenExpr", BasicHandlers.handleAnyTokenExpr);
    RCH("CommentLine", BasicHandlers.handleCommentLine);
    RCH("ComparisonExpr", BasicHandlers.handleComparisonExpr);
    RCH("MathFuncExpr", BasicHandlers.handleMathFuncExpr);
    RCH("Identifier", BasicHandlers.handleIdentifier);
    RCH("MinMaxExpr", BasicHandlers.handleMinMaxExpr);
    RCH("MixedIdExpr", BasicHandlers.handleMixedIdExpr);
    RCH("MultiplicativeExpr", BasicHandlers.handleMultiplicativeExpr);
    RCH("NumberExpr", BasicHandlers.handleNumberExpr);
    RCH("OrExpr", BasicHandlers.handleOrExpr);
    RCH("Parse", BasicHandlers.handleParseContext);
    RCH("XorExpr", BasicHandlers.handleXorExpr);
    RCH("StringExpr", BasicHandlers.handleStringExpr);
    RCH("UnaryExpr", BasicHandlers.handleUnaryExpr);

    // SimC
    // Context
    RCH("ActionName", SimCApiHandlers.handleActionName);
    RCH("SublistName", SimCApiHandlers.handleSublistName);

    // Access
    RAH("action", SimCApiHandlers.handleAction);
    RAH("active_dot", SimCApiHandlers.handleActiveDot);
    RAH("buff", SimCApiHandlers.handleBuff);
    RAH("cooldown", SimCApiHandlers.handleCooldown);
    RAH("debuff", SimCApiHandlers.handleDebuff);
    RAH("dot", SimCApiHandlers.handleDot);
    RAH("eclipse", SimCApiHandlers.handleEclipse);
    RAH("equipped", SimCApiHandlers.handleEquipped);
    RAH("health", SimCApiHandlers.handleHealth);
    RAH("hero_tree", SimCApiHandlers.handleHeroTree);
    RAH("raid_event", SimCApiHandlers.handleRaidEvent);
    RAH("spell_targets", SimCApiHandlers.handleSpellTargets);
    RAH("target", SimCApiHandlers.handleTarget);
    RAH("talent", SimCApiHandlers.handleTalent);
    RAH("toggle", SimCApiHandlers.handleToggle);
    RAH("trinket", SimCApiHandlers.handleTrinket);
    RAH("variable", SimCApiHandlers.handleVariable);
    RAH("gcd", SimCApiHandlers.handleGcd);
    RAH("main_hand", SimCApiHandlers.handleMainHand);
    RAH("movement", SimCApiHandlers.handleMovement);
    RAH("pet", SimCApiHandlers.handlePet);
    RAH("prev", SimCApiHandlers.handlePrev);
    RAH("prev_gcd", SimCApiHandlers.handlePrevGcd);
    RAH("prev_off_gcd", SimCApiHandlers.handlePrevOffGcd);
    RAH("set_bonus", SimCApiHandlers.handleSetBonus);
    RAH("stat", SimCApiHandlers.handleStat);
    RAH("fight_remains", SimCApiHandlers.handleFightRemains);
    RAH("time", SimCApiHandlers.handleTime);
    RAH("cycle_enemies", SimCApiHandlers.handleCycleEnemies);

    // Evoker-specific handlers
    RAH("evoker", SimCApiHandlers.handleEvoker);
    RAH("empowering", SimCApiHandlers.handleEmpowering);
    RAH("release", SimCApiHandlers.handleRelease);

    // Hunter-specific handlers
    RAH("hunter", SimCApiHandlers.handleHunter);
    RAH("howl_summon", SimCApiHandlers.handleHowlSummon);
    RAH("boar_charge", SimCApiHandlers.handleBoarCharge);

    // Mage-specific handlers
    RAH("mage", SimCApiHandlers.handleMage);
    RAH("scorch_execute", SimCApiHandlers.handleScorchExecute);
    RAH("improved_scorch", SimCApiHandlers.handleImprovedScorch);
    RAH("firestarter", SimCApiHandlers.handleFirestarter);
    RAH("remaining_winters_chill", SimCApiHandlers.handleRemainingWintersChill);

    // Special item handlers
    RAH("hyperthread_wristwraps", SimCApiHandlers.handleHyperthreadWristwraps);

    // Class handlers
    RAH("druid", SimCApiHandlers.handleDruid);
    RAH("death_knight", SimCApiHandlers.handleDeathKnight);
    RAH("feral_spirit", SimCApiHandlers.handleFeralSpirit);
    RAH("monk", SimCApiHandlers.handleMonk);
    RAH("paladin", SimCApiHandlers.handlePaladin);
    RAH("priest", SimCApiHandlers.handlePriest);
    RAH("rogue", SimCApiHandlers.handleRogue);
    RAH("rtb_buffs", SimCApiHandlers.handleRtbBuffs);
    RAH("shaman", SimCApiHandlers.handleShaman);
    RAH("lightning_rod", SimCApiHandlers.handleLightningRod);
    RAH("stagger", SimCApiHandlers.handleStagger);
    RAH("stealthed", SimCApiHandlers.handleStealthed);
    RAH("totem", SimCApiHandlers.handleTotem);
    RAH("consecration", SimCApiHandlers.handleConsecration);
    RAH("death_and_decay", SimCApiHandlers.handleDeathAndDecay);

    // Hekili API handlers
    RAH("boss", HekiliApiHandlers.handleBoss);
    RAH("group_members", HekiliApiHandlers.handleGroupMembers);
    RAH("settings", HekiliApiHandlers.handleSettings);

    // Resource handlers
    RAH("runic_power", SimCApiHandlers.handleResource);
    RAH("rage", SimCApiHandlers.handleResource);
    RAH("energy", SimCApiHandlers.handleResource);
    RAH("mana", SimCApiHandlers.handleResource);
    RAH("focus", SimCApiHandlers.handleResource);
    RAH("fury", SimCApiHandlers.handleResource);
    RAH("rune", SimCApiHandlers.handleResource);
    RAH("astral_power", SimCApiHandlers.handleResource);
    RAH("maelstrom", SimCApiHandlers.handleResource);
    RAH("insanity", SimCApiHandlers.handleResource);
    RAH("holy_power", SimCApiHandlers.handleResource);
    RAH("soul_shard", SimCApiHandlers.handleResource);
    RAH("soul_shards", SimCApiHandlers.handleResource);
    RAH("combo_points", SimCApiHandlers.handleResource);
    RAH("chi", SimCApiHandlers.handleResource);
    RAH("essence", SimCApiHandlers.handleResource);
  }
}

export const contextHandlerRegistry = new ContextHandlerRegistry();
