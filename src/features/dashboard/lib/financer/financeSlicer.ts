import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Budget, UpdateBudgetPaylod } from "../types/budget";
import type { Finance } from "../types/finance";
import type { Pot, UpdatePotPayload } from "../types/pot";
const FINANCE_KEY = "financial_application";

const initialFinance: Finance = {
  balance: {
    current: 0,
    income: 0,
    expenses: 0,
  },
  transactions: [],
  budgets: [],
  pots: [],
};

export const fetchData = createAsyncThunk("data/fetch", async () => {
  // Try reading from localStorage
  const local = localStorage.getItem(FINANCE_KEY);
  if (local) {
    try {
      return JSON.parse(local) as Finance;
    } catch {
      console.warn("Corrupted localStorage data, falling back to JSON file.");
    }
  }

  // Fallback to file fetch
  const res = await fetch("/src/data/data.json");
  if (!res.ok) {
    throw new Error("Failed to fetch finance data");
  }
  return (await res.json()) as Promise<Finance>;
});


export const financeSlice = createSlice({
  name: "finance",
  initialState: initialFinance,
  reducers: {
    // CRUD for budgets
    addNewBudget: (state, action: PayloadAction<Budget>) => {
      state.budgets.push(action.payload);
      localStorage.setItem(FINANCE_KEY, JSON.stringify(state));
    },
    deleteBudget: (state, action: PayloadAction<string>) => {
      state.budgets = state.budgets.filter((b) => b.category !== action.payload);
      localStorage.setItem(FINANCE_KEY, JSON.stringify(state));
    },
    updateBudget: (state, action: PayloadAction<UpdateBudgetPaylod>) => {
      const data = action.payload;
      const budget = state.budgets.find((b) => b.category === data.lastCategory);
      if (budget) {
        Object.assign(budget, data);
        localStorage.setItem(FINANCE_KEY, JSON.stringify(state));
      }
    },

    // CRUD for pots
    addNewPot: (state, action: PayloadAction<Pot>) => {
      state.pots.push(action.payload);
      localStorage.setItem(FINANCE_KEY, JSON.stringify(state));
    },
    deletePot: (state, action: PayloadAction<string>) => {
      state.pots = state.pots.filter((p) => p.theme !== action.payload);
      localStorage.setItem(FINANCE_KEY, JSON.stringify(state));
    },
    updatePot: (state, action: PayloadAction<UpdatePotPayload>) => {
      const data = action.payload;
      const pot = state.pots.find((p) => p.theme === data.lastTheme);
      if (pot) {
        Object.assign(pot, data);
      }
      localStorage.setItem(FINANCE_KEY, JSON.stringify(state));
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (_, a) => {
      return a.payload;
    });
  },
});

export const {
  addNewBudget,
  updateBudget,
  deleteBudget,
  addNewPot,
  updatePot,
  deletePot,
} = financeSlice.actions;

export default financeSlice.reducer;
