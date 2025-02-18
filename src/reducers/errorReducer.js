export const initErrorState = {};

export const errorReducer = (
  state,
  { type, payload },
) => {
  const match = /(.*)_(REQUEST|FAIL)/.exec(type);

  if (!match) return state;

  const [, actionName, actionType] = match;

  if (actionType === 'FAIL') {
    return { ...state, [actionName]: payload || true };
  }

  const { [actionName]: an, ...rest } = state;

  return rest;
};
