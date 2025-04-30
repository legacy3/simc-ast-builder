export * from "./common-types";
import * as BasicHandlers from "./ContextHandlers/Basic";
import * as HekiliApiHandlers from "./ContextHandlers/HekiliApi";
import * as SimCApiHandlers from "./ContextHandlers/SimCApi";
import * as ClassHandlers from "./ContextHandlers/SimCApi/Class";

// prettier-ignore
export namespace NodeTypes {
  export namespace Basic {
    export type AccessExpr = BasicHandlers.AccessExpressionNode;
    export type AdditiveExpr = BasicHandlers.AdditiveExpressionNode;
    export type AndExpr = BasicHandlers.AndExprExpressionNode;
    export type AnyTokenExpr = BasicHandlers.AnyTokenExprExpressionNode;
    export type ComparisonExpr = BasicHandlers.ComparisonExpressionNode;
    export type IdentifierExpr = BasicHandlers.IdentifierExpressionNode;
    export type MathFuncExpr = BasicHandlers.MathFuncExpressionNode;
    export type MinMaxExpr = BasicHandlers.MinMaxExpressionNode;
    export type MixedIdExpr = BasicHandlers.MixedIdExprExpressionNode;
    export type MultiplicativeExpr = BasicHandlers.MultiplicativeExpressionNode;
    export type NumberExpr = BasicHandlers.NumberExprExpressionNode;
    export type OrExpr = BasicHandlers.OrExprExpressionNode;
    export type StringExpr = BasicHandlers.StringExprExpressionNode;
    export type UnaryExpr = BasicHandlers.UnaryExpressionNode;
    export type XorExpr = BasicHandlers.XorExprExpressionNode;
  }

  export namespace Hekili {
    export type Boss = HekiliApiHandlers.BossExpressionNode;
    export type GroupMembers = HekiliApiHandlers.GroupMembersExpressionNode;
    export type Settings = HekiliApiHandlers.SettingsExpressionNode;
  }

  export namespace SimC {
    export type Action = SimCApiHandlers.ActionExpressionNode;
    export type ActionName = SimCApiHandlers.ActionNameExpressionNode;
    export type ActiveDot = SimCApiHandlers.ActiveDotExpressionNode;
    export type Buff = SimCApiHandlers.BuffExpressionNode;
    export type Cooldown = SimCApiHandlers.CooldownExpressionNode;
    export type CycleEnemies = SimCApiHandlers.CycleEnemiesExpressionNode;
    export type Debuff = SimCApiHandlers.DebuffExpressionNode;
    export type Dot = SimCApiHandlers.DotExpressionNode;
    export type Eclipse = SimCApiHandlers.EclipseExpressionNode;
    export type Equipped = SimCApiHandlers.EquippedExpressionNode;
    export type FightRemains = SimCApiHandlers.FightRemainsExpressionNode;
    export type Gcd = SimCApiHandlers.GcdExpressionNode;
    export type Health = SimCApiHandlers.HealthExpressionNode;
    export type HeroTree = SimCApiHandlers.HeroTreeExpressionNode;
    export type HyperthreadWristwraps = SimCApiHandlers.HyperthreadWristwrapsExpressionNode;
    export type MainHand = SimCApiHandlers.MainHandExpressionNode;
    export type Movement = SimCApiHandlers.MovementExpressionNode;
    export type Pet = SimCApiHandlers.PetExpressionNode;
    export type Prev = SimCApiHandlers.PrevExpressionNode;
    export type PrevGcd = SimCApiHandlers.PrevGcdExpressionNode;
    export type PrevOffGcd = SimCApiHandlers.PrevOffGcdExpressionNode;
    export type RaidEvent = SimCApiHandlers.RaidEventExpressionNode;
    export type Resource = SimCApiHandlers.ResourceExpressionNode;
    export type SetBonus = SimCApiHandlers.SetBonusExpressionNode;
    export type SpellTargets = SimCApiHandlers.SpellTargetsExpressionNode;
    export type Stat = SimCApiHandlers.StatExpressionNode;
    export type SublistName = SimCApiHandlers.SublistNameExpressionNode;
    export type Talent = SimCApiHandlers.TalentExpressionNode;
    export type Target = SimCApiHandlers.TargetExpressionNode;
    export type Time = SimCApiHandlers.TimeExpressionNode;
    export type Toggle = SimCApiHandlers.ToggleExpressionNode;
    export type Trinket = SimCApiHandlers.TrinketExpressionNode;
    export type Variable = SimCApiHandlers.VariableExpressionNode;

    export namespace Class {
      export namespace DeathKnight {
        export type Base = ClassHandlers.DeathKnightExpressionNode;
        export type DeathAndDecay = ClassHandlers.DeathAndDecayExpressionNode;
      }

      export namespace Druid {
        export type Base = ClassHandlers.DruidExpressionNode;
        export type Eclipse = ClassHandlers.EclipseExpressionNode;
      }

      export namespace Evoker {
        export type Base = ClassHandlers.EvokerExpressionNode;
        export type Empowering = ClassHandlers.EmpoweringExpressionNode;
        export type Release = ClassHandlers.ReleaseExpressionNode;
      }

      export namespace Hunter {
        export type Base = ClassHandlers.HunterExpressionNode;
        export type BoarCharge = ClassHandlers.BoarChargeExpressionNode;
        export type HowlSummon = ClassHandlers.HowlSummonExpressionNode;
      }

      export namespace Mage {
        export type Base = ClassHandlers.MageExpressionNode;
        export type Firestarter = ClassHandlers.FirestarterExpressionNode;
        export type ImprovedScorch = ClassHandlers.ImprovedScorchExpressionNode;
        export type RemainingWintersChill = ClassHandlers.RemainingWintersChillExpressionNode;
        export type ScorchExecute = ClassHandlers.ScorchExecuteExpressionNode;
      }

      export namespace Monk {
        export type Base = ClassHandlers.MonkExpressionNode;
        export type Stagger = ClassHandlers.StaggerExpressionNode;
      }

      export namespace Paladin {
        export type Base = ClassHandlers.PaladinExpressionNode;
        export type Consecration = ClassHandlers.ConsecrationExpressionNode;
      }

      export namespace Priest {
        export type Base = ClassHandlers.PriestExpressionNode;
      }

      export namespace Rogue {
        export type Base = ClassHandlers.RogueExpressionNode;
        export type RtbBuffs = ClassHandlers.RtbBuffsExpressionNode;
        export type Stealthed = ClassHandlers.StealthedExpressionNode;
      }

      export namespace Shaman {
        export type Base = ClassHandlers.ShamanExpressionNode;
        export type FeralSpirit = ClassHandlers.FeralSpiritExpressionNode;
        export type LightningRod = ClassHandlers.LightningRodExpressionNode;
        export type Totem = ClassHandlers.TotemExpressionNode;
      }
    }
  }
}
