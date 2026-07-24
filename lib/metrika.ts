export const METRIKA_ID = 111010104;

export const MetrikaGoals = {
  phoneClick: "phone_click",
  formSubmit: "form_submit",
} as const;

type YmFunction = (
  id: number,
  method: string,
  ...args: unknown[]
) => void;

declare global {
  interface Window {
    ym?: YmFunction;
  }
}

export function reachGoal(goal: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.ym !== "function") {
    return;
  }

  try {
    if (params) {
      window.ym(METRIKA_ID, "reachGoal", goal, params);
    } else {
      window.ym(METRIKA_ID, "reachGoal", goal);
    }
  } catch {
    // ignore tracking errors
  }
}
