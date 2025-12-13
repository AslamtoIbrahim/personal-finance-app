import type { Balance } from "./balance";
import type { Budget } from "./budget";
import type { Pot } from "./pot";
import type { Transaction } from "./transaction";

export type Finance = {
  balance: Balance;
  transactions: Transaction[];
  budgets: Budget[];
  pots: Pot[];
};
