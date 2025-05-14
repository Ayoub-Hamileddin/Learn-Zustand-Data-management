import { create } from "zustand";

interface expense {
  id: number;
  description: string;
  amount: number;
}
interface expensesOfStore {
  expenses: expense[];
  addExpense: (expense: expense) => void;
  removeExpense: (id: number) => void;
}

export const UseExpenseStore = create<expensesOfStore>((set) => ({
  expenses: [],
  addExpense: (expense) =>
    set((state) => ({
      expenses: [...state.expenses, expense],
    })),
  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((expense) => expense.id !== id),
    })),
}));
