import { History, HistoryData } from "../../../history";

export const SaveActions = {
  add: (data: HistoryData) => async (state, actions) => {
    const history = new History();
    await history.set(data);
    state.log = await history.get();
    actions.update(state);
  },

  remove: (id: number) => async (state, actions) => {
    const history = new History();
    await history.delete(id);
    state.log = await new History().get();
    actions.update(state);
  },

  update: state => state
};
